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

    this.frames = frames;
    this.wheelAssetImage = null;
    this.context = this.canvas.getContext('2d');
    this.blinkState = 0;
    this.blinkInterval = 1000; // Скорость смены огней на колесе
    this.blinkStateMax = 1;
    this._blinkState = 0;
    this._rotateAngle = 1;
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
  }

  rotateContext(degree) {
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate(degree * Math.PI/180);
  }

  drawFrame(frame, modifySize = 1, flipX = false) {
    var x = frame.frame.x;
    var y = frame.frame.y;
    var width = frame.frame.w;
    var height = frame.frame.h;

    if (flipX) {
      // this.context.translate(width , 0); 
      // this.context.scale(-1, 1);
    }

    // this.context.translate(width + x, (height + y) / 2);
    

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2); 
    // this.context.drawImage(this.wheelAssetImage, x, y, 
    //   width, height,
    //   0, 0, 
    //   width * modifySize, height * modifySize);
    this.context.rotate(this._rotateAngle * Math.PI/180);
    if (flipX) this.context.rotate(180 * Math.PI/180);

    this.context.drawImage(this.wheelAssetImage, x, y, 
      width, height,
      -(width * modifySize) + 1, -(height * modifySize) / 2, 
      width * modifySize, height * modifySize);
    
    
    
    this.context.setTransform(1,0,0,1,0,0);
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var ring = this.frames['ring.png'];
    var modifySizes = 0.5;

    this.drawFrame(ring, modifySizes, false);
    this.drawFrame(ring, modifySizes, true);
    

    window.requestAnimationFrame(() => {
      this.animate();
    });
  }
}

export {
  Wheel
}