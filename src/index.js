import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Wheel } from "./wheel";
import { FRAMES } from "./frames";
import { PrizeWindow } from './PrizeWindow';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

class CompleteWheel {
  constructor(canvas, asset) {
    this.prizes = {};
    this.wheel = new Wheel(canvas, FRAMES, 475);
    this.onWin = function() {};
    this.asset = asset;
    this.coin = {};
    this.random = null;
  }

  setPrizes(prizes) {
    this.prizes = prizes;
    this.wheel.prizes = prizes;
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
  
    this.wheel.onStart = () => {
      this.random = getRndInteger(1, 16);
  
      if (this.wheel.spinAnimation.enabled) return;
  
      this.coin = this.wheel.prizes[this.random];
  
      if (!this.coin) {
        this.coin = {
          name: false,
          text: 'none'
        };
      }
  
      this.wheel.speedRotateRingToPrize(this.random);
    };
  
    this.wheel.bracketAnimation.on('stop', reason => {
      if (reason !== 'end') return;
      if (this.coin.text === 'none') return this.wheel.resetSpinButton();
      
      this.prizeWindow.show(`${this.coin.text} ${this.coin.name}`);
      this.onWin(this.random, this.coin, this);
    });
  }
}

var SPINWHEEL = {
  create: function(canvas, asset = 'assets/sprites.png') {
    return new CompleteWheel(canvas, asset);
  }
}

window.SPINWHEEL = SPINWHEEL;