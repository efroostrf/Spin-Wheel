import { CanvasColides } from "./CanvasColides";
import { Animation } from "./Animation";
import TWEEN from "tween.js";
import { EventEmitter } from "eventemitter3";

class Wheel extends EventEmitter {
  /**
   * 
   * @param {String | Canvas} canvas HTML элемент с канвасом или ID канваса 
   */
  constructor(canvas, frames, width = 500, height, shiftHeight = 0) {
    super();
    if (typeof canvas === 'string') this.canvas = document.getElementById(canvas);
    else this.canvas = canvas;

    this.canvas.width = width;
    if (!height) this.canvas.height = width;
    else this.canvas.height = height;

    this.shiftHeight = shiftHeight;

    this.prizes = {};
    this.frames = frames;
    this.wheelAssetImage = null;
    this.context = this.canvas.getContext('2d');
    this.colides = new CanvasColides(this.canvas);
    this._rotateAngle = 0;
    this.modifySizes = 1;
    this.lightAnimation = new Animation(0, 1, 1, false, true);
    this.spinButtonAnimation = new Animation(0, 60, 0.5, false, true);
    this.bracketAnimation = new Animation(0, 100, 4, false, true);
    this.spinAnimation = new Animation(0, 360, 3, false, false);
    this.spinButtonClick = false;
    this.bannerSpins = 0;

    this.onStart = function () {};
    this.drawFunction = function () {};
    this.setupModifySizes();
    // this.context.imageSmoothingEnabled = false;
  }

  get canvasHeightForRender() {
    return this.canvas.height - this.shiftHeight;
  }

  async setWheelAsset(imgUrl) {
    return new Promise(resolve => {
      var image = new Image();

      image.src = imgUrl;

      image.onerror = () => resolve(false);
      image.onload = () => {
        this.wheelAssetImage = image;
        resolve(true);
      };
    });
  }

  setupModifySizes() {
    this.modifySizes = this.canvas.width / (this.frames['ring.png'].frame.w * 2);
    this.modifySizes -= 0.15;

    this.emit('update', this);
  }

  resetSpinButton() {
    this.spinButtonAnimation.step = 0.5;
    this.spinButtonAnimation.start(10);
    this.spinButtonClick = true;
  }

  disableSpinButton() {
    this.spinButtonAnimation.stop('click');
    this.spinButtonAnimation.currentStep = 0;
    this.spinButtonClick = false;
  }

  startAnimation() {
    window.requestAnimationFrame(() => {
      this.animate();
    });

    this.lightAnimation.start(500);
    this.resetSpinButton();

    this.colides.on('colide', object => {
      if (object.name === 'spinButton') {
        if (!this.spinButtonAnimation.enabled) return;
        if (!this.spinButtonClick) return;
        if (this.spinButtonAnimation.enabled) this.spinButtonAnimation.stop('colide');
        
        this.canvas.style.cursor = 'pointer';
      }
    });

    this.colides.on('uncolide', object => {
      if (object.name === 'spinButton') {
        if (!this.drawSpinButton) return;
        if (this.spinButtonAnimation.stopReason !== 'click') this.spinButtonAnimation.start();
      }
      this.canvas.style.cursor = 'auto';
    });

    this.colides.on('click', objects => {
      if (objects.indexOf('spinButton') != -1) {
        if (!this.spinButtonClick) return;

        this.disableSpinButton();
        this.canvas.style.cursor = 'pointer';
        this.onStart(this);
      }
    });
  }

  drawFrame(frame, modifySize = 1, position = {}, flipX = false) {
    var x = frame.frame.x;
    var y = frame.frame.y;
    var width = frame.frame.w;
    var height = frame.frame.h;
    var dX;
    var dY;

    if (position.x) dX = position.x;
    if (position.y) dY = position.y;
    if (position.centrize) this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 

    if (!dX) dX = -(width * modifySize);
    if (!dY) dY = -(height * modifySize) / 2;

    if (flipX) {
      this.context.translate(width, 0); 
      this.context.scale(-1, 1);
    }

    this.context.drawImage(this.wheelAssetImage, x, y, 
      width, height,
      dX, dY, 
      width * modifySize, height * modifySize);
    
    this.context.setTransform(1,0,0,1,0,0);
  }

