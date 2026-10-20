// Shared retrieval-quiz widgets.
//
// Free-text: a .quiz element with a nested input[data-answer], a button, and a .feedback element.
//
// Multiple choice: a .quiz.mcq element containing .opts > button.opt (exactly one with
// data-correct), a .feedback element, and an optional .why explanation revealed after
// the first pick. Write options with equal length so formatting gives nothing away.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz:not(.mcq)").forEach((quiz) => {
    const input = quiz.querySelector("input[data-answer]");
    const button = quiz.querySelector("button");
    const feedback = quiz.querySelector(".feedback");
    if (!input || !button || !feedback) return;

    const check = () => {
      const expected = input.dataset.answer.trim().toLowerCase();
      const actual = input.value.trim().toLowerCase();
      feedback.classList.remove("correct", "incorrect");
      feedback.classList.add("show");
      if (actual === expected) {
        feedback.textContent = "Correct.";
        feedback.classList.add("correct");
      } else {
        feedback.textContent = `Not quite — answer: ${input.dataset.answer}`;
        feedback.classList.add("incorrect");
      }
    };

    button.addEventListener("click", check);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") check();
    });
  });

  document.querySelectorAll(".quiz.mcq").forEach((quiz) => {
    const feedback = quiz.querySelector(".feedback");
    quiz.querySelectorAll("button.opt").forEach((opt) => {
      opt.addEventListener("click", () => {
        if (quiz.classList.contains("answered")) return;
        quiz.classList.add("answered");
        const right = opt.hasAttribute("data-correct");
        opt.classList.add(right ? "picked-right" : "picked-wrong");
        if (!right) quiz.querySelector("button.opt[data-correct]").classList.add("picked-right");
        if (feedback) {
          feedback.textContent = right ? "Correct." : "Not quite. The highlighted option is right.";
          feedback.className = `feedback show ${right ? "correct" : "incorrect"}`;
        }
      });
    });
  });
});
