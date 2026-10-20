// Mini phone mock for interactive UI toys (styles: .phone in style.css).
//
// PhoneToy.draw(el, screen) replaces el's content with a phone showing `screen`:
//   { title, buttonLabel, buttonEnabled, spinner, status, statusError, rows: [string] }
// Missing fields fall back to an idle screen. Lessons keep their own state and event
// logic and call draw() whenever they want the phone to show something new.
window.PhoneToy = (() => {
  const text = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value != null) node.textContent = value;
    return node;
  };

  const draw = (el, screen = {}) => {
    el.classList.add("phone");
    el.replaceChildren();
    el.append(text("div", "p-title", screen.title ?? "Device Monitor"));
    const button = text("div", "p-btn", screen.buttonLabel ?? "Scan");
    if (screen.buttonEnabled === false) button.classList.add("off");
    el.append(button);
    const status = text("div", "p-status");
    if (screen.statusError) status.classList.add("err");
    if (screen.spinner) status.append(text("span", "p-spin"));
    status.append(text("span", null, screen.status ?? ""));
    el.append(status);
    (screen.rows ?? []).forEach((row) => el.append(text("div", "p-row", row)));
  };

  return { draw };
})();
