document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".textOutput")
  const preBtn = document.getElementById("previewBtn")
  const outputContent = document.getElementById("content")
  const inputContent = document.getElementById("editor")
  const preBox = document.getElementById("preBox");

  let currentIndex = 0;

  function showContent(index) {
    outputContent.innerHTML = pages[index].innerHTML;
  }


  preBtn.addEventListener('click', function () {
    console.log(inputContent.value)
    console.log(outputContent)
    console.log(pages)
    showContent(index)
      if (preBox.style.display === "none")
          preBox.style.display = "block"; // Change the display property
      else
          preBox.style.display = "none";
    });

});