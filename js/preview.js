document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".textOutput");
  const closeModal = document.querySelector(".close")
  const preBtn = document.getElementById("previewBtn");
  const preBox = document.getElementById("preBox");
  const outputContent = document.getElementById("content");
  const inputContent = document.getElementById("editor");

  let currentIndex = 0;

  function showContent(index) {
    outputContent.innerHTML = pages[index].innerHTML;
  }

  closeModal.addEventListener("click", () => {
    preBox.style.display = "none";
});

  preBtn.addEventListener('click', function () {
    showContent(currentIndex); // Show content of the current index

    if (preBox.style.display === "none") {
      preBox.style.display = "block"; // Show the preview box
    } else {
      preBox.style.display = "none"; // Hide the preview box
    }
  });
  // You may also want to add functionality to navigate between pages (currentIndex++) as in your first code.
});