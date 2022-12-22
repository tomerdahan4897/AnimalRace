import { runners, Animal } from "./runners.js";
import { Utils } from "./utils.js";
const animalShowCase = document.getElementById(
  "animal-show-case"
) as HTMLDivElement;
const btnStart = document.getElementById("btn-start") as HTMLButtonElement;
const btnReset = document.getElementById("btn-reset") as HTMLButtonElement;
const btnStartRace = document.getElementById(
  "btn-start-race"
) as HTMLButtonElement;
const winnersDiv = document.getElementById("winnersDiv") as HTMLDivElement;

// לולאה שרצה על כל המפתחות של אובייקט
let animalsArray: Animal[] = [];
let winners: number[] = [];
let stepSum: number = 0;
let timer = 1000;
let hasWinner = false;
let raceStarted = false;

function resetGame() {
  clearWinnersDiv();
  //remove chosen from all animals
  animalsArray.forEach((a) => a.reset());
  raceStarted = false;
  hasWinner = false;
  winners = [];
  stepSum = 0;
}

btnStartRace.addEventListener("click", () => {
  clearWinnersDiv();
  if (hasWinner) {
    resetGame();
  }
  if (!raceStarted) {
    animalsArray.forEach((a) => a.run(raceEnded));
    raceStarted = true;
  }
});

btnReset.addEventListener("click", () => {
  resetGame();
});

btnStart.addEventListener("click", () => {
  clearWinnersDiv();
  if (winners.length < 4 && !hasWinner && !raceStarted) {
    const index = chooseRandomAnimal();

    winners.push(index);
    console.log(winners);

    animalsArray[index].isChoosen = true;
    const choosen = animalsArray.filter((a) => a.isChoosen);
    toggleAnimalSelection(animalsArray[index]);
    setTimeout(() => initAnimals(choosen), timer);
  }
});

function chooseRandomAnimal(): number {
  let index = 0;
  let randomNum = 0;
  while (index > -1 && winners.length < animalsArray.length) {
    randomNum = Utils.random(0, animalsArray.length);
    index = winners.findIndex((a) => {
      return a === randomNum;
    });
  }
  return randomNum;
}

function toggleAnimalSelection(animal: Animal) {
  animalsArray.forEach((a) => {
    if (a.id === animal.id) {
      a.select();
    } else {
      a.unSelect();
    }
  });
}

function initAnimals(animals: Animal[]) {
  animals
    .filter((a) => a.intervalRef == -1)
    .forEach((animal) => {
      animal.run(raceEnded);
    });
}

function raceEnded(winner: Animal) {
  hasWinner = true;

  animalsArray.filter((a) => a.isChoosen).forEach((a) => a.stop());
  const msg = animalsArray
    .sort((a, b) => b.translateX - a.translateX)
    .map(
      (a, i) =>
        ` <h2>Positions:</h2>
        <p id=p${i + 1}> <span>#${i + 1} </span> </br>${
          a.name
        } <br> Pts: ${parseInt(a.translateX.toString())}</p> </br>`
    )
    .join("");
  winnersDiv.innerHTML += msg;
  winnersDiv.classList.remove("hide");
}

function clearWinnersDiv() {
  winnersDiv.innerHTML = "";
  winnersDiv.classList.add("hide");
}

function setupRace() {
  const animals: Animal[] = [];

  for (let k in runners) {
    console.log(k); //dog, duck, horse, chick
    let key = k as keyof typeof runners; //"dog" | "duck" | "horse" | "chick";

    let animal = runners[key];

    const image = document.createElement("img");
    image.src = `images/${animal.img}`;
    image.classList.add("col", "image-fluid");
    image.id = animal.id;

    animals.push(
      new Animal(
        image,
        animal.name,
        animal.id,
        animal.voice,
        animal.img,
        animal.step,
        false,
        0
      )
    );
  }

  animals
    .sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
    .forEach((a) => {
      animalShowCase.appendChild(a.imageElement);
    });

  return animals;
}

console.log('"start"', "start");
animalsArray = setupRace();
