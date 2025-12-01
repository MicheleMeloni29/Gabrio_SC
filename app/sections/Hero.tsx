export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-b-8 border-[#d6b15b] bg-[#63201d] px-6 pt-28 pb-6 text-white"
    >
      <div className="max-w-2xl text-center">
        <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl text-white">
          Hero principale
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white">
          Qui compariranno le informazioni principali della persona: nome,
          ruolo, breve payoff e call to action iniziale. Questa schermata
          introduce il portfolio non appena la pagina viene aperta.
        </p>
      </div>
    </section>
  );
}
