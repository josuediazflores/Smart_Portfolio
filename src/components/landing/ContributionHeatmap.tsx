import styles from "./landing.module.css";
import { LEVEL_COLORS, type ContributionData } from "@/lib/contributions";

export default function ContributionHeatmap({ data, href }: { data: ContributionData; href: string }) {
  const total = data.total.toLocaleString("en-US");
  return (
    <a href={href} className={styles.heatCard} aria-label={`${total} GitHub contributions in the last year`}>
      <div className={styles.heatHead}>
        <div className={styles.heatCount}>{total} contributions in the last year</div>
        <div className={styles.heatRange}>GitHub · {data.rangeLabel}</div>
      </div>
      <div className={styles.heatGrid} aria-hidden="true">
        {data.cells.map((level, i) => (
          <div key={i} className={styles.cell} style={level === null ? undefined : { background: LEVEL_COLORS[level] }} />
        ))}
      </div>
      <div className={styles.heatFoot}>
        <div className={styles.months}>
          {data.months.map((m, i) => (
            <span key={`${m}-${i}`}>{m}</span>
          ))}
        </div>
        <div className={styles.legend}>
          <span>Less</span>
          {LEVEL_COLORS.map((c) => (
            <span key={c} className={styles.legendCell} style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </a>
  );
}
