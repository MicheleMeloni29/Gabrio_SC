export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-y-8 border-[#d6b15b] bg-white px-6 text-[#1d4ed8]"
    >
      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-[#1e40af]/80">Timeline</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#1e3a8a] sm:text-4xl">
          Storyline in arrivo
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[#1d4ed8]">
          Come per le altre sezioni del portfolio, qui manteniamo una descrizione di default
          dedicata alle immagini future. Questo spazio ospitera' una timeline interattiva con
          tappe e milestone: al momento mostriamo soltanto il testo segnaposto.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#1d4ed8]/80">
          Immagini, icone e contenuti visivi saranno aggiunti successivamente, mantenendo la
          stessa struttura narrativa utilizzata nel resto del sito.
        </p>
      </div>
    </section>
  );
}
