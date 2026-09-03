export type ProjectAction = {
  label: string;
  /** null renders a placeholder button (no destination yet). */
  href: string | null;
  kind: "primary" | "ghost";
  external?: boolean;
};

export type Project = {
  id: string;
  tone: "dark" | "light" | "sand";
  meta: string;
  title: string;
  blurb: string;
  what: string;
  how: string;
  result: string;
  tags: string[];
  actions: ProjectAction[];
};

const GITHUB = "https://github.com/josuediazflores";

export const projects: Project[] = [
  {
    id: "crouton",
    tone: "dark",
    meta: "01 · Founders Inc · RV1106",
    title: "Crouton: sidewalk vision at 20 fps",
    blurb: "Closed-loop navigation fully onboard a low-power chip. Three checkpoint generations, 60 MB to 52.",
    what: "A sidewalk-following robot brain that runs entirely on a Rockchip RV1106, with no network and no fan.",
    how: "Trained \"crouton\" (YOLOv8 segmentation) across three checkpoint generations; the pipeline undistorts the frame, segments walkable surface, projects to bird's-eye view, outputs steering.",
    result: "20 fps closed-loop steering onboard. Model trimmed 60 MB → 52 MB with accuracy held on target hardware.",
    tags: ["YOLOv8", "PyTorch", "RV1106", "C/C++", "Python"],
    actions: [
      { label: "GitHub", href: GITHUB, kind: "primary", external: true },
      { label: "Full case study →", href: null, kind: "ghost" },
    ],
  },
  {
    id: "distilled-2b",
    tone: "light",
    meta: "02 · Google grant",
    title: "A 2B-parameter model, distilled",
    blurb: "Won the compute, distilled the model from an open GPT architecture, fine-tuned it for tool calling.",
    what: "A 2B-parameter language model distilled from an open-source GPT architecture, tuned for tool calling.",
    how: "Scoped the proposal and budget independently and secured a Google grant for compute. Applied knowledge distillation, then fine-tuned on custom tool-calling datasets.",
    result: "A smaller, cheaper model that keeps the capabilities that matter for agents.",
    tags: ["PyTorch", "Distillation", "Fine-tuning", "Google Cloud"],
    actions: [
      { label: "GitHub", href: "https://github.com/sssynk/noetic", kind: "primary", external: true },
    ],
  },
  {
    id: "prism",
    tone: "light",
    meta: "03 · Hack for Humanity · 1st of 60",
    title: "Prism: navigation for the blind",
    blurb: "Two vision-language models on Meta glasses, run in tandem, to spot people in the wearer's path.",
    what: "Prism, a wearable assistant that helps visually impaired people navigate using Meta glasses.",
    how: "Two vision-language models run together in an inference layer to raise detection accuracy; one VLM trained specifically to spot people in the wearer's path faster.",
    result: "Won Hack for Humanity against 60 teams.",
    tags: ["VLM", "Meta glasses", "Python", "Inference"],
    actions: [
      { label: "Devpost", href: "https://devpost.com/software/prism-3q067k", kind: "primary", external: true },
      { label: "GitHub", href: "https://github.com/sssynk/h4h-ar", kind: "ghost", external: true },
    ],
  },
  {
    id: "lora-immigration",
    tone: "sand",
    meta: "04 · Research · 2026",
    title: "LoRA for immigration case outcomes",
    blurb: "Gemma, Qwen, Llama on 1,467 USCIS appeals. Only one configuration beat the always-dismiss baseline.",
    what: "A benchmark of LoRA fine-tuning for predicting USCIS administrative appeal outcomes.",
    how: "Fine-tuned Gemma 4 E4B, Qwen 2.5 7B, and Llama 3.1 8B on 1,467 appeal decisions and compared against an always-dismiss baseline.",
    result: "LoRA produced architecture-specific minority-class specialisation, not uniform gains. Gemma LoRA hit macro-F1 0.341, the only config to beat the baseline.",
    tags: ["Gemma", "Qwen", "Llama", "LoRA", "HuggingFace"],
    actions: [
      { label: "Read paper", href: "/lora-immigration-case-prediction.pdf", kind: "primary", external: true },
    ],
  },
];
