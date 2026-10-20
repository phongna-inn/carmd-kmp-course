// Shared retrieval-quiz widget. Each .quiz element needs a nested
// input[data-answer], a button, and a .feedback element.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz").forEach((quiz) => {
    const input = quiz.querySelector("input[data-answer]");
    const button = quiz.querySelector("button");
    const feedback = quiz.querySelector(".feedback");
    if (!input || !button || !feedback) return;

    const check = () => {
      const expected = input.dataset.answer
        .trim()
        .toLowerCase();
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
});
