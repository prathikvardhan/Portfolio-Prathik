"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

const rooms = [
  {
    number: "01",
    lead: "The",
    accent: "Winner",
    href: "#winner",
    note: "First place / Bharat Tech League 2025",
  },
  {
    number: "02",
    lead: "The",
    accent: "Builder",
    href: "#builder",
    note: "Campfire and Haven hackathons",
  },
  {
    number: "03",
    lead: "The",
    accent: "Mind",
    href: "#mind",
    note: "Mathematics and technology",
  },
];

const secondary = [
  { href: "#chapters", label: "Chapters" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled || open}>
        <div className="container-wide header-inner">
          <a href="#home" className="brand" aria-label="Prathik Vardhan, home" onClick={close}>
            <span className="brand-mark" aria-hidden="true">
              PV
            </span>
            <span>Prathik Vardhan</span>
          </a>

          <div className="header-right">
            <a href="#contact" className="header-cta" onClick={close}>
              Open to ideas
            </a>

            <button
              type="button"
              className="menu-button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((current) => !current)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              {open ? <X size={14} strokeWidth={1.6} /> : <Menu size={15} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio menu"
        >
          <div className="container-wide menu-inner">
            <div className="menu-top">
              <p className="eyebrow">Index / 2026</p>
              <p>Three rooms, one story</p>
            </div>

            <nav className="menu-rooms" aria-label="Portfolio rooms">
              {rooms.map((room, index) => (
                <a
                  key={room.href}
                  href={room.href}
                  className="menu-room"
                  onClick={close}
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="menu-room-index">{room.number}</span>
                  <span className="menu-room-name">
                    {room.lead} <em>{room.accent}</em>
                  </span>
                  <span className="menu-room-note">{room.note}</span>
                  <span className="menu-room-arrow" aria-hidden="true">
                    <ArrowUpRight size={19} strokeWidth={1.2} />
                  </span>
                </a>
              ))}
            </nav>

            <div className="menu-bottom">
              <div className="menu-secondary">
                {secondary.map((link) => (
                  <a key={link.href} href={link.href} onClick={close}>
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="menu-signoff">
                Prathik Vardhan
                <br />
                Mathematics / Technology / Curiosity
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
