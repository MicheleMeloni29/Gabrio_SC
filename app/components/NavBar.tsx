"use client";

import { useEffect, useState } from "react";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/react";

// Elenco delle sezioni della pagina da usare per i link del menu di navigazione.
const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "contacts", label: "Contacts" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Monogram() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-[#d6b15b]"
    >
      <path
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function NavBar() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Osserva l'intersezione delle sezioni per evidenziare il link attivo durante lo scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: SectionId) => {
    // Scroll morbido verso la sezione selezionata e chiusura del menu mobile.
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const linkBase =
    "rounded-full px-4 py-2 text-sm font-semibold transition duration-300";

  return (
    <Navbar
      isBordered
      className="fixed top-0 left-0 z-50 w-full border-none bg-transparent px-0 shadow-none backdrop-blur-none"
    >
      <div className="relative mx-auto w-[92%] max-w-5xl rounded-full border border-[#1d0d0c]/70 bg-[#121832]/95 px-5 py-3 text-white shadow-[0_18px_35px_rgba(3,4,12,0.75)] backdrop-blur">
        <NavbarContent className="w-full md:hidden" justify="start">
          <div className="flex w-full items-center justify-between">
            <NavbarBrand className="gap-2">
              <Monogram />
              <p className="font-semibold uppercase tracking-[0.5em] text-[#d6b15b]">
                Gabrio
              </p>
            </NavbarBrand>
            <NavbarMenuToggle
              aria-label="Apri menu"
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] transition duration-300 ${
                isMenuOpen
                  ? "bg-[#812b27] text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="flex flex-col items-center gap-1.5">
                <span
                  className={`h-0.5 w-5 bg-current transition-transform ${
                    isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-opacity ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-transform ${
                    isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </NavbarMenuToggle>
          </div>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarBrand className="gap-3">
            <Monogram />
            <div className="text-left text-[#d6b15b]">
              <p className="text-xs uppercase tracking-[0.4em]">Gabrio</p>
              <p className="text-[10px] uppercase tracking-[0.8em] text-white/60">
                Portfolio
              </p>
            </div>
          </NavbarBrand>
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <NavbarItem key={id}>
                <Link
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(id);
                  }}
                  className={`${linkBase} ${
                    isActive
                      ? "bg-[#812b27] text-white"
                      : "text-[#d6b15b] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify="end"></NavbarContent>

        {isMenuOpen ? (
          <div className="absolute right-4 top-full mt-4 w-48 rounded-3xl bg-black/60 p-4 shadow-2xl md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold">
              {sections.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigate(id)}
                    className={`text-left uppercase tracking-[0.4em] transition ${
                      isActive ? "text-[#f87171]" : "text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Navbar>
  );
}
