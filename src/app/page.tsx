import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import me from "@/assets/me.jpg";
import family from "@/assets/family.jpg";
import styles from "@/components/landing/landing.module.css";
import ProjectCards from "@/components/landing/ProjectCards";
import ContributionHeatmap from "@/components/landing/ContributionHeatmap";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/landing/icons";
import { projects } from "@/components/landing/projects";
import { getContributions, GITHUB_USER } from "@/lib/contributions";

export const metadata: Metadata = {
  title: "Josue Diaz Flores",
  description:
    "Computer science student and builder. Small models, real hardware, work that runs where people actually are.",
};

const links = {
  github: `https://github.com/${GITHUB_USER}`,
  linkedin: "https://www.linkedin.com/in/josuediazfl/",
  x: "https://x.com/JosueDiazFlores",
  resume: "https://docs.google.com/document/d/15er8_WzTZJRfiNEdJ1OGnU94pvwT9bbR/edit",
  email: "mailto:hello@josuediazflores.com",
};

const nav = [
  { href: "#i", label: "About" },
  { href: "#ii", label: "Projects" },
  { href: "#iii", label: "Experience" },
  { href: "#iv", label: "Roots" },
  { href: "#v", label: "Writing" },
];

const chips = ["San José, CA", "Santa Clara University", "Rising senior"];

const toolkit = ["Java", "C/C++", "Python", "JS/TS", "PyTorch", "ROS 2", "AWS", "SQL", "Swift"];

const experience = [
  {
    dates: "Jun – Aug 2026",
    org: "Founders, Inc.",
    role: "Founder in Residence · Off Season II · San Francisco",
    summary:
      "Trained a sidewalk segmentation model across three generations; built the onboard vision-navigation loop it drives.",
  },
  {
    dates: "Feb – Apr 2026",
    org: "RunAnywhere",
    role: "Software Engineer Intern · YC W26 · Hybrid",
    summary: "On-device inference SDK. Production Claude Code skill, Swift release tooling, architecture documentation.",
  },
  {
    dates: "Mar 2023 – Aug 2025",
    org: "Synopsys",
    role: "Information Technology Intern · Sunnyvale · 2.5 yrs",
    summary:
      "Failure-pattern reports for leadership, department-wide procedures, onboarding guides, led five interns. First-level support and ticket queues in ServiceNow and Remedy.",
  },
];

export default async function Home() {
  const contributions = await getContributions();

  return (
    <div className={styles.root}>
      <div className={styles.grain} aria-hidden="true" />

      <nav className={styles.nav} aria-label="Sections">
        <a href="#top" className={`${styles.navLink} ${styles.navHome}`}>
          JDF
        </a>
        {nav.map((item) => (
          <a key={item.href} href={item.href} className={styles.navLink}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Hero */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={`${styles.eyebrow} ${styles.heroEyebrow}`}>No. 001 · Portrait</div>
          <h1 className={styles.title}>
            <span className={styles.lineMask}>
              <span className={`${styles.line} ${styles.line1}`}>Josue</span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} ${styles.line2}`}>Diaz</span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} ${styles.line3}`}>Flores</span>
            </span>
          </h1>
          <div className={styles.intro}>
            <p className={styles.lede}>
              Computer science student and builder. Small models, real hardware, work that runs where people actually
              are.
            </p>
            <div className={styles.chips}>
              {chips.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
            </div>
            <div className={styles.socials}>
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.social}>
                <GitHubIcon size={18} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.social}>
                <LinkedInIcon size={18} />
              </a>
              <a href={links.x} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className={styles.social}>
                <XIcon size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.photo}>
          <Image src={me} alt="Josue Diaz Flores" fill priority sizes="(max-width: 720px) 100vw, 560px" className={styles.photoImg} />
        </div>
      </section>

      {/* I · About */}
      <section id="i" className={styles.section}>
        <div className={styles.label}>I · Sobre mí</div>
        <h2 className={`${styles.h2} ${styles.h2About}`}>
          I learned most of this by building the thing before I was qualified to.
        </h2>
        <div className={styles.aboutGrid}>
          <div className={styles.bio}>
            <p>
              Grew up in San José, two years at De Anza, then Santa Clara. Lately: vision models on low-power chips,
              distilling language models down to something that fits, and the documentation nobody else wanted to
              write.
            </p>
            <p>
              I care about work that runs where people are: on a sidewalk, on a pair of glasses, on a device with no
              signal. Theta Tau, ACM, a board seat at AI Kitchen. Currently reading <em>Dune</em>.
            </p>
          </div>
          <div className={styles.toolkit}>
            <div className={styles.toolkitLabel}>Toolkit</div>
            <div className={styles.tags}>
              {toolkit.map((tool) => (
                <span key={tool} className={styles.tag}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <ContributionHeatmap data={contributions} href={links.github} />
        </div>
      </section>

      {/* II · Projects */}
      <section id="ii" className={styles.section}>
        <div className={styles.label}>II · Proyectos</div>
        <h2 className={styles.h2}>Projects.</h2>
        <ProjectCards projects={projects} />
      </section>

      {/* III · Experience */}
      <section id="iii" className={styles.section}>
        <div className={styles.label}>III · Experiencia</div>
        <h2 className={styles.h2}>Where I&apos;ve worked.</h2>
        <div className={styles.expCard}>
          {experience.map((job) => (
            <div key={job.org} className={styles.expRow}>
              <span className={styles.expDate}>{job.dates}</span>
              <div className={styles.expOrg}>
                <div className={styles.expName}>{job.org}</div>
                <div className={styles.expRole}>{job.role}</div>
              </div>
              <p className={styles.expDesc}>{job.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IV · Roots */}
      <section id="iv" className={styles.section}>
        <div className={styles.label}>IV · Raíces</div>
        <div className={styles.roots}>
          <div className={styles.rootsGlow} aria-hidden="true" />
          <div className={styles.rootsText}>
            <h2 className={styles.rootsTitle}>From here and from there.</h2>
            <p className={styles.rootsP}>
              Mexican-American, and not as a footnote. It&apos;s why I work in two languages, why the immigration paper
              exists, and why I&apos;d rather build a tool that helps someone cross a street than one that helps
              someone scroll.
            </p>
          </div>
          <div className={styles.rootsPhoto}>
            <Image src={family} alt="Family" sizes="(max-width: 720px) 100vw, 520px" className={styles.rootsImg} />
          </div>
        </div>
      </section>

      {/* V · Writing */}
      <section id="v" className={styles.section}>
        <div className={styles.label}>V · Escritos</div>
        <h2 className={styles.h2}>Writing.</h2>
        <div className={styles.writing}>
          <Link href="/publications" className={styles.post}>
            <span className={styles.postMeta}>Paper · 2026</span>
            <div>
              <div className={styles.postTitle}>LoRA Fine-Tuning for Immigration Case Outcome Prediction</div>
              <div className={styles.postSub}>A benchmark on USCIS administrative appeals</div>
            </div>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href={links.email} className={styles.cta}>
          Let&apos;s build something.
        </a>
        <div className={styles.footerRow}>
          <div className={styles.footerLinks}>
            <a href={links.github}>GitHub</a>
            <a href={links.linkedin}>LinkedIn</a>
            <a href={links.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
          <span>© 2026 Josue Diaz Flores · San José, CA</span>
        </div>
      </footer>
    </div>
  );
}
