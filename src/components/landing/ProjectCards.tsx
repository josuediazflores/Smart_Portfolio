"use client";

import { useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import styles from "./landing.module.css";
import type { Project } from "./projects";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export default function ProjectCards({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<boolean[]>(() => projects.map(() => false));

  function toggle(index: number) {
    const apply = () => setOpen((prev) => prev.map((v, i) => (i === index ? !v : v)));
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof doc.startViewTransition === "function" && !reduceMotion && document.visibilityState === "visible") {
      // Morph the card in place: the browser animates the card box between its closed and open layout.
      const transition = doc.startViewTransition(() => flushSync(apply));
      // A skipped transition (hidden tab, another transition in flight) rejects `ready`; the DOM update still applies.
      transition.ready.catch(() => {});
    } else {
      apply();
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>, index: number) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    }
  }

  const stop = (e: MouseEvent) => e.stopPropagation();
  const placeholder = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.cards}>
      {projects.map((p, i) => {
        const isOpen = open[i];
        return (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            data-tone={p.tone}
            className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}
            style={{ viewTransitionName: `card${i + 1}` } as CSSProperties}
            onClick={() => toggle(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <div className={styles.cardHead}>
              <span>{p.meta}</span>
              <span aria-hidden="true">{isOpen ? "Close ↑" : "Details ↓"}</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{p.title}</div>
              <p className={styles.cardBlurb}>{p.blurb}</p>
            </div>
            {isOpen && (
              <div className={styles.details}>
                <div className={styles.facts}>
                  {(
                    [
                      ["What", p.what],
                      ["How", p.how],
                      ["Result", p.result],
                    ] as const
                  ).map(([key, value]) => (
                    <div className={styles.fact} key={key}>
                      <span className={styles.factKey}>{key}</span>
                      <span className={styles.factVal}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.detailsSide}>
                  <div className={styles.cardTags}>
                    {p.tags.map((t) => (
                      <span className={styles.cardTag} key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    {p.actions.map((a) => {
                      const cls = `${styles.btn} ${a.kind === "primary" ? styles.btnPrimary : styles.btnGhost}`;
                      return a.href ? (
                        <a
                          key={a.label}
                          href={a.href}
                          className={cls}
                          onClick={stop}
                          target={a.external ? "_blank" : undefined}
                          rel={a.external ? "noopener noreferrer" : undefined}
                        >
                          {a.label}
                        </a>
                      ) : (
                        <a key={a.label} href="#" aria-disabled="true" className={cls} onClick={placeholder}>
                          {a.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
