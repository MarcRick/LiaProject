const output = document.querySelector('.output-area');
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNavs = document.querySelector('.carousel__nav');

const modal = document.querySelector('.modal');
const modalNextButton = modal.querySelector('.modal-right');
const modalPrevButton = modal.querySelector('.modal-left');

let translateXAmount = 0;


function moveToSlide(currentPage, targetPage) {
    currentPage.classList.remove('current-page');
    targetPage.classList.add('current-page');
}


function updateDots(currentDot, targetDot) {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}


function hideShowArrows(slides, prevButton, nextButton, targetIndex) {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}





prevButton.addEventListener('click', e => {
    const currentPage = output.querySelector('.current-page');
    const prevPage = currentPage.previousElementSibling;
    moveToSlide(currentPage, prevPage);

    const currentDot = dotsNavs.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);

    const pages = Array.from(output.children);
    const prevIndex = pages.findIndex(slide => slide === prevPage);
    hideShowArrows(pages, prevButton, nextButton, prevIndex);
})

modalNextButton.addEventListener('click', e => {
    const currentSlide = modal.querySelector('.model-current-page');
    const nextSlide = currentSlide.nextElementSibling;
    const displayPage = nextSlide.nextElementSibling;

    const amountToMove = (currentSlide.offsetLeft - displayPage.offsetLeft) + translateXAmount;
    translateXAmount = amountToMove;
    modalPages.style.transform = `translateX(${amountToMove}px)`;

    currentSlide.classList.remove('model-current-page');
    displayPage.classList.add('model-current-page');

    const pages = Array.from(modalPages.children);
    const prevIndex = pages.findIndex(slide => slide === displayPage);
    if (pages.length % 2 === 0) {
        pages.pop();
    }
    hideShowArrows(pages, modalPrevButton, modalNextButton, prevIndex);
})

modalPrevButton.addEventListener('click', e => {
    const currentSlide = modal.querySelector('.model-current-page');
    const nextSlide = currentSlide.previousElementSibling;
    const displayPage = nextSlide.previousElementSibling;
    

    const amountToMove = (currentSlide.offsetLeft - displayPage.offsetLeft) + translateXAmount;
    translateXAmount = amountToMove;
    modalPages.style.transform = `translateX(${amountToMove}px)`;

    currentSlide.classList.remove('model-current-page');
    displayPage.classList.add('model-current-page');

    const pages = Array.from(modalPages.children);
    const prevIndex = pages.findIndex(slide => slide === displayPage);
    hideShowArrows(pages, modalPrevButton, modalNextButton, prevIndex);
})


nextButton.addEventListener('click', e => {
    const currentPage = output.querySelector('.current-page');
    const nextPage = currentPage.nextElementSibling;
    moveToSlide(currentPage, nextPage);

    const currentDot = dotsNavs.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);

    const pages = Array.from(output.children);
    const prevIndex = pages.findIndex(slide => slide === nextPage);
    hideShowArrows(pages, prevButton, nextButton, prevIndex);
})

dotsNavs.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentPage = output.querySelector('.current-page');
    const currentDot = dotsNavs.querySelector('.current-dot');

    const dots = Array.from(dotsNavs.children);
    const targetIndex = dots.findIndex(dot => dot === targetDot);

    const pages = Array.from(output.children);
    const targetSlide = pages[targetIndex];

    moveToSlide(currentPage, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(pages, prevButton, nextButton, targetIndex);

})