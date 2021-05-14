'use strict';
const { Servo } = require('johnny-five');
const keypress = require('keypress');
const { EtherPortClient } = require('etherport-client');
const five = require('johnny-five');
keypress(process.stdin);

const board = new five.Board({
  port: new EtherPortClient({
    host: '192.168.1.18',

    port: 3030,
  }),
  repl: false,
});

board.on('ready', () => {
  console.log(
    'Use Up and Down arrows for CW and CCW respectively. Space to stop.'
  );

  const servo = new Servo({ pin: 14 });

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  let pos = 0,
    add = 50;
  process.stdin.on('keypress', (ch, key) => {
    if (!key) {
      return;
    }

    if (key.name === 'q') {
      console.log('Quitting');
      process.exit();
    } else if (key.name === 'up') {
      if (pos <= 180) pos = pos + add;
      console.log(pos);
      servo.to(pos);
    } else if (key.name === 'down') {
      if (pos >= 0) pos = pos - add;
      console.log(pos);
      servo.to(pos);
    } else if (key.name === 'space') {
      console.log('Stopping');
      servo.stop();
    }
  });
});
