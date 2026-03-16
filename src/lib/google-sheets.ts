import type { Panuelo } from "@/data/panuelos";

/**
 * Google Sheets como "base de datos" gratuita.
 *
 * SETUP:
 * 1. Creá una Google Sheet con estas columnas (fila 1 = encabezados):
 *    groupNumber | groupName | zoneNumber | district | image | images | meaning | history
 *
 * 2. En "images", poné las URLs separadas por coma:
 *    https://url1.png, https://url2.png
 *
 * 3. Publicá la hoja: Archivo → Compartir → Publicar en la web → Hoja 1 → CSV → Publicar
 *
 * 4. Copiá el ID de la hoja desde la URL:
 *    https://docs.google.com/spreadsheets/d/ACÁ_ESTÁ_EL_ID/edit
 *
 * 5. Pegalo en SHEET_ID abajo.
 */

// ⬇️ CAMBIÁ ESTO por el ID de tu Google Sheet publicada
const SHEET_ID = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkWn1tpHQIfxTbP7_1KkG1enFbHflIkS0oTW_ajH2PSmqTztxm6BqNcQr38qHCh3xh7K-nu3ruT7Vc/pub?gid=0&single=true&output=csv";

// Podés especificar la hoja (gid) si tenés varias. Por defecto es la primera (gid=0)
const GID = "0";

function buildSheetUrl(sheetId: string, gid: string = "0"): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(current.trim());
        current = "";
      } else if (char === "\n" || (char === "\r" && next === "\n")) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = "";
        if (char === "\r") i++; // skip \n
      } else {
        current += char;
      }
    }
  }

  // Last field
  if (current || row.length > 0) {
    row.push(current.trim());
    rows.push(row);
  }

  return rows;
}

function csvToPanuelos(csv: string): Panuelo[] {
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const data: Panuelo[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue; // skip empty rows

    const get = (col: string) => {
      const idx = headers.indexOf(col.toLowerCase());
      return idx >= 0 && idx < row.length ? row[idx] : "";
    };

    const groupNumber = parseInt(get("groupnumber") || get("groupNumber") || get("grupo"));
    const groupName = get("groupname") || get("groupName") || get("nombre");
    if (!groupName || isNaN(groupNumber)) continue;

    const imageField = get("image") || get("imagen");
    const imagesField = get("images") || get("imagenes");
    const imagesList = imagesField
      ? imagesField.split(",").map((u) => u.trim()).filter(Boolean)
      : imageField
      ? [imageField]
      : [];

    data.push({
      groupNumber,
      groupName,
      zoneNumber: parseInt(get("zonenumber") || get("zoneNumber") || get("zona")) || 0,
      district: get("district") || get("distrito") || "",
      image: imagesList[0] || "",
      images: imagesList,
      meaning: get("meaning") || get("significado") || "",
      history: get("history") || get("historia") || "",
    });
  }

  return data;
}

export async function fetchFromGoogleSheets(): Promise<Panuelo[]> {
  if (!SHEET_ID) {
    throw new Error("SHEET_ID no configurado");
  }

  // Si SHEET_ID ya es una URL completa, usarla directamente
  const url = SHEET_ID.startsWith("http") ? SHEET_ID : buildSheetUrl(SHEET_ID, GID);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al obtener datos de Google Sheets: ${response.status}`);
  }

  const csv = await response.text();
  return csvToPanuelos(csv);
}

export function isSheetConfigured(): boolean {
  return SHEET_ID.length > 0;
}