  drawRingPrizes(modifySizes = 1, ring) {
    var prizes = this.prizes;
    var prizesDegreeInterval = 360 / 16;

    for (let i = 0; i < 16; i++) {
      if (!prizes[i]) continue;

      var prize = prizes[i];

      this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 
      this.context.rotate(this._rotateAngle * Math.PI/180);
      this.context.rotate(180 * Math.PI/180);
      this.context.rotate(((prizesDegreeInterval * (i - 1))) * Math.PI/180);

      var iconSize = 40;
      var iconSizeModified = iconSize * modifySizes;
      var dX = (ring.frame.w - 90) * modifySizes;
      var dY = -(iconSize * modifySizes) / 2;

      this.context.beginPath();
      this.context.arc(dX + iconSizeModified / 2, dY + iconSizeModified / 2, iconSizeModified / 2 + 3 * modifySizes, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'white';
      this.context.fill();

      var textSize = 32 * modifySizes;
      var textX = 125 * modifySizes;
      var textY = (textSize / 2) - 2;

      this.context.beginPath();
      this.context.font = textSize + 'px MontserratBold';
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;
      this.context.strokeText(prize.text, textX, textY);
      this.context.fillText(prize.text, textX, textY);

      this.context.drawImage(prize.icon, 0, 0, 
        prize.icon.width, prize.icon.height,
        dX, dY, 
        iconSizeModified, iconSizeModified);

      this.context.setTransform(1,0,0,1,0,0);
    }
  }

  drawSpinButton(modifySizes = 1, ring) {
    var button = this.frames['spin_button.png'];
    var buttonText = this.frames['spin_text.png'];

    modifySizes += this.spinButtonAnimation.currentStep / 800;

    this.drawFrame(button, modifySizes, { 
      x: -(button.frame.w * modifySizes) / 2,
      centrize: true
    });

    if (!this.colides.findObject('spinButton')) {
      this.colides.addObject('spinButton', 
                            this.canvas.width / 2 + (-(button.frame.w * modifySizes) / 2),
                            this.canvasHeightForRender / 2 + (-(button.frame.h * modifySizes) / 2),
                            button.frame.w * modifySizes,
                            button.frame.h * modifySizes);
    }

    this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 
    this.context.rotate((this.spinButtonAnimation.currentStep / 6) * Math.PI/180);

    this.drawFrame(buttonText, modifySizes - 0.05 + this.spinButtonAnimation.currentStep / 400, { 
      x: -(buttonText.frame.w * (modifySizes - 0.05 + this.spinButtonAnimation.currentStep / 400)) / 2
    });
  }

  drawRingLights(modifySizes = 1, ring) {
    var light = this.frames['light.png'];
    var lightCount = 16;
    var lightDegreeInterval = (360 / lightCount);
    var lastLightFlag = Boolean(this.lightAnimation.currentStep);

    for (let i = 0; i < lightCount; i++) {
      if (!lastLightFlag) {
        lastLightFlag = !lastLightFlag;
        continue;
      }

      this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 
      this.context.rotate(this._rotateAngle * Math.PI/180);
      this.context.rotate(((lightDegreeInterval * i) + lightDegreeInterval / 2) * Math.PI/180);

      this.drawFrame(light, modifySizes, {
        x: -(ring.frame.w + 15) * modifySizes
      });

      lastLightFlag = !lastLightFlag;
    }
  }

  drawRingBracket(modifySizes = 1, ring) {
    var bracket = this.frames['bracket.png'];

    modifySizes += this.bracketAnimation.currentStep / 1000;

    this.drawFrame(bracket, modifySizes, {
      x: -(20 * (this.bracketAnimation.currentStep + 100) / 100) * modifySizes,
      centrize: true
    });
  }

  speedRotateRingToPrize(prizeNumber = 1) {
    var totalDegreesesToSpin = 360 * 4 + 180 +  (360 - (prizeNumber - 1) * (360 / 16));
    var rotate = {
      degress: 0
    };

    var tween = new TWEEN.Tween(rotate)
                         .to({ degress: totalDegreesesToSpin }, 4500)
                         .easing(TWEEN.Easing.Cubic.Out)
                         .onUpdate(() => {
                            this.spinAnimation.setStep(rotate.degress);
                          })
                          .onComplete(() => {
                            this.bracketAnimation.start(10, 1);
                          }).start();
  }

  drawRing(modifySizes = 1) {
    this._rotateAngle = this.spinAnimation.currentStep;
    var ring = this.frames['ring.png'];

    this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 
    this.context.rotate(this._rotateAngle * Math.PI/180);

    this.drawFrame(ring, modifySizes);

    this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2); 
    this.context.rotate(this._rotateAngle * Math.PI/180);
    this.context.rotate(180 * Math.PI/180);

    this.drawFrame(ring, modifySizes);
 
    this.drawRingLights(modifySizes, ring);
    this.drawRingPrizes(modifySizes, ring);
    this.drawRingBracket(modifySizes, ring);
    this.drawSpinButton(modifySizes, ring);
  }

  drawBanner(modifySize = 1) {
    var banner = this.frames['flag.png'];
    var ring = this.frames['ring.png'];
    var bannerY = (ring.frame.h / 2 - 125);

    this.drawFrame(banner, modifySize, {
      x: -(banner.frame.w / 2) * modifySize,
      y: bannerY * modifySize,
      centrize: true
    });

    this.drawText(`YOU HAVE ${this.bannerSpins} LUCKY SPINS`, 36, 'white', 'MontserratBold', {
      y: (bannerY + 270 * modifySize) * modifySize,
      centrize: true
    });

    this.drawText('TRY NOW', 28, 'white', 'MontserratBold', {
      y: (bannerY + 330 * modifySize) * modifySize,
      centrize: true
    });
  }

  drawText(text, size, color, font, options) {
    if (options.centrize) {
      this.context.translate(this.canvas.width / 2, this.canvasHeightForRender / 2);
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

  animate(time) {
    TWEEN.update(time);

    if (this.bannerSpins <= 0
        && this.spinButtonClick)
    {
      this.disableSpinButton();
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvasHeightForRender);
    this.drawRing(this.modifySizes);
    this.drawBanner(this.modifySizes);
    this.drawFunction(this);

    window.requestAnimationFrame((time) => {
      this.animate(time);
    });
  }
}

export {
  Wheel
}