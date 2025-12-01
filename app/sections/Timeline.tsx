export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-y-8 border-[#d6b15b] bg-white px-6 text-black"
    >
      <div className="max-w-2xl text-center">
        <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl text-[#121832]">
          Timeline
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#121832]">
          Qui verranno visualizzate le tappe fondamentali della carriera
          formativa e professionale: studi, collaborazioni, riconoscimenti. La
          timeline occupera&apos; l&apos;intera schermata bianca, con eventi
          ordinati per anno e mini descrizioni.
        </p>
      </div>
    </section>
  );
}
