let win = new Audio("./win.mp3");
let loose = new Audio("./loose.mp3");
let gamePlayMusic = new Audio("./gameplay.mp3");
let audioclick = new Audio("./click.mp3");
gamePlayMusic.play();

let turn = "X";
let gameOver = false;
//
let counter = 0;
//Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};
var gameContainerDiv = document.getElementById("clickableDivs");

//Function to chech the win
const checkWin = () => {
  counter++;
  let boxText = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 15, -10, 90],
    [3, 4, 5, 15, 0, 90],
    [6, 7, 8, 15, 10, 90],
    [0, 3, 6, 5, 2, 0],
    [1, 4, 7, 15, 2, 0],
    [2, 5, 8, 25, 2, 0],
    [0, 4, 8, 15, 0, 135],
    [2, 4, 6, 15, 0, 45],
  ];
  wins.forEach((item) => {

    if (
      boxText[item[0]].innerText === boxText[item[1]].innerText &&
      boxText[item[2]].innerText === boxText[item[1]].innerText &&
      boxText[item[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        "Player " + boxText[item[0]].innerText + " Won";
      document
        .querySelector(".imageBox")
        .getElementsByTagName("img")[0].style.width = "200px";
        win.play();
      gameOver = true;
      boxText[item[0]].style.color = "pink";
      boxText[item[1]].style.color = "pink";
      boxText[item[2]].style.color = "pink";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${item[3]}vw , ${item[4]}vw) rotate(${item[5]}deg)`;
      document.querySelector(".line").style.height = "30vw";
      document.querySelector(".line").style.width = "3px";
      var cells = document.querySelectorAll("#board .box");
      cells.forEach(function (cell) {
        cell.classList.add("disabled");
      });
    } else if (
      boxText[item[0]].innerText !== boxText[item[1]].innerText &&
      boxText[item[2]].innerText !== boxText[item[1]].innerText &&
      counter === 9 &&
      gameOver === false
    ) {
      document.querySelector(".info").innerText = "Game Tie!";
      loose.play();
      gameOver = true;
      var cells = document.querySelectorAll("#board .box");
      cells.forEach(function (cell) {
        cell.classList.add("disabled");
      });
    }
  });
};
//Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();
      audioclick.play();
      checkWin();
      if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
        boxText.style.color = "black";
      } else {
        gamePlayMusic.pause();
      }
    }
  });
});

reset.addEventListener("click", () => {
  let boxTexts = document.querySelectorAll(".boxtext");
  Array.from(boxTexts).forEach((element) => {
    element.innerText = "";
    element.style.color = "black";
  });
  turn = "X";
  gameOver = false;
  counter = 0;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document
    .querySelector(".imageBox")
    .getElementsByTagName("img")[0].style.width = "0vw";
  document.querySelector(".line").style.width = "0vw";
  var cells = document.querySelectorAll("#board .box");
  cells.forEach(function (cell) {
    cell.classList.remove("disabled");
  });
});
