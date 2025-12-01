export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-y-8 border-[#d6b15b] bg-[#121832] px-6 text-white"
    >
      <div className="max-w-2xl text-center">      
        <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl text-[#812b27]">
          About Me
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#812b27]">
          In questa sezione inseriremo una breve presentazione della persona,
          raccontando origini, attitudini e i momenti chiave della sua storia.
          Il testo sara&apos; sintetico ma personale, per accompagnare
          l&apos;utente{" "}
          verso i contenuti successivi.
        </p>
      </div>
    </section>
  );
}
