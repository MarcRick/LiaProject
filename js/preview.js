const listItems = document.querySelectorAll('.textOutput');
let currentIndex = 0;

function showNextItem() {
  listItems[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % listItems.length;
  listItems[currentIndex].style.display = 'block';
}

document.getElementById('next-button').addEventListener('click', showNextItem);

// Show the first item initially
listItems[currentIndex].style.display = 'block';