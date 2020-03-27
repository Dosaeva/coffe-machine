"use strict"

let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; //"cooking" "ready"

coffeeCup.onclick = takeCoffee; //первый вариант

/*coffeeCup.addEventListener("click", takeCoffee, par1, par2) //второй вариант
coffeeCup.addEventListener("click", takeCoffee, par1, par2)
coffeeCup.addEventListener("click", takeCoffee, par1, par2)
coffeeCup.addEventListener("click", takeCoffee, par1, par2)
*/
//coffeeCup.addEventListener("click", buyCoffee, "Американо", 21)

/*coffeeCup.addEventListener("click", () => {
  takeCoffee
}*/

/*coffeeCup.onclick = function() {
  takeCoffee();
}*/

function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {
    return;
  }
  let afterBuyValue = +balance.value - cost;
  if ( (balance.value - cost) <  0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  cookCoffee(name, elem);
}

function cookCoffee(name, elem) {
  coffeeStatus ="cooking";
  changeDisplayText("Ваш " + name + " готовится");
  
  let cupImg = elem.querySelector("img");
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc);
  coffeeCup.style.opacity = "0%";
  //coffeeCup.classList.add("") //добавить класс
  coffeeCup.classList.remove("d-none"); //убрать класс
  //coffeeCup.classList.toggle("") //включить/выключить класс
  //coffeeCup.classList.contains("d-none") //содержит ли?
  
  let readyPercent = 0; //насколько % приготовился кофе
  let cookingInterval = setInterval(() => {
    readyPercent++;
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов!");
      coffeeCup.style.cursor = "pointer";
      clearInterval(cookingInterval);
    }
  }, 100);
}
function takeCoffee() {
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе");
}

function changeDisplayText(text) {
  //displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}