export default function ContactSection() {
  return (
    <section
      id="contacts"
      className="snap-start flex h-screen w-full shrink-0 items-center justify-center border-y-8 border-[#d6b15b] bg-[#121832] px-6 text-white"
    >
      <div className="max-w-2xl text-center">
        <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl text-[#812b27]">
          Contacts &amp; Footer
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#812b27]">
          Questa area ospitera&apos; i canali di contatto principali: email,
          social, form dedicato e riferimenti pratici. La schermata blu si
          chiudera&apos; con il footer del sito, contenente crediti e link
          utili, per completare la navigazione.
        </p>
      </div>
    </section>
  );
}
