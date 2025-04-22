function menu(name) {
  let main = document.getElementsByClassName("main");
  for (let m of main) {
    m.style.display = "none";
  }

  let elem = document.getElementById(name);
  elem.style.display = "block";
}

menu("podstrona1");

const buttons = [
  { id: "bt1", target: "podstrona1" },
  { id: "bt2", target: "podstrona2" },
  { id: "bt3", target: "podstrona3" },
  { id: "bt4", target: "podstrona1" },
  { id: "bt5", target: "podstrona2" },
  { id: "bt6", target: "podstrona3" },
];

buttons.forEach(btn => {
  const element = document.getElementById(btn.id);
  element.addEventListener("click", () => {
    menu(btn.target);
    if (btn.target === "podstrona3") {
      if (!document.querySelector(".modal")) {
        initGallery();
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const menuElement = document.querySelector(".menu");

  hamburger.addEventListener("click", function () {
    menuElement.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!menuElement.contains(event.target) && !hamburger.contains(event.target)) {
      menuElement.classList.remove("active");
    }
  });


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

  function restartInterval() {
    clearInterval(interval);
    interval = setInterval(() => changeImage(currentIndex + 1), 3000);
  }

  prevButton.addEventListener("click", () => {
    changeImage(currentIndex - 1);
    restartInterval();
  });

  nextButton.addEventListener("click", () => {
    changeImage(currentIndex + 1);
    restartInterval();
  });


  document.getElementById("contactForm").addEventListener("submit", function (event) {
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


  if (document.getElementById("podstrona3") && !document.querySelector(".modal")) {
    initGallery();
  }
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


function initGallery() {
  const gallery = document.getElementById("podstrona3");
  const images = gallery.querySelectorAll("img");
  const loadMoreBtn = document.getElementById("toggleGallery");
  const visibleCount = 8;

  if (!document.querySelector(".modal")) {
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

    let modalIndex = 0;

    function openModal(index) {
      modalIndex = index;
      modal.style.display = "block";
      modalImg.src = images[modalIndex].src;
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function showPrev() {
      modalIndex = (modalIndex - 1 + images.length) % images.length;
      modalImg.src = images[modalIndex].src;
    }

    function showNext() {
      modalIndex = (modalIndex + 1) % images.length;
      modalImg.src = images[modalIndex].src;
    }

    images.forEach((img, index) => {
      img.addEventListener("click", () => openModal(index));
    });

    closeBtn.addEventListener("click", closeModal);
    leftArrow.addEventListener("click", showPrev);
    rightArrow.addEventListener("click", showNext);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (modal.style.display === "block") {
        if (e.key === "ArrowLeft") showPrev();
        else if (e.key === "ArrowRight") showNext();
        else if (e.key === "Escape") closeModal();
      }
    });
  }

  function updateVisibleImages() {
    images.forEach((img, index) => {
      img.style.display = (gallery.classList.contains("expanded") || index < visibleCount)
        ? "inline-block"
        : "none";
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      gallery.classList.toggle("expanded");
      loadMoreBtn.textContent = gallery.classList.contains("expanded")
        ? "Pokaż mniej"
        : "Pokaż więcej";
      updateVisibleImages();
    });

    gallery.classList.remove("expanded");
    loadMoreBtn.textContent = "Pokaż więcej";
    updateVisibleImages();
  }
}
