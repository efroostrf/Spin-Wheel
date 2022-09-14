async function loadImageFromSrc(src) {
  return new Promise(resolve => {
    var image = new Image();

    image.src = src;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => resolve(false);
  });
}

var wheel = SPINWHEEL.create('SpinWheelCanvas', 'assets/sprites.png', 999);
var backgroundCanvas = document.getElementById('PageBackground');
const jsConfetti = new JSConfetti({ backgroundCanvas });

(async function() {
  var coinIcons = {
    BCL: await loadImageFromSrc('assets/BCL.png'),
    BNB: await loadImageFromSrc('assets/BNB.png'),
    BTC: await loadImageFromSrc('assets/BTC.png'),
    DOT: await loadImageFromSrc('assets/DOT.png'),
    ENJ: await loadImageFromSrc('assets/ENJ.png'),
    ETH: await loadImageFromSrc('assets/ETH.png'),
    LINK: await loadImageFromSrc('assets/LINK.png'),
    MATIC: await loadImageFromSrc('assets/MATIC.png'),
    SHIB: await loadImageFromSrc('assets/SHIB.png'),
    XLM: await loadImageFromSrc('assets/XLM.png'),
    XRP: await loadImageFromSrc('assets/XRP.png'),
    DOGE: await loadImageFromSrc('assets/DOGE.png'),
    TRX: await loadImageFromSrc('assets/TRX.png'),
    TUSD: await loadImageFromSrc('assets/TUSD.png')
  };
  
  var prizes = {
    1: {
      name: 'TRX',
      icon: coinIcons.TRX,
      text: '50.000'
    },
    3: {
      name: 'BTC',
      icon: coinIcons.BTC,
      text: '0.2900'
    },
    5: {
      name: 'TUSD',
      icon: coinIcons.TUSD,
      text: '25.000'
    },
    7: {
      name: 'ETH',
      icon: coinIcons.ETH,
      text: '0.1500'
    },
    9: {
      name: 'BTC',
      icon: coinIcons.BTC,
      text: '1.0000'
    },
    11: {
      name: 'SHIB',
      icon: coinIcons.SHIB,
      text: '100.00'
    },
    13: {
      name: 'TRX',
      icon: coinIcons.TRX,
      text: '1.0000'
    },
    15: {
      name: 'DOGE',
      icon: coinIcons.DOGE,
      text: '50.000'
    }
  };

  wheel.onWin = () => {
    jsConfetti.addConfetti();
  };
  
  await wheel.build();

  wheel.setPrizes(prizes);

  wheel.onClickStart = () => {
    wheel.runRandom();
  };

})();