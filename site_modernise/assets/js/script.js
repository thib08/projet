const galleryContainer = document.getElementById('galleryContainer');
const modal = document.getElementById('carouselModal');
const modalImg = document.getElementById('carouselImage');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let images = [];
let currentIndex = 0;

// Charger les images depuis le JSON
fetch('assets/json/images.json')
    .then(response => response.json())
    .then(data => {
        images = data;
        generateGallery();
    });

function generateGallery() {
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('gallery-img');

        img.addEventListener('click', () => {
            currentIndex = index;
            showImage();
            modal.style.display = "flex";
        });

        galleryContainer.appendChild(img);
    });
}

function showImage() {
    modalImg.src = images[currentIndex];
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});