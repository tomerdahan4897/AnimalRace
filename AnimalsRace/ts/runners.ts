import { Utils } from "./utils.js";

export interface AnimalType {
  name: string;
  id: string;
  voice: string;
  img: string;
  step: number;
}
export const runners = {
  dog: {
    name: "dog",
    id: "dog",
    voice: "woof",
    img: "dog.png",
    step: 50,
  },
  horse: {
    name: "horse",
    id: "horse",
    voice: "neigh",
    img: "horse.png",
    step: 70,
  },
  duck: {
    name: "duck",
    id: "duck",
    voice: "quack",
    img: "duck.png",
    step: 40,
  },
  chick: {
    name: "chick",
    id: "chick",
    voice: "cheap",
    img: "chick.png",
    step: 30,
  },
};

const interval = 10;

export class Animal implements AnimalType {
  imageElement: HTMLImageElement;
  name: string;
  id: string;
  voice: string;
  img: string;
  step: number;
  isChoosen: boolean;
  intervalRef: number;
  //for CSS transform (move)
  translateX: number;
  speedFactor: number = 10;

  constructor(
    imageElement: HTMLImageElement,
    name: string,
    id: string,
    voice: string,
    img: string,
    step: number,
    isChoosen: boolean,
    translateX: number
  ) {
    this.imageElement = imageElement;
    this.name = name;
    this.id = id;
    this.voice = voice;
    this.img = img;
    this.step = step;
    this.isChoosen = isChoosen;
    this.translateX = translateX;
    this.intervalRef = -1;
    this.speedFactor = this.calculateSpeedFactor();
  }

  calculateSpeedFactor() {
    return Utils.random(0, 20) * 10;
  }

  reset() {
    this.stop();
    this.isChoosen = false;
    this.translateX = 0;
    this.intervalRef = -1;
    this.unSelect();
    this.position();
    this.speedFactor = this.calculateSpeedFactor();
  }

  position() {
    this.imageElement.style.transform = `translateX(${this.translateX}px)`;
  }

  init() {
    this.isChoosen = true;
    const audio = new Audio(`./media/${this.voice}.wav`);
    audio.play();
  }

  move() {
    this.translateX += (this.step + this.speedFactor) / 70;
    this.position();
  }

  stop() {
    clearInterval(this.intervalRef);
  }
  run(raceEndedCallback: any) {
    this.init();
    this.intervalRef = setInterval(() => {
      this.move();
      if (this.isWin()) {
        this.stop();
        raceEndedCallback(this);
      }
    }, interval);
  }

  select() {
    this.imageElement.classList.add("chosen-animal");
  }
  unSelect() {
    this.imageElement.classList.remove("chosen-animal");
  }

  isWin() {
    return (
      this.imageElement.getBoundingClientRect().x >
      document.body.getBoundingClientRect().width - 120
    );
  }
}
