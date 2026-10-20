// UI-track switcher. Put one or both of these in the lesson header:
//   <div class="switcher" data-platform="android"></div>
//   <div class="switcher" data-platform="ios"></div>
// Mark track-specific content with data-track="xml|compose|uikit|swiftui".
// Group alternatives in a .tracks container: in "Both" mode it lays them out side by side.
// Content with data-both-only="android|ios" (e.g. a "what changed and why" note) shows only in Both mode.
// The choice is remembered per browser; the default is Compose + SwiftUI.
(() => {
  const PLATFORMS = {
    android: { label: "Android", options: ["xml", "compose"], names: { xml: "XML Views", compose: "Compose" }, fallback: "compose" },
    ios: { label: "iOS", options: ["uikit", "swiftui"], names: { uikit: "UIKit", swiftui: "SwiftUI" }, fallback: "swiftui" },
  };
  const KEY = "course.uiTracks";
  const platformOf = (track) => Object.keys(PLATFORMS).find((p) => PLATFORMS[p].options.includes(track));

  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  const save = (state) => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable: keep in memory */ }
  };

  const state = Object.assign({ android: PLATFORMS.android.fallback, ios: PLATFORMS.ios.fallback }, load());

  const apply = () => {
    document.querySelectorAll("[data-track]").forEach((el) => {
      const p = platformOf(el.dataset.track);
      el.hidden = !(state[p] === "both" || state[p] === el.dataset.track);
    });
    document.querySelectorAll("[data-both-only]").forEach((el) => {
      el.hidden = state[el.dataset.bothOnly] !== "both";
    });
    document.querySelectorAll(".tracks").forEach((group) => {
      const p = platformOf(group.querySelector("[data-track]")?.dataset.track || "");
      group.classList.toggle("both", !!p && state[p] === "both");
    });
    document.querySelectorAll(".switcher button").forEach((b) => {
      b.setAttribute("aria-pressed", String(state[b.dataset.platform] === b.dataset.choice));
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".switcher[data-platform]").forEach((sw) => {
      const p = sw.dataset.platform;
      const cfg = PLATFORMS[p];
      if (!cfg) return;
      const label = document.createElement("span");
      label.className = "switcher-label";
      label.textContent = cfg.label;
      sw.appendChild(label);
      [...cfg.options, "both"].forEach((choice) => {
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.platform = p;
        b.dataset.choice = choice;
        b.textContent = choice === "both" ? "Both" : cfg.names[choice];
        b.addEventListener("click", () => { state[p] = choice; save(state); apply(); });
        sw.appendChild(b);
      });
    });
    apply();
  });
})();
