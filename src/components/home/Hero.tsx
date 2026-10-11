export default function Hero() {
  return (
    <div className="bg-navy-600 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center animate-fade-up">
          <div className="text-6xl md:text-8xl mb-6 drop-shadow-lg">♞</div>
          <p className="text-xl md:text-3xl font-bold mb-2">
            Športový klub šachu
          </p>
          <h1 className="text-3xl md:text-5xl text-gold-400 font-bold mb-2">
            Dubnica nad Váhom
          </h1>
          <p className="text-navy-200 text-lg mb-8">
            Šachový klub s tradíciou od roku 1949
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#vysledky"
              className="bg-gold-500 hover:bg-gold-600 hover:scale-105 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 no-underline shadow-md hover:shadow-lg"
            >
              Výsledky
            </a>
            <a
              href="#aktuality"
              className="border border-white/30 hover:bg-white/10 hover:scale-105 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 no-underline"
            >
              Aktuality
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
