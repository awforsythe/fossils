let socketsByTeamId = {};

module.exports = {
  register: (socket, teamId) => {
    if (socketsByTeamId[teamId] === undefined) {
      socketsByTeamId[teamId] = [];
    }
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
