const timelineItems = [
  {
    year: '2016',
    title: 'Primi passi nel design',
    description:
      'Curiosità e sperimentazione con strumenti digitali: nasce la passione per grafica, motion e direzione artistica.'
  },
  {
    year: '2019',
    title: 'Studi e prime collaborazioni',
    description:
      'Percorso formativo e lavori freelance con brand locali, per consolidare metodo e sensibilità visiva.'
  },
  {
    year: '2022',
    title: 'Agenzia creativa',
    description:
      'Ingresso in un team strutturato dove seguo progetti complessi, campagne integrated e prodotti digitali.'
  },
  {
    year: 'Oggi',
    title: 'Nuove sfide',
    description:
      'Il portfolio raccoglie esperienze recenti e traccia gli obiettivi futuri, con focus su storytelling e qualità.'
  }
];

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-y-8 border-[#d6b15b] bg-[#000000] px-6 text-white"
    >
      <div className="flex w-full max-w-4xl flex-col gap-10 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Percorso</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Timeline
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            Una linea temporale per raccontare evoluzione, milestones e visione. I contenuti
            potranno essere sostituiti con dati reali in fase di completamento.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-white/30 sm:block" />
          <ul className="flex flex-col gap-8">
            {timelineItems.map(item => (
              <li
                key={item.year}
                className="relative flex flex-col gap-2 rounded-lg border border-white/20 bg-white/5 p-5 text-left shadow-lg backdrop-blur"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6b15b]">
                  {item.year}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-base leading-relaxed text-white/80">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
