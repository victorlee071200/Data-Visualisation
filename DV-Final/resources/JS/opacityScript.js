function init() {
  // Set constant
  const bg = document.getElementById("bg");
  const mountain = document.getElementById("mountain");
  const girl = document.getElementById("girl");
  const text = document.getElementById("text");

  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
        $(".topbar").css({ opacity: "0" });
      } else {
        $(".topbar").css({ opacity: "1" });
      }
    });
  });

  // opacity decrease function
}
window.onload = init;
