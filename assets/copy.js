// Adds a "Copy" button to every .copy-wrap element; copies the text of its <pre>.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-wrap").forEach((wrap) => {
    const pre = wrap.querySelector("pre");
    if (!pre) return;
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
