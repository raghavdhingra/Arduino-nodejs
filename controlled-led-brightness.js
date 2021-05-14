const five = require('johnny-five');
const board = new five.Board();

const lightKamKro = (led, brightness) => {
  if (brightness) {
    console.log(brightness);
    led.brightness(brightness);
    setTimeout(() => {
      lightKamKro(led, brightness - 1);
    }, 100);
  } else {
    led.brightness(brightness);
  }
};

board.on('ready', () => {
  const led5 = new five.Led(5);
  lightKamKro(led5, 100);
});
