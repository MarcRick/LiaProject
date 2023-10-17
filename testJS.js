const boxes = document.querySelectorAll(".box");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

let currentIndex = 0;

function showContent(index) {
    modalContent.innerHTML = boxes[index].innerHTML;
}

boxes.forEach((derp, index) => {
    derp.addEventListener("click", () => {
        modal.style.display = "block";
        showContent(index);
        currentIndex = index;
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        console.log()
        currentIndex = (currentIndex + 1) % boxes.length;
        showContent(currentIndex);
    }
});