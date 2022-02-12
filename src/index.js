import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Wheel } from "./wheel";
import { FRAMES } from "./frames";
import { loadImageFromSrc } from './loadImageFromSrc';

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
      icon: coinIcons.TRX,
      text: '50.000'
    },
    3: {
      icon: coinIcons.BTC,
      text: '0.0020'
    },
    5: {
      icon: coinIcons.TUSD,
      text: '25.000'
    },
    7: {
      icon: coinIcons.ETH,
      text: '0.1500'
    },
    9: {
      icon: coinIcons.BTC,
      text: '1.0000'
    },
    11: {
      icon: coinIcons.SHIB,
      text: '100.00'
    },
    13: {
      icon: coinIcons.TRX,
      text: '1.0000'
    },
    15: {
      icon: coinIcons.DOGE,
      text: '50.000'
    }
  };

  var wheel = new Wheel('SpinWheelCanvas', FRAMES);
  wheel.prizes = prizes;
  await wheel.setWheelAsset('assets/sprites.png');
  
  wheel.startAnimation();
  // setInterval(() => {
  //   wheel._rotateAngle += 0.6;
  // }, 10);

  console.log(wheel);
})();

