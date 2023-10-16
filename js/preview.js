const previews = document.querySelectorAll(".textOutput");
const modal = document.getElementById("modalTest");
const modalContent = document.getElementById("modal-contentTest");
const closeModal = document.getElementById("close-modalTest");
const showModalButton = document.getElementById("showModalButton");


let currentIndex = 0;

function showContent(index) {
    modalContent.innerHTML = previews[index].innerHTML;
}

previews.forEach((preview, index) => {
    preview.addEventListener("click", () => {
        modal.style.display = "block";
        showContent(index);
        currentIndex = index;
    });
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        currentIndex = (currentIndex + 1) % previews.length;
        showContent(currentIndex);
    }
});

showModalButton.addEventListener("click", () => {
    modal.style.display = "block";
    showContent(currentIndex); // Show the current content when the button is clicked
});