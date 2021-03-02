import openSocket from 'socket.io-client';
const  socket = openSocket('https://timers-comp-heater.herokuapp.com');
function subscribeToTimer(cb) {
    console.log("ORWA");
  socket.on('data', data => cb(null, data));
  socket.emit('data', "I'm subscribed");
}
export { subscribeToTimer };