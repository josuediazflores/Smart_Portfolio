/**
 * Build-time generation hook.
 *
 * `npm run build` runs this script before `next build`.
 * If you later need to generate content (e.g. sitemap, search index, etc),
 * implement it here.
 */

async function main() {
  // No-op placeholder to keep builds/deploys working.
  console.log("generate: nothing to do");
}

main().catch((err) => {
  console.error("generate: failed", err);
  process.exitCode = 1;
});

