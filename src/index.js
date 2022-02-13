import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Wheel } from "./wheel";
import { FRAMES } from "./frames";
import { loadImageFromSrc } from './loadImageFromSrc';
import { PrizeWindow } from './PrizeWindow';

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
      text: '0.0020'
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

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  var wheel = new Wheel('SpinWheelCanvas', FRAMES, 475);

  await wheel.setWheelAsset('assets/sprites.png');

  wheel.prizes = prizes;

  var prizeWindow = new PrizeWindow(wheel.canvas, wheel.wheelAssetImage, FRAMES);

  prizeWindow.modifySizes = wheel.modifySizes;

  wheel.on('update', (newWheel) => {
    prizeWindow.canvas = newWheel.canvas;
    prizeWindow.modifySizes = newWheel.modifySizes;
    prizeWindow.asset = newWheel.wheelAssetImage;
  });

  wheel.drawFunction = () => {
    prizeWindow.draw();
  };
  
  wheel.startAnimation();
  
  wheel.onStart = () => {
    var random = getRndInteger(1, 16);

    if (wheel.spinAnimation.enabled) return;

    var coin = wheel.prizes[random];
    if (!coin) {
      coin = {
        name: false,
        text: false
      };
    }

    console.log(`random selected: ${random}, it's ${coin.name}:${coin.text}`);
    wheel.speedRotateRingToPrize(random);
    wheel.bracketAnimation.on('stop', reason => {
      if (reason !== 'end') return;
      console.log('end');
      prizeWindow.show(`${coin.text} ${coin.name}`);
    });
  };
  console.log(wheel);
})();

