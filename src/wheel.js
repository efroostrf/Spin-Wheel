import { CanvasColides } from "./CanvasColides";

class Wheel {
  /**
   * 
   * @param {String | Canvas} canvas HTML элемент с канвасом или ID канваса 
   */
  constructor(canvas, frames) {
    if (typeof canvas === 'string') this.canvas = document.getElementById(canvas);
    else this.canvas = canvas;

    this.canvas.width = 500;
    this.canvas.height = 500;
    this.prizes = {};
    this.frames = frames;
    this.wheelAssetImage = null;
    this.context = this.canvas.getContext('2d');
    this.colides = new CanvasColides(this.canvas);
    this.blinkIntervalMS = 500; // Скорость смены огней на колесе
    this._blinkInterval = null;
    this._blinkState = false;
    this._rotateAngle = 0;

    this._spinButtonAnimationInterval = null;
    this.spinButtonAnimation = 0;
    this.spinButtonAnimationMax = 60;
    this.spinButtonAnimationMS = 10;
    this.spinButtonAnimationFlag = false;
    this.spinButtonAnimationEnabled = true;
    // this.context.imageSmoothingEnabled = false;
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

  startAnimation() {
    window.requestAnimationFrame(() => {
      this.animate();
    });

    this._blinkInterval = setInterval(() => {
      this._blinkState = !this._blinkState;
    }, this.blinkIntervalMS);

    this._spinButtonAnimationInterval = setInterval(() => {
      if (!this.spinButtonAnimationEnabled) return;
      
      if (this.spinButtonAnimationFlag) {
        this.spinButtonAnimation -= 0.5;
        if (this.spinButtonAnimation <= 0) this.spinButtonAnimationFlag = !this.spinButtonAnimationFlag;
      } else {
        this.spinButtonAnimation += 0.5;
        if (this.spinButtonAnimation >= this.spinButtonAnimationMax) this.spinButtonAnimationFlag = !this.spinButtonAnimationFlag;
      }
    }, this.spinButtonAnimationMS);
  }

  rotateContext(degree) {
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate(degree * Math.PI/180);
  }

  drawFrame(frame, modifySize = 1, position = 'center', flipX = false) {
    var x = frame.frame.x;
    var y = frame.frame.y;
    var width = frame.frame.w;
    var height = frame.frame.h;
    var dX;
    var dY;
    // position = center / { x: *, y: * }

    if (position.x) dX = position.x;
    if (position.y) dY = position.y;
    if (position.centrize) this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 

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

      this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
      this.context.rotate(this._rotateAngle * Math.PI/180);
      this.context.rotate(180 * Math.PI/180);
      this.context.rotate(((prizesDegreeInterval * (i - 1))) * Math.PI/180);

      // console.log(prize);
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

    modifySizes += this.spinButtonAnimation / 800;

    this.drawFrame(button, modifySizes, { 
      x: -(button.frame.w * modifySizes) / 2,
      centrize: true
    });

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
    this.context.rotate((this.spinButtonAnimation / 6) * Math.PI/180);

    this.drawFrame(buttonText, modifySizes - 0.05 + this.spinButtonAnimation / 400, { 
      x: -(buttonText.frame.w * (modifySizes - 0.05 + this.spinButtonAnimation / 400)) / 2
    });
  }

  drawRingLights(modifySizes = 1, ring) {
    var light = this.frames['light.png'];
    var lightCount = 16;
    var lightDegreeInterval = (360 / lightCount);
    var lastLightFlag = this._blinkState;

    for (let i = 0; i < lightCount; i++) {
      if (!lastLightFlag) {
        lastLightFlag = !lastLightFlag;
        continue;
      }

      this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
      this.context.rotate(this._rotateAngle * Math.PI/180);
      this.context.rotate(((lightDegreeInterval * i) + lightDegreeInterval / 2) * Math.PI/180);

      this.drawFrame(light, modifySizes, {
        x: -(ring.frame.w + 15) * modifySizes
      });

      lastLightFlag = !lastLightFlag;
    }
  }

  drawRing(modifySizes = 1) {
    var ring = this.frames['ring.png'];
    var bracket = this.frames['bracket.png'];

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
    this.context.rotate(this._rotateAngle * Math.PI/180);

    this.drawFrame(ring, modifySizes);

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
    this.context.rotate(this._rotateAngle * Math.PI/180);
    this.context.rotate(180 * Math.PI/180);

    this.drawFrame(ring, modifySizes);
 
    this.drawRingLights(modifySizes, ring);
    this.drawRingPrizes(modifySizes, ring);
  
    this.drawFrame(bracket, modifySizes, {
      x: -20 * modifySizes,
      centrize: true
    });

    this.drawSpinButton(modifySizes, ring);
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var modifySizes = 0.5;

    this.drawRing(modifySizes);
    

    window.requestAnimationFrame(() => {
      this.animate();
    });
  }
}

export {
  Wheel
}