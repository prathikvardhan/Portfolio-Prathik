import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

const tickerItems = [
  "Mathematics",
  "Technology",
  "Bharat Tech League 2025",
  "Codex Competition",
  "Campfire",
  "Haven",
  "Curiosity",
  "First place",
];

const chapters = [
  {
    number: "01",
    href: "#winner",
    label: "Recognition",
    title: ["The", "Winner"],
    description:
      "First place at the Bharat Tech League 2025 Codex competition, held at A Hub.",
  },
  {
    number: "02",
    href: "#builder",
    label: "Build log",
    title: ["The", "Builder"],
    description:
      "Campfire and Haven: two hackathons, two teams, and two chances to make an idea real.",
  },
  {
    number: "03",
    href: "#mind",
    label: "Operating system",
    title: ["The", "Mind"],
    description:
      "Mathematics gives the structure. Curiosity keeps expanding the surface area.",
  },
];

const skills = [
  ["01", "Mathematical thinking", "Pattern, proof, and structured problem solving"],
  ["02", "Technology", "Learning stacks quickly and making ideas tangible"],
  ["03", "Problem solving", "Comfortable starting before the path is clear"],
  ["04", "Collaboration", "Hackathon-tested teamwork under a clock"],
  ["05", "Curiosity", "The reason this list keeps growing"],
];

const aboutFacts = [
  ["Name", "Prathik Vardhan"],
  ["Currently", "Student, technologist, problem solver"],
  ["Recognition", "First place — Bharat Tech League 2025"],
  ["Hackathons", "Campfire + Haven"],
  ["Focus", "Mathematics × technology"],
];

