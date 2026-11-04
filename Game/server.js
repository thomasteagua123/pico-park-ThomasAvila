const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const os = os = require("os");
const client = require("prom-client");

// --- CONFIGURACIÓN DE PROMETHEUS ---
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'picopark_' });

// Métrica personalizada para los jugadores conectados (Gauge para valores que suben y bajan)
const activePlayersGauge = new client.Gauge({
  name: 'picopark_active_players',
  help: 'Numero actual de gamepads/jugadores conectados al servidor'
});

// Métrica personalizada para conexiones totales aceptadas (Counter para valores que solo incrementan)
const totalConnectionsCounter = new client.Counter({
  name: 'picopark_total_connections_count',
  help: 'Total historico de conexiones de gamepads aceptadas'
});
// ------------------------------------

app.use(express.static("public"));

const PUERTO = process.env.PUERTO || 3000;
const gamepadsConectados = new Set();
const coloresParaJugadores = ["0xff4444", "0x44ff44", "0x4488ff", "0xffff44"];

function obtenerIPLocal() {
  if (process.env.IP_PUBLICA) return process.env.IP_PUBLICA;
  const interfaces = os.networkInterfaces();
  let mejorIP = null;

  for (let nombre in interfaces) {
    if (
      nombre.toLowerCase().includes("virtual") ||
      nombre.toLowerCase().includes("vmware") ||
      nombre.toLowerCase().includes("hyper-v") ||
      nombre.toLowerCase().includes("wsl") ||
      nombre.toLowerCase().includes("vethernet") ||
      nombre.toLowerCase().includes("loopback")
    ) {
      continue;
    }

    for (let net of interfaces[nombre]) {
      if (net.family !== "IPv4" || net.internal) continue;
      const ip = net.address;

      if (ip.startsWith("192.168.56.")) continue;

      if (
        ip.startsWith("192.168.") ||
        ip.startsWith("10.") ||
        (ip.startsWith("172.") &&
          parseInt(ip.split(".")[1]) >= 16 &&
          parseInt(ip.split(".")[1]) <= 31)
      ) {
        return ip;
      }

      if (!mejorIP) mejorIP = ip;
    }
  }

  return mejorIP || "localhost";
}

const ip = obtenerIPLocal();

app.get("/ip", (req, res) => {
  res.json({ ip });
});

// --- ENDPOINT DE MÉTRICAS PARA PROMETHEUS ---
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});
// -------------------------------------------

io.on("connection", (socket) => {
  const tipo = socket.handshake.query.tipo;
  const esPantalla = tipo === "pantalla";
  const esGamepad = tipo === "gamepad";

  if (esPantalla) {
    console.log("Videojuego conectado");
    console.log("Reinicio de juego");
    io.emit("servidorReiniciado");
  } else if (esGamepad) {
    if (gamepadsConectados.size >= 4) {
      console.log("Conexion rechazada: sala llena (Máximo de 4 jugadores)");
      socket.disconnect(true);
      return;
    }
    gamepadsConectados.add(socket.id);
    
    // Actualizamos la métrica en Prometheus
    activePlayersGauge.set(gamepadsConectados.size);
    totalConnectionsCounter.inc();

    const indice = gamepadsConectados.size - 1;
    console.log(`Gamepad conectado - jugadores: ${gamepadsConectados.size}`);
    io.emit("nuevoJugador", {
      idDelSocket: socket.id,
      color: coloresParaJugadores[indice],
    });
  } else {
    console.log("Conexion ignorada (tipo desconocido)");
  }
  socket.on("pedirJugadoresConectados", () => {
    let indice = 0;
    gamepadsConectados.forEach((id) => {
      socket.emit("nuevoJugador", {
        idDelSocket: id,
        color: coloresParaJugadores[indice],
      });
      indice++;
    });
  });
  socket.on("message", (msg) => {
    io.emit("inputDeJugador", {
      idDelSocket: socket.id,
      tipoDeEvento: msg.tipo,
      teclaPresionada: msg.tecla,
    });
  });

  socket.on("error", (err) => {
    console.log(`error de conexion: ${err.message}`);
  });

  socket.on("disconnect", () => {
    if (esPantalla) {
      console.log("Videojuego desconectado");
    } else if (esGamepad) {
      gamepadsConectados.delete(socket.id);
      
      // Actualizamos la métrica cuando un jugador se va
      activePlayersGauge.set(gamepadsConectados.size);

      console.log(
        `Gamepad desconectado - jugadores: ${gamepadsConectados.size}`,
      );
      io.emit("jugadorDesconectado", socket.id);
    }
  });
});

http.listen(PUERTO, "0.0.0.0", () => {
  console.log(`videojuego funcionando en ${ip}:${PUERTO}`);
  console.log(`conectar gamepads a ${ip}:${PUERTO}`);
});

function cerrarServidor() {
  console.log("Apagando servidor...");

  io.emit("servidorApagado");

  io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true);
  });

  http.close(() => {
    console.log("Servidor cerrado correctamente");
    process.exit(0);
  });

  setTimeout(() => {
    console.log("Forzando cierre del servidor");
    process.exit(1);
  }, 3000);
}

process.on("SIGINT", cerrarServidor);
process.on("SIGTERM", cerrarServidor);