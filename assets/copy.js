// Adds a "Copy" button to every .copy-wrap element; copies the text of its <pre>.
// Agent briefs name their sources by the published site's URL. When the course is
// opened from somewhere else (a local clone via file:// or localhost), those URLs are
// rewritten to point at this copy, so the agent reads the lesson the learner is reading.
const PUBLISHED_ROOT = "https://phongna-inn.github.io/carmd-kmp-course/";
const SITE_ROOT = new URL("../", document.currentScript.src).href;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-wrap").forEach((wrap) => {
    const pre = wrap.querySelector("pre");
    if (!pre) return;
    if (SITE_ROOT !== PUBLISHED_ROOT && pre.textContent.includes(PUBLISHED_ROOT)) {
      pre.textContent = pre.textContent.replaceAll(PUBLISHED_ROOT, SITE_ROOT);
    }
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Select & copy manually";
      }
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    });
    wrap.appendChild(btn);
  });
});
