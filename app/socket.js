let socketsByTeamId = {};

setInterval(() => {
  for (const teamId in socketsByTeamId) {
    for (const socket of socketsByTeamId[teamId]) {
      if (!socket.isAlive) {
        console.log('A socket has timed out; terminating it...');
        socket.terminate();
      } else {
        socket.isAlive = false;
        socket.ping(function() {});
      }
    }
  }
}, 5000);

module.exports = {
  register: (socket, teamId) => {
    if (socketsByTeamId[teamId] === undefined) {
      socketsByTeamId[teamId] = [];
    }
    socket.isAlive = true;
    socket.on('pong', () => { socket.isAlive = true; });
    socketsByTeamId[teamId].push(socket);
    console.log(`Registered socket endpoint for team ${teamId}`);
  },
  unregister: (socket, teamId) => {
    const index = socketsByTeamId[teamId] !== undefined ? socketsByTeamId[teamId].indexOf(socket) : -1;
    if (index >= 0) {
      socketsByTeamId[teamId].splice(index, 1);
      console.log(`Unregistered socket endpoint for team ${teamId}`);
    }
  },
  emit: (data, teamId) => {
    if (socketsByTeamId[teamId]) {
      for (const socket of socketsByTeamId[teamId]) {
        socket.send(data);
      }
    }
  },
};
