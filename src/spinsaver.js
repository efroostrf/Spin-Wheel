class SpinSaver {
  constructor(maxSpins = 3) {
    this.maxSpins = maxSpins;
    this.spins = 0;
    this.localStorageName = 'AOaKJ0a9du0A8DY9adhopihf8';

    this.loadFromLocalStorage();
  }

  get isLimit() {
    if (this.maxSpins === 0) return true; // Бесконечные крукиииии
    if (this.spins >= this.maxSpins) return true;
    else return false;
  }

  get balance() {
    var balance = this.maxSpins - this.spins;

    if (balance < 0) return 0;
    else return balance;
  }

  up() {
    this.spins++;
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    var data = JSON.parse(localStorage.getItem(this.localStorageName));
    if (!data
        || !data.spins)
    {
      return;
    }

    if (data.spins) this.spins = data.spins;
  }

  saveToLocalStorage() {
    var dataToSave = {
      spins: this.spins
    };

    localStorage.setItem(this.localStorageName, JSON.stringify(dataToSave));
  }
}

export {
  SpinSaver
}