const Header = () => {
  return (
    <header className="border-b-4 border-accent bg-card py-10 shadow-sm">
      <div className="container">
        <div className="grid grid-cols-[80px_1fr_80px] items-center gap-6 md:grid-cols-[120px_1fr_120px] md:gap-10">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-gradient-scout shadow-md md:h-[120px] md:w-[120px]">
            <img
              src="https://res.cloudinary.com/dfol8e2xd/image/upload/v1769464153/Adobe_Express_-_file_1_1_ifibee.png"
              alt="Logo Scouts Argentina"
              className="h-[85%] w-[85%] object-contain"
              loading="lazy"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
              PAÑUELOS
            </h1>
            <p className="mt-1 text-sm font-bold uppercase tracking-[3px] text-accent md:text-base">
              Scouts Argentina
            </p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-gradient-scout shadow-md md:h-[120px] md:w-[120px]">
            <img
              src="https://res.cloudinary.com/dfol8e2xd/image/upload/v1769464801/images_1_m8viyl.png"
              alt="Movimiento Scout Mundial"
              className="h-[85%] w-[85%] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
