let columnNumber = 0;

document.addEventListener("DOMContentLoaded", function (event) {
  let modal = document.getElementById("modal");
  let modal__content = document.getElementById("modal__content");
  let catFullImg = document.getElementById("catFullImg");
});

function openModal(catUrl) {
  modal.className = "modal active";
  modal__content.className = "modal__content active";

  catFullImg.setAttribute("src", `${catUrl}`);
}

function closeModal() {
  modal.className = "modal";
  modal__content.className = "modal__content";

  catFullImg.setAttribute("src", "#");
}

async function getCat() {
  let catInfo = {};
  let response = await fetch("https://thatcopy.pw/catapi/rest/");

  response.ok
    ? (catInfo = await response.json())
    : alert("Ошибка HTTP: " + response.status);

  let cat = document.createElement("div");
  cat.setAttribute("id", `cat/${catInfo.id}`);
  cat.setAttribute("class", "cat");

  let catImg = document.createElement("img");
  catImg.setAttribute("src", `${catInfo.url}`);
  catImg.setAttribute("class", "cat-img");
  catImg.setAttribute("alt", "картинка замечательного котика");

  cat.onclick = () => {
    openModal(catInfo.url);
    console.log(`cat/${catInfo.id}`);
    console.log(catInfo.url);
  };

  cat.appendChild(catImg);

  document.getElementById(`column/${columnNumber}`).appendChild(cat);
  columnNumber < 3 ? columnNumber++ : (columnNumber = 0);
}

function someCats() {
  let numberOfCats = +document.getElementById("catInput").value;

  if (!numberOfCats) {
    numberOfCats = 1;
  }

  for (let i = 0; i < numberOfCats; i++) {
    getCat();
  }
}
