import Link from "next/link";
import { H1 } from "@/components/ui/H1";

export const metadata = {
  title: "Research",
  description: "Research publications by Josue Diaz Flores.",
};

export default function ResearchPage() {
  return (
    <section className="space-y-6">
      <H1>Research</H1>

      <p className="text-muted-foreground">
        A collection of my research papers and technical publications.
      </p>

      <hr className="border-muted" />

      <div className="rounded-xl border border-muted bg-muted/30 p-6 transition-colors hover:border-primary/40 hover:bg-muted/50">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              NLP &middot; Legal AI &middot; LoRA Fine-Tuning
            </p>
            <h3 className="text-xl font-semibold leading-tight">
              LoRA Fine-Tuning for Immigration Case Outcome Prediction
            </h3>
            <p className="text-sm text-muted-foreground">
              A Benchmark on USCIS Administrative Appeals
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Compared three open-weight models (Gemma 4 E4B, Qwen 2.5 7B, Llama
            3.1 8B) fine-tuned on 1,467 USCIS appeal decisions. Found that LoRA
            produces architecture-specific minority-class specialization rather
            than uniform improvement — Gemma LoRA achieved the strongest
            macro-F1 (0.341), the only configuration to beat the
            always-dismiss baseline.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Gemma
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Qwen
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Llama
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              HuggingFace
            </span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/research/paper"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read Paper
            </Link>
            <span className="text-xs text-muted-foreground">
              Josue Diaz Flores &middot; 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
