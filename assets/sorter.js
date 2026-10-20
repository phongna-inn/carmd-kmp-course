// Click-to-classify drill: the learner puts each item into one of a few buckets
// (a layer, a thread, a lifecycle…) and gets feedback on each item immediately.
//
//   <div class="sorter" data-buckets="UI|Domain|Data">
//     <div class="sort-item" data-answer="Domain">
//       <span class="sort-label"><code>BleScanner</code> interface</span>
//       <p class="why">Why that bucket, shown after the pick.</p>
//     </div>
//     …
//     <p class="sort-score"></p>   (optional: "4 / 6 right" once every item is answered)
//   </div>
//
// Bucket names are written once on the container, so every item shows the same buttons
// in the same order and formatting gives nothing away. Styles: .sorter in style.css.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sorter[data-buckets]").forEach((sorter) => {
    const buckets = sorter.dataset.buckets.split("|");
    const items = [...sorter.querySelectorAll(".sort-item")];
    const score = sorter.querySelector(".sort-score");
    let answered = 0;
    let right = 0;

    items.forEach((item) => {
      const choices = document.createElement("div");
      choices.className = "sort-choices";
      buckets.forEach((bucket) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = bucket;
        b.addEventListener("click", () => {
          if (item.classList.contains("answered")) return;
          item.classList.add("answered");
          const ok = bucket === item.dataset.answer;
          b.classList.add(ok ? "picked-right" : "picked-wrong");
          if (!ok) {
            [...choices.children].find((c) => c.textContent === item.dataset.answer)?.classList.add("picked-right");
          }
          answered += 1;
          if (ok) right += 1;
          if (score && answered === items.length) {
            score.textContent = `${right} / ${items.length} right.` +
              (right === items.length ? "" : " Read the notes under the red ones, then try them again tomorrow.");
            score.classList.add("show");
          }
        });
        choices.appendChild(b);
      });
      item.insertBefore(choices, item.querySelector(".why"));
    });
  });
});
