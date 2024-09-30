let gameseq = [];
let userseq = [];
let btns = ["box1", "box2", "box3", "box4"];
let started = false;
let level = 0;
let highestscore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelup();
  }
});
function buttonflash(randbtn) {
  randbtn.classList.add("flash");
  setTimeout(() => {
    randbtn.classList.remove("flash");
  }, 100);
}
function userflash(box) {
  box.classList.add("userflash");
  setTimeout(() => {
    box.classList.remove("userflash");
  }, 100);
}
function levelup() {
  userseq = [];
  level++;
  h2.innerText = `LEVEL-${level}`;

  let idx = Math.floor(Math.random() * 4);
  let randcolor = btns[idx];
  gameseq.push(randcolor);
  console.log(gameseq);

  let randbtn = document.querySelector(`.${randcolor}`);
  buttonflash(randbtn);
}
function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 100);
    }
  } else {
    if (level > highestscore) {
      highestscore = level;
      document.querySelector(
        ".highestscore"
      ).innerText = `Highest-Score: ${highestscore}`;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "black";
      }, 100);


    reset();
  }
}
function btnpress() {
  let box = this;
  userflash(box);
  let usercolor = box.getAttribute("id");
  userseq.push(usercolor);
  checkans(userseq.length - 1);
}

let allboxes = document.querySelectorAll(".box");
for (let box of allboxes) {
  box.addEventListener("click", btnpress);
}
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
