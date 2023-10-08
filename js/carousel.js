const output = document.querySelector('.output-area');
const pages = Array.from(output.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNavs = document.querySelector('.carousel__nav');

function moveToSlide(currentPage, targetPage) {
    currentPage.classList.remove('current-page');
    targetPage.classList.add('current-page');
}


function updateDots(currentDot, targetDot) {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}








prevButton.addEventListener('click', e => {
    const currentPage = output.querySelector('.current-page');
    const prevPage = currentPage.previousElementSibling;
    moveToSlide(currentPage, prevPage);

    const currentDot = dotsNavs.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);

})

nextButton.addEventListener('click', e => {
    const currentPage = output.querySelector('.current-page');
    const nextPage = currentPage.nextElementSibling;
    moveToSlide(currentPage, nextPage);

    const currentDot = dotsNavs.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);
})

dotsNavs.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentPage = output.querySelector('.current-page');
    const currentDot = dotsNavs.querySelector('.current-dot');

    const dots = Array.from(dotsNavs.children);
    const targetIndex = dots.findIndex(dot => dot === targetDot);

})