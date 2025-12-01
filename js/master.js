// ==== =====================================  ====
// ==          gallary Section                   ==
// ==== ====================================   ====

let gallaryimgs = document.querySelectorAll(".gallary img");
console.log(gallaryimgs);
gallaryimgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    let overlay = document.createElement("div");
    overlay.className = "popup-overllay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);
    let popupImg = document.createElement("img");

    if (img.alt !== null) {
      let imgTitel = document.createElement("h2");
      imgTitel.className = "img-titel";
      imgTitel.textContent = img.alt;
      popupBox.appendChild(imgTitel);
    }

    popupImg.className = "popup-img";
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    let closeButton = document.createElement("span");
    let closeBtext = document.createTextNode("X");
    closeButton.className = "close-button";
    closeButton.appendChild(closeBtext);
    popupBox.appendChild(closeButton);
  });
});
// close button on click
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overllay").remove();
  }
});
