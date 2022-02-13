import { EventEmitter } from "eventemitter3";
import TWEEN from "tween.js";
import { Animation } from "./Animation";

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

class PrizeWindow extends EventEmitter {
  constructor(canvas, asset, frames) {
    super();
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.asset = asset;
    this.frames = frames;
    this.modifySizes = 1;
    this.sunflowerAnimation = new Animation(0, 360, 0.5, false, false);
    this.inAnimationData = { 
      opacity: 0,
      scale: 0
    };
    this.inAnimation = null;
    this.enabled = false;
    this.prizeText = '';
  }

  show(prizeText) {
    this.enabled = true;
    this.prizeText = prizeText;
    this.sunflowerAnimation.start(10);

    this.inAnimationData = { 
      opacity: 0,
      scale: 0
    };
    this.inAnimation = new TWEEN.Tween(this.inAnimationData).to({ opacity: 0.6, scale: 1 }, 1000).easing(TWEEN.Easing.Elastic.Out);
    this.inAnimation.start();
  }

  hide() {
    this.enabled = false;
    this.inAnimationData = { 
      opacity: 0,
      scale: 0
    };
  }
 
  drawFrame(frame, modifySize = 1, position = {}, flipX = false) {
    var x = frame.frame.x;
    var y = frame.frame.y;
    var width = frame.frame.w;
    var height = frame.frame.h;
    var dX;
    var dY;

    if (position.width) width = position.width;
    if (position.height) height = position.height;
    if (position.x) dX = position.x;
    if (position.y) dY = position.y;
    if (position.centrize) {
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
      this.context.scale(this.inAnimationData.scale, this.inAnimationData.scale);
    }

    if (!dX) dX = -(width * modifySize);
    if (!dY) dY = -(height * modifySize) / 2;

    if (flipX) {
      this.context.translate(width, 0); 
      this.context.scale(-1, 1);
    }

    this.context.drawImage(this.asset, x, y, 
      width, height,
      dX, dY, 
      width * modifySize, height * modifySize);
    
    this.context.setTransform(1,0,0,1,0,0);
  }

  drawSunflower(height) {
    var sunflower = this.frames['sunflower.png'];
    var modifySizes = this.modifySizes + 0.25;
    
    var setSunflowerOrigin = (rotate = 0) => {
      this.context.translate(this.canvas.width / 2, (this.canvas.height - ((height + 70) * this.modifySizes)) / 2);
      this.context.scale(this.inAnimationData.scale, this.inAnimationData.scale);
      this.context.rotate(rotate * Math.PI/180);
      this.context.rotate(this.sunflowerAnimation.currentStep * Math.PI/180)
    }

    setSunflowerOrigin();

    this.drawFrame(sunflower, modifySizes, {
      x: -(sunflower.frame.w) * modifySizes,
      y: -(sunflower.frame.w) * modifySizes
    });

    setSunflowerOrigin(90);

    this.drawFrame(sunflower, modifySizes, {
      x: -(sunflower.frame.w) * modifySizes,
      y: -(sunflower.frame.w) * modifySizes
    });

    setSunflowerOrigin(180);

    this.drawFrame(sunflower, modifySizes, {
      x: -(sunflower.frame.w) * modifySizes,
      y: -(sunflower.frame.h) * modifySizes
    });

    setSunflowerOrigin(270);

    this.drawFrame(sunflower, modifySizes, {
      x: -(sunflower.frame.h) * modifySizes,
      y: -(sunflower.frame.w) * modifySizes
    });
  }

  draw(wheel) {
    if (!this.enabled) return;

    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.globalAlpha = this.inAnimationData.opacity;
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fill();

    var width = 700 * this.modifySizes;
    var height = 450 * this.modifySizes;
    var padding = {
      top: 50 * this.modifySizes
    };

    
    
    var gradient = this.context.createLinearGradient(0, 0, 0, height - padding.top);
    gradient.addColorStop(0, '#a21648');
    gradient.addColorStop(1, '#2d2842');

    this.drawSunflower(height);

    
    this.context.beginPath();
    this.context.fillStyle = gradient;
    this.context.globalAlpha = 1;
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.scale(this.inAnimationData.scale, this.inAnimationData.scale);
    this.context.roundRect(-(width / 2), -(height / 2) + padding.top, width, height, 25 * this.modifySizes);
    this.context.fill();
    this.context.setTransform(1,0,0,1,0,0);

    var gold = this.frames['more_gold.png'];

    this.drawFrame(gold, this.modifySizes, {
      x: -(gold.frame.w / 2) * this.modifySizes,
      y: -(gold.frame.h - 40) * this.modifySizes - (height / 2),
      centrize: true
    });

    this.drawText('BONUS ZOOM', 64, '#ffcd20', 'MontserratBold', {
      y: -(54) * this.modifySizes,
      centrize: true,
      shadow: true
    });

    this.drawText('Wheel Bonus', 24, '#ffcd20', 'MontserratBold', {
      y: -(1) * this.modifySizes,
      centrize: true,
      shadow: true
    });

    this.drawText(this.prizeText, 48, '#609114', 'MontserratBold', {
      y: 60 * this.modifySizes,
      centrize: true,
      shadow: true
    });

    var collectButton = this.frames['button.png'];
    var collectButtonY = -(collectButton.frame.h - 230) * this.modifySizes;

    this.drawFrame(collectButton, this.modifySizes, {
      x: -(collectButton.frame.w / 2) * this.modifySizes,
      y: collectButtonY,
      centrize: true
    });

    if (!wheel.colides.findObject('collectButton')) {
      wheel.colides.addObject('collectButton', 
                            this.canvas.width / 2 + (-(collectButton.frame.w * this.modifySizes) / 2),
                            this.canvas.height / 2 + collectButtonY,
                            collectButton.frame.w * this.modifySizes,
                            collectButton.frame.h * this.modifySizes);
      
      wheel.colides.on('colide', object => {
        if (object.name === 'collectButton') {
          if (!this.enabled) return;
          this.canvas.style.cursor = 'pointer';
        }
      })

      wheel.colides.on('click', objects => {
        if (objects.indexOf('collectButton') != -1) {
          if (!this.enabled) return;
          this.hide();
          wheel.resetSpinButton();
        }
      })
    }

    this.drawText('Collect now', 36, 'white', 'MontserratBold', {
      y: collectButtonY + ((collectButton.frame.h + 20) * this.modifySizes) / 2,
      centrize: true
    });
  }

  drawText(text, size, color, font, options) {
    if (options.centrize) {
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.context.scale(this.inAnimationData.scale, this.inAnimationData.scale);
    }

    size = size * this.modifySizes;

    this.context.fillStyle = color;
    this.context.font = size + 'px ' + font;

    var measure = this.context.measureText(text);

    var x = -(measure.width / 2);
    var y = -(size * 2);

    if (options.x) x = options.x;
    if (options.y) y = options.y;
    if (options.shadow) {
      this.context.shadowColor = "rgba(0,0,0,0.3)";
      this.context.shadowOffsetX = 5 * this.modifySizes;
      this.context.shadowOffsetY = 5 * this.modifySizes;
      this.context.shadowBlur = 14 * this.modifySizes;
    }

    this.context.beginPath();
    this.context.fillText(text, x, y);
    this.context.setTransform(1,0,0,1,0,0);

    if (options.shadow) {
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowBlur = 0;
    }
  }
}

export {
  PrizeWindow
}