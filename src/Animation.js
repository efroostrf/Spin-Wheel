class Animation {
  constructor(start = 0, max = 10, step = 1, startFlag = false, yoyo = false) {
    this.enabled = false;
    this.flag = startFlag;
    this.currentStep = start;
    this.maxStep = max;
    this.step = step;
    this.stopReason = null;
    this.intervalMs = 0;
    this.repeated = 0;
    this.repeatAnimation = 0;
    this.yoyo = yoyo;
    this.startTimestamp = null;
    this._interval = null;
  }

  setStep(step) {
    this.currentStep = step;
  }

  start(intervalMs = 0, repeatAnimation = 0) {
    if (intervalMs === 0 && this.intervalMs) intervalMs = this.intervalMs;
    else if (intervalMs === 0) intervalMs = 100;

    if (!this.intervalMS) this.intervalMs = intervalMs;

    this.repeated = 0;
    this.repeatAnimation = repeatAnimation;
    this.enabled = true;
    this.startTimestamp = Date.now();

    this._interval = setInterval(() => {
      this.loop();
    }, intervalMs);
  }

  stop(reason) {
    if (reason) this.stopReason = reason;
    this.enabled = false;
    clearInterval(this._interval);
  }

  loop() {
    if (!this.enabled) return;

    if (this.flag) this.currentStep -= this.step;
    else this.currentStep += this.step;

    if (this.yoyo) {
      if ((this.flag && this.currentStep <= 0)
          || (!this.flag && this.currentStep >= this.maxStep))
      {
        if (this.repeatAnimation > 0) this.repeated += 0.5;
        this.flag = !this.flag;
      }
    } else {
      if (this.flag && this.currentStep <= 0) this.currentStep = this.maxStep;
      if (!this.flag && this.currentStep >= this.maxStep) this.currentStep = 0;

      if (this.repeatAnimation > 0) this.repeated += 1;
    }

    if (this.repeated >= this.repeatAnimation
        && this.repeatAnimation !== 0) this.stop('end');
  }
}

export {
  Animation
}