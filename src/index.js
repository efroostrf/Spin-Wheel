import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Wheel } from "./wheel";
import { FRAMES } from "./frames";

(async function() {
  var wheel = new Wheel('SpinWheelCanvas', FRAMES);

  await wheel.setWheelAsset('assets/sprites.png');
  wheel.startAnimation();
  setInterval(() => {
    wheel._rotateAngle += 1;
  }, 5);

  console.log(wheel);
})();

