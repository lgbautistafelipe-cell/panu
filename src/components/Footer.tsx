const Footer = () => (
  <footer className="mt-20 border-t-4 border-accent bg-gradient-scout py-12 text-primary-foreground">
    <div className="container">
      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-sm font-bold text-accent">Sobre Nosotros</h3>
          <p className="text-sm text-primary-foreground/80">
            Galería oficial de pañuelos scouts de Argentina
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-accent">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Quiénes Somos
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Panel Admin
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-accent">Contacto</h3>
          <p className="text-sm text-primary-foreground/80">Movimiento Scout de Argentina</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-5 text-center text-xs text-primary-foreground/60">
        © 2026 Pañuelos Scouts Argentina • Movimiento Scout
      </div>
    </div>
  </footer>
);

export default Footer;
