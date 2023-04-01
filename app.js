const tabsParent = document.querySelector(".tabheader__items");
const tabs = document.querySelectorAll(".tabheader__item");
const tabsContent = document.querySelectorAll(".tabcontent");

console.log(tabs);
// console.log(tabsParent)
console.log(tabsContent);

const hideTabContent = () => {
  tabsContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};
const showTabContent = (i = 0) => {
  tabsContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};

hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("tabheader__item")) {
    // console.log(target)
    tabs.forEach((item, i) => {
      if (target === item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

const openModalBtn = document.querySelector(".btn_white");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
}

openModalBtn.addEventListener("click", openModal);

const closeModal = () => {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

modalCloseBtn.addEventListener("click", closeModal);

// modal.addEventListener('click', closeModal)

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight &&
    !modal.classList.toggle("show")
  ) {
    openModal();
  }
});

const prev = document.querySelector(".offer__slider-prev");
const next = document.querySelector(".offer__slider-next");
// const offerSlide = document.querySelector(".offer__slider-wrapper");
// const slides = document.querySelectorAll(".offer__slide");

// var slideIndex = 1;
// showSlides(slideIndex);

// next.addEventListener("click", function () {
//   showSlides((slideIndex += 1));
//   clearInterval(timer);
//   timer = setInterval(function () {
//     slideIndex++;
//     showSlides(slideIndex);
//   }, 5000);
// });

// prev.addEventListener("click", function () {
//   showSlides((slideIndex -= 1));
//   clearInterval(timer);
//   timer = setInterval(function () {
//     slideIndex++;
//     showSlides(slideIndex);
//   }, 5000);
// });

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   let slides = document.querySelectorAll(".offer__slide");
//   console.log(slides);
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }

//   for (let slide of slides) {
//     slide.style.display = "none";
//   }
//   slides[slideIndex - 1].style.display = "flex";
// }

// let timer = setInterval(function () {
//   slideIndex++;
//   showSlides(slideIndex);
// }, 5000);

// 5 lesson

const forms = document.querySelectorAll("form");
const modalErr = document.querySelector(".modalErr");
const modalCloseBtnErr = document.querySelector(".modal__closeErr");
const errMess = document.querySelector(".errMess");

function openModalErr() {
  modalErr.classList.add("show");
  modalErr.classList.remove("hide");
  document.body.style.overflow = "hidden";
}

const closeModalErr = () => {
  modalErr.classList.add("hide");
  modalErr.classList.remove("show");
  document.body.style.overflow = "";
};

modalCloseBtnErr.addEventListener("click", closeModalErr);

const postData = (url, data) => {
  const request = fetch(url, {
    method: "POST",
    Headers: {"Content-Type" : "applcation/json"},
    body: data,
  });
  return request;  
}


const BindPostData = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const obj = {};

    formData.forEach((item, name) => {
      obj[name] = item;
    });
    const json = JSON.stringify(obj);

    // const request = new XMLHttpRequest();
    // request.open("POST", "server.php");
    // request.setRequestHeader("Content-type", "application/json");
    // request.onreadystatechange = function () {
    //   if (this.status >= 400 && this.status <= 500) {
    //     openModalErr();
    //     errMess.innerHTML = "Ошибка на стороне клиента!!!";
    //   }
    //   if (this.status >= 200 && this.status <= 300) {
    //     openModalErr();
    //     errMess.innerHTML = "Запрос успешен!!!";
    //   }
    //   if (this.status >= 500 && this.status <= 600) {
    //     openModalErr();
    //     errMess.innerHTML = "Ошибка на стороне сервера!!!";
    //   }
    // };

    // console.log(request.status);
    // request.send(json);


    // lesson 6

    

    postData("server.php", json)
    .then((response) => response)
    .then((data) => {
      if (data.status >= 400 && data.status <= 500) {
            openModalErr();
            errMess.innerHTML = "Ошибка на стороне клиента!!!";
          }
          if (data.status >= 200 && data.status <= 300) {
            openModalErr();
            errMess.innerHTML = "Запрос успешен!!!";
          }
          if (data.status >= 500 && data.status <= 600) {
            openModalErr();
            errMess.innerHTML = "Ошибка на стороне сервера!!!";
          }
    })
    
    .catch((e) => console.error(e))
    .finally(() => console.warn("finally"))

  });
};
forms.forEach((item)=> {
  BindPostData(item);
})





