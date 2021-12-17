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

// When user clicks button, scroll back to top
scrollUp.addEventListener('click', backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Like button 
let likes = 0;
document.getElementById('like-button')
const likeBtn = document.getElementById('like-button')

document.getElementById('likes').innerHTML = likes
likeBtn.onclick = () => {
    likes += 1
    likeBtn.innerHTML = likes +
    `<a href="#" id="like-button" class="d-inline-block text-muted ml-2">
    <strong id="likes"></strong> <i class="fas fa-thumbs-up"></i></small>
    </a>`
}
