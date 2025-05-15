const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const {join} = require('node:path');

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static(join(__dirname, 'webclient')));

io.on('connection', socket => {
  console.log('✅ Un utilisateur connecté');

  socket.on('drawing', data => {
    console.log('🎨 Données de dessin reçues du client :', data);
    socket.broadcast.emit('drawing', data);
  });

  socket.on('resetPath', () => {
    console.log('🔄 Réinitialisation du chemin');
    socket.broadcast.emit('resetPath');
  });

  socket.on('disconnect', () => {
    console.log('⛔️ Utilisateur déconnecté');
  });
});

io.on('resetPath', () => {
  socket.broadcast.emit('resetPath');
});

// Démarre le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur en ligne : http://localhost:${PORT}`);
});
