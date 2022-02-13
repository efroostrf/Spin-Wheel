import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Wheel } from "./wheel";
import { FRAMES } from "./frames";
import { PrizeWindow } from './PrizeWindow';
import { SpinSaver } from './spinsaver';

console.log(FRAMES);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

class CompleteWheel {
  constructor(canvas, asset, maxSpins) {
    this.prizes = {};
    this.spinsStorage = new SpinSaver(maxSpins);
    this.wheel = new Wheel(canvas, FRAMES, 475, 500, 75);
    this.onClickStart = function() {
      this.runRandom();
    };
    this.onWin = function() {};
    this.onLose = function() {};
    this.asset = asset;
    this.coin = {};
    this.random = null;
  }

  setPrizes(prizes) {
    this.prizes = prizes;
    this.wheel.prizes = prizes;
  }

  runLose() {
    if (this.wheel.spinAnimation.enabled) return;
    
    var variants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var prizeVariants = Object.keys(this.wheel.prizes);

    for (let index in prizeVariants) {
      let prizeNumber = Number(prizeVariants[index]);
      variants.splice( variants.indexOf(prizeNumber), 1 );
    }

    this.random = getRndInteger(0, variants.length);

    this.coin = {
      name: false,
      text: 'none'
    };
    this.wheel.speedRotateRingToPrize(variants[this.random]);
  }

  runWin() {
    if (this.wheel.spinAnimation.enabled) return;

    var prizesIds = Object.keys(this.wheel.prizes);
    var randomPrize = getRndInteger(0, prizesIds.length);

    this.coin = this.wheel.prizes[ prizesIds[randomPrize] ];
    this.wheel.speedRotateRingToPrize(prizesIds[randomPrize]);
  }

  runRandom() {
    if (this.wheel.spinAnimation.enabled) return;

    this.random = getRndInteger(1, 16);
    this.coin = this.wheel.prizes[this.random];

    if (!this.coin) {
      this.coin = {
        name: false,
        text: 'none'
      };
    }

    this.wheel.speedRotateRingToPrize(this.random);
  }

  runSelected(index) {
    if (this.wheel.spinAnimation.enabled) return;

    this.coin = this.wheel.prizes[index];
    this.wheel.speedRotateRingToPrize(index);
  }

  async build() {
    await this.wheel.setWheelAsset(this.asset);
  
    this.prizeWindow = new PrizeWindow(this.wheel.canvas, this.wheel.wheelAssetImage, FRAMES);
  
    this.prizeWindow.modifySizes = this.wheel.modifySizes;
  
    this.wheel.on('update', (newWheel) => {
      this.prizeWindow.canvas = this.newWheel.canvas;
      this.prizeWindow.modifySizes = this.newWheel.modifySizes;
      this.prizeWindow.asset = this.newWheel.wheelAssetImage;
    });
  
    this.wheel.drawFunction = (wheel) => {
      this.prizeWindow.draw(this.wheel);
    };
    
    this.wheel.startAnimation();

    this.wheel.bannerSpins = this.spinsStorage.balance;

    if (this.spinsStorage.balance === 0) this.onWin(this);
  
    this.wheel.onStart = () => {
      this.spinsStorage.up();
      this.wheel.bannerSpins = this.spinsStorage.balance;
      this.onClickStart(this);
    };
  
    this.wheel.bracketAnimation.on('stop', reason => {
      if (reason !== 'end') return;
      if (this.coin.text === 'none') {
        this.wheel.resetSpinButton();
        this.onLose(this);
        return;
      }
      
      this.prizeWindow.show(`${this.coin.text} ${this.coin.name}`);
      this.onWin(this.random, this.coin, this);
    });
  }
}

var SPINWHEEL = {
  create: function(canvas, asset = 'assets/sprites.png', maxSpins = 3) {
    return new CompleteWheel(canvas, asset, maxSpins);
  }
}

window.SPINWHEEL = SPINWHEEL;