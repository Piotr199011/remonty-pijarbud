function menu(name){
  let main=document.getElementsByClassName("main");
  for (let m of main){
    m.style.display="none";}

  let elem = document.getElementById(name);
  elem.style.display="block";
}

menu("podstrona1");
let bt1=document.getElementById('bt1');
bt1.addEventListener('click',()=>{menu('podstrona1')})
let bt2=document.getElementById('bt2');
bt2.addEventListener('click',()=>{menu('podstrona2')})
let bt3=document.getElementById('bt3');
bt3.addEventListener('click',()=>{menu('podstrona3')})
let bt4=document.getElementById('bt4');
bt4.addEventListener('click',()=>{menu('podstrona1')})
let bt5=document.getElementById('bt5');
bt5.addEventListener('click',()=>{menu('podstrona2')})
let bt6=document.getElementById('bt6');
bt6.addEventListener('click',()=>{menu('podstrona3')})

document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", function() {
    menu.classList.toggle("active");
  });

  document.addEventListener("click", function(event) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "img/docieplenia.png",
    "img/panele.png",
    "img/poddasza.png",
    "img/plytki.png",
    "img/gladz.png",
    "img/elektryka.png",
        "img/hydraulika.png",
  ];

  let currentIndex = 0;
  const section = document.getElementById("podstrona1");

  const imageElement = document.createElement("img");
  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");

  imageElement.src = images[currentIndex];
  imageElement.classList.add("slider-image");

  prevButton.innerHTML = "\u25C0";
  nextButton.innerHTML = "\u25B6";
  prevButton.classList.add("slider-button", "left");
  nextButton.classList.add("slider-button", "right");

  section.appendChild(imageElement);
  section.appendChild(prevButton);
  section.appendChild(nextButton);

  function changeImage(index) {
    currentIndex = (index + images.length) % images.length;
    imageElement.src = images[currentIndex];
  }

  let interval = setInterval(() => changeImage(currentIndex + 1), 3000);

  prevButton.addEventListener("click", () => {
    changeImage(currentIndex - 1);
    restartInterval();
  });

  nextButton.addEventListener("click", () => {
    changeImage(currentIndex + 1);
    restartInterval();
  });

  function restartInterval() {
    clearInterval(interval);
    interval = setInterval(() => changeImage(currentIndex + 1), 3000);
  }
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let formData = new FormData(this);

  fetch("send_email.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("formMessage").innerText = data;
    document.getElementById("contactForm").reset();
  })
  .catch(error => {
    document.getElementById("formMessage").innerText = "Wystąpił błąd, spróbuj ponownie.";
  });
});

function toggleCustomSubject() {
  const subjectSelect = document.getElementById("subject");
  const customSubjectInput = document.getElementById("customSubject");

  if (subjectSelect.value === "Inny") {
    customSubjectInput.style.display = "block";
    customSubjectInput.setAttribute("required", "true");
  } else {
    customSubjectInput.style.display = "none";
    customSubjectInput.removeAttribute("required");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery img");

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modal-img">
    <div class="arrow left">&#10094;</div>
    <div class="arrow right">&#10095;</div>
  `;
  document.body.appendChild(modal);

  const modalImg = document.getElementById("modal-img");
  const closeBtn = modal.querySelector(".close");
  const leftArrow = modal.querySelector(".left");
  const rightArrow = modal.querySelector(".right");

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modal.style.display = "block";
    modalImg.src = galleryImages[currentIndex].src;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  closeBtn.addEventListener("click", closeModal);
  leftArrow.addEventListener("click", showPrev);
  rightArrow.addEventListener("click", showNext);


  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });


  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Escape") closeModal();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("podstrona3");
  const images = gallery.querySelectorAll("img");
  const loadMoreBtn = document.getElementById("toggleGallery");

  const visibleCount = 8;

  function updateVisibleImages() {
    images.forEach((img, index) => {
      if (gallery.classList.contains("expanded") || index < visibleCount) {
        img.style.display = "inline-block";
      } else {
        img.style.display = "none";
      }
    });
  }

  loadMoreBtn.addEventListener("click", function () {
    gallery.classList.toggle("expanded");

    if (gallery.classList.contains("expanded")) {
      loadMoreBtn.textContent = "Pokaż mniej";
    } else {
      loadMoreBtn.textContent = "Pokaż więcej";
    }

    updateVisibleImages();
  });


  gallery.classList.remove("expanded");
  loadMoreBtn.textContent = "Pokaż więcej";
  updateVisibleImages();
});




