function init() {
  const bg = document.getElementById("bg");
  const mountain = document.getElementById("mountain");
  const girl = document.getElementById("girl");
  const text = document.getElementById("text");
  const topbar = document.getElementById("topbar");

  window.addEventListener("scroll", () => {
    const value = window.scrollY;

    if (value > 0) {
      topbar.style.opacity = 0;
    } else {
      topbar.style.opacity = 1;
    }

    bg.style.top = value * 0.5 + "px";
    mountain.style.top = -value * 0.08 + "px";
    girl.style.top = value * 0.15 + "px";
    text.style.top = value * 0.6 + "px";
  });
}
window.onload = init;
