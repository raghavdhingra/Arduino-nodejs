const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const led5 = new five.Led(5);
  led5.blink(1000);
});
