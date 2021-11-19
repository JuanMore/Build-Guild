console.log('Hello')

// Grab button
const scrollUp = document.querySelector('#btn-up')

// Show button function
window.onscroll = () => {
    scrollDown()
}

// function that displays button when user scrolls down
function scrollDown() {
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 20
    ) {
        scrollUp.style.display = 'block';
    } else {
        scrollUp.style.display = 'none';
    }
}

// When user clicks button, scrol back to top
scrollUp.addEventListener('click', backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}