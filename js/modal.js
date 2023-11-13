const openModal = document.querySelector('#previewBtn');
let modalPages = modal.querySelector('.modal-pages');
const closeModal = modal.querySelector('.close-modal');

function modalOpen() {
    modal.showModal();
    modalPages.innerHTML = document.querySelector('.output-area').innerHTML;
    const allPages = modalPages.querySelectorAll('li');
    modalPages.removeAttribute('style');
    allPages.forEach(x => {
        x.removeAttribute('id');
        x.removeAttribute('class');
        x.classList.add('modal-page');
    });
    allPages[0].classList.add('model-current-page');
    translateXAmount = 0;
    modalPrevButton.classList.add('is-hidden');

    if (allPages.length === 1) {
        allPages[0].style.marginRight = 0;
    }

    if (allPages.length <= 2) {
        modalNextButton.classList.add('is-hidden');
    }
    else {
        modalNextButton.classList.remove('is-hidden');
    }
}

function modalClose() {
    modal.close();
}


openModal.addEventListener('click', modalOpen);
closeModal.addEventListener('click', modalClose)