function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" key={group}>
            {tickerItems.map((item) => (
              <span className="ticker-item" key={`${group}-${item}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero" id="home" aria-label="Introduction">
          <div className="hero-canvas">
            <HeroVisual />
          </div>

          <div className="container-wide hero-interface">
            <div className="hero-top">
              <p>
                Portfolio / 2026
                <br />
                A digital exhibition
              </p>
              <p>
                Student
                <br />
                Technologist / Problem solver
              </p>
            </div>

            <div>
              <div className="hero-bottom">
                <div className="hero-title-block">
                  <h1 className="hero-title">
                    <span>Prathik</span>
                    <span className="title-second">Vardhan</span>
                  </h1>
                </div>

                <div className="hero-side">
                  <p>
                    A student with a mathematician&apos;s mind and a builder&apos;s instinct.
                    <strong> Learning fast, thinking deeply, making things real.</strong>
                  </p>
                  <a href="#chapters" className="text-link">
                    Enter the room <ArrowDown size={14} strokeWidth={1.4} />
                  </a>
                </div>
              </div>

              <div className="hero-meta-row">
                <p>Drag the sculpture / Three rooms, one story</p>
                <p className="scroll-note">
                  Scroll to explore
                  <span>
                    <ArrowDown size={12} strokeWidth={1.4} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Ticker />

        <section className="intro section-pad">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>01 / The short version</p>
                <p>Portfolio, first edition</p>
              </div>

              <h2 className="intro-statement">
                A student. A builder. <span>A mind in motion.</span>
              </h2>

              <div className="intro-lower">
                <p>
                  I&apos;m <strong>Prathik Vardhan</strong>, a student who likes the space where
                  mathematics meets technology. I learn quickly, think in systems, and enjoy
                  turning an unfamiliar problem into something that works.
                </p>
                <p>
                  I won first place in the Codex competition at{" "}
                  <strong>Bharat Tech League 2025</strong>, held at A Hub. I&apos;ve also built
                  through the <strong>Campfire and Haven hackathons</strong>. This portfolio is a
                  first look — the work is still unfolding.
                </p>
              </div>

              <div className="intro-facts">
                <div className="intro-fact">
                  <span>01 / Recognition</span>
                  <strong>First place</strong>
                  <p>Codex Competition — Bharat Tech League 2025, A Hub</p>
                </div>
                <div className="intro-fact">
                  <span>02 / Build log</span>
                  <strong>Two hackathons</strong>
                  <p>Campfire and Haven — ideas, teams, and deadlines</p>
                </div>
                <div className="intro-fact">
                  <span>03 / Core edge</span>
                  <strong>Mathematics</strong>
                  <p>The structure behind the way I think and build</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="chapters section-pad" id="chapters">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>02 / Chapters</p>
                <p>Enter any room</p>
              </div>

              <div className="section-heading">
                <h2>
                  Three rooms. <em>One story.</em>
                </h2>
                <p>
                  A winner&apos;s room, a builder&apos;s room, and the mind that connects them.
                  Walk through the parts of the work that shaped the person.
                </p>
              </div>

              <div className="chapter-grid">
                {chapters.map((chapter) => (
                  <a className="chapter-card" href={chapter.href} key={chapter.href}>
                    <div className="chapter-top">
                      <span className="chapter-number">{chapter.number}</span>
                      <span>{chapter.label}</span>
                    </div>
                    <div>
                      <h3>
                        {chapter.title[0]}
                        <span>{chapter.title[1]}</span>
                      </h3>
                      <div className="chapter-arrow">
                        <ArrowUpRight size={15} strokeWidth={1.4} />
                      </div>
                    </div>
                    <div className="chapter-bottom">
                      <p>{chapter.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="winner section-pad" id="winner">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>03 / Recognition</p>
                <p>A Hub · 2025</p>
              </div>

              <div className="winner-inner">
                <div className="winner-copy">
                  <div>
                    <p className="eyebrow">Bharat Tech League 2025</p>
                    <h2>
                      First place.
                      <span>Codex competition.</span>
                    </h2>
                  </div>

                  <div className="winner-copy-bottom">
                    <p>
                      A first-place finish at the Codex competition, hosted at A Hub as part of
                      Bharat Tech League 2025. A moment that turned curiosity into proof.
                    </p>
                    <div className="winner-seal" aria-hidden="true">
                      01
                      <br />
                      First
                      <br />
                      Place
                    </div>
                  </div>
                </div>

                <div className="certificate-wrap">
                  <div
                    className="certificate"
                    role="img"
                    aria-label="Stylised award card for Prathik Vardhan, first place at the Bharat Tech League 2025 Codex competition at A Hub"
                  >
                    <div className="certificate-inner">
                      <p>Bharat Tech League / 2025</p>
                      <div className="certificate-mark" aria-hidden="true">
                        PV
                      </div>
                      <div>
                        <p>Awarded to</p>
                        <h3>Prathik Vardhan</h3>
                        <span className="certificate-title">
                          First place
                          <br />
                          Codex Competition
                        </span>
                      </div>
                      <div className="certificate-line" aria-hidden="true" />
                      <div>
                        <p>A Hub</p>
                        <p>Certificate in the personal archive</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="hackathons section-pad" id="builder">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>04 / Build log</p>
                <p>Two rooms, two teams</p>
              </div>

              <div className="section-heading">
                <h2>
                  Built under pressure. <em>Twice.</em>
                </h2>
                <p>
                  Hackathons compress everything: new people, an open problem, and a clock that
                  never slows down. I showed up to build.
                </p>
              </div>

              <div className="hackathon-grid">
                <article className="hack-card">
                  <div className="hack-card-top">
                    <span>01 / Campfire</span>
                    <span>Participant</span>
                  </div>
                  <h3>Campfire</h3>
                  <div className="hack-card-bottom">
                    <p>
                      A room full of new people, an open brief, and a finite number of hours.
                      Ideas had to become something real.
                    </p>
                    <span className="hack-tag">Hackathon</span>
                  </div>
                </article>

                <article className="hack-card">
                  <div className="hack-card-top">
                    <span>02 / Haven</span>
                    <span>Participant</span>
                  </div>
                  <h3>Haven</h3>
                  <div className="hack-card-bottom">
                    <p>
                      Another room, another team, another chance to think clearly while the
                      deadline gets louder.
                    </p>
                    <span className="hack-tag">Hackathon</span>
                  </div>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mind section-pad" id="mind">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>05 / Operating system</p>
                <p>The part behind the work</p>
              </div>

              <div className="mind-grid">
                <div className="mind-intro">
                  <h3>
                    Mathematics is the <span>native language.</span>
                  </h3>
                  <p>
                    Math is where I learned to look for structure before reaching for a tool.
                    Technology is where that structure becomes an interface, an experiment, or a
                    result.
                  </p>
                </div>

                <div className="skill-list">
                  {skills.map(([number, title, description]) => (
                    <div className="skill-row" key={number}>
                      <span>{number}</span>
                      <h4>{title}</h4>
                      <p>{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <blockquote className="mind-quote">
                “The best problems are the ones that don&apos;t have an obvious first step.”
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="container-wide">
            <Reveal>
              <div className="section-rule">
                <p>06 / The person</p>
                <p>Still becoming</p>
              </div>

              <div className="about-grid">
                <p className="about-story">
                  I&apos;m a student. That means I&apos;m early — but it doesn&apos;t mean I&apos;m
                  waiting. I like mathematics because it rewards precision. I like technology
                  because it turns precision into something people can use.{" "}
                  <span>I&apos;m building toward the overlap.</span>
                </p>

                <dl className="about-aside">
                  {aboutFacts.map(([label, value]) => (
                    <div className="about-fact" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container-wide contact-inner">
            <Reveal>
              <p className="eyebrow">07 / Next chapter</p>
              <h2>
                Let&apos;s build
                <span>something good.</span>
              </h2>

              <div className="contact-lower">
                <p>
                  Open to collaborations, hackathons, and ideas that look a little too ambitious
                  at the start. The next room is still being built.
                </p>
                <span className="contact-placeholder">Contact details coming soon</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-wide footer-inner">
          <span>© 2026 Prathik Vardhan</span>
          <span>Mathematics / Technology / Curiosity</span>
          <a href="#home">Back to the room ↑</a>
        </div>
      </footer>

      <CustomCursor />
    </div>
  );
}
