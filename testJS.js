const boxes = document.querySelectorAll(".box");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

let currentIndex = 0;

function showContent(index) {
    modalContent.innerHTML = boxes[index].innerHTML;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        modal.style.display = "block";
        showContent(index);
        currentIndex = index;
    });
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        currentIndex = (currentIndex + 1) % boxes.length;
        showContent(currentIndex);
    }
});