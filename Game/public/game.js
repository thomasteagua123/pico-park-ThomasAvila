const CONFIG = {
  TAMANO_BLOQUE: 50,
  VELOCIDAD_JUGADOR: 235,
  ACELERACION_JUGADOR: 2500,
  SALTO_FUERZA: 500,
  GRAVEDAD: 1050,

  COLORES_JUGADORES: [
    0x47d7ff,
    0xff5c8a,
    0x9cff57,
    0xffc857,
  ],

  MAX_JUGADORES: 4,
  TIEMPO_VICTORIA: 2500,
  TOTAL_NIVELES: 2,

  JUGADORES_PESO_CAJA: 2,
  FILAS_CAIDA_CAJA: 5,
  VELOCIDAD_CAIDA_CAJA: 180,

  VELOCIDAD_SIERRA: 170,
  TIEMPO_RESPAWN: 800,
  TIEMPO_PLATAFORMA_FRAGIL: 1400,
};

const socket = io({
  query: {
    tipo: "pantalla",
  },
});

let contadorColores = 0;
let nivelActual = 1;


// ======================================================
// HELPERS DE MAPA
// ======================================================

function crearMapaBase() {
  return Array.from(
    { length: 12 },
    () => Array(60).fill(0)
  );
}

function piso(mapa, fila, desde, hasta) {
  for (let x = desde; x <= hasta; x++) {
    mapa[fila][x] = 1;
  }
}

function colocar(mapa, fila, columna, tipo) {
  if (
    fila >= 0 &&
    fila < mapa.length &&
    columna >= 0 &&
    columna < mapa[0].length
  ) {
    mapa[fila][columna] = tipo;
  }
}

function colocarVarios(mapa, fila, columnas, tipo) {
  columnas.forEach((columna) => {
    colocar(mapa, fila, columna, tipo);
  });
}


// ======================================================
// NIVEL 1
// ======================================================

const mapaNivel1 = (() => {
  const mapa = crearMapaBase();

  // Fondo
  [4, 12, 22, 33, 45, 54].forEach((x, i) => {
    colocar(
      mapa,
      i % 2 === 0 ? 2 : 3,
      x,
      5
    );
  });

  // Agua
  for (let x = 0; x < 60; x++) {
    mapa[11][x] = 2;
  }


  // ====================================================
  // INICIO - IZQUIERDA
  // ====================================================

  piso(mapa, 10, 0, 6);

  // Primer botón
  colocar(mapa, 10, 5, 9);


  // ====================================================
  // PRIMER PUENTE
  // ====================================================

  colocarVarios(
    mapa,
    10,
    [7, 8, 9, 10],
    10
  );


  // ====================================================
  // SEGUNDO LADO
  // ====================================================

  piso(
    mapa,
    10,
    11,
    17
  );

  // Segundo botón
  colocar(
    mapa,
    10,
    12,
    17
  );


  // ====================================================
  // PINCHOS
  // ====================================================

  colocarVarios(
    mapa,
    9,
    [14, 15],
    14
  );


  // Plataforma superior
  piso(
    mapa,
    8,
    15,
    18
  );


  // Plataforma frágil
  colocarVarios(
    mapa,
    7,
    [19, 20, 21],
    16
  );


  // Piso
  piso(
    mapa,
    10,
    19,
    23
  );


  // ====================================================
  // SIERRAS
  // ====================================================

  colocar(
    mapa,
    8,
    24,
    15
  );

  piso(
    mapa,
    7,
    25,
    28
  );

  colocar(
    mapa,
    8,
    28,
    15
  );

  piso(
    mapa,
    10,
    25,
    30
  );


  // ====================================================
  // PLACAS DE PESO
  // ====================================================

  colocar(
    mapa,
    10,
    29,
    12
  );

  colocar(
    mapa,
    10,
    30,
    12
  );


  // ====================================================
  // CAJA
  // ====================================================

  colocar(
    mapa,
    5,
    33,
    13
  );

  piso(
    mapa,
    10,
    31,
    37
  );


  // ====================================================
  // TRAMPOLÍN
  // ====================================================

  colocar(
    mapa,
    10,
    38,
    11
  );

  piso(
    mapa,
    7,
    39,
    42
  );

  colocar(
    mapa,
    6,
    41,
    14
  );


  // ====================================================
  // ENERGÍA
  // ====================================================

  colocar(
    mapa,
    5,
    43,
    3
  );

  piso(
    mapa,
    8,
    43,
    46
  );


  // ====================================================
  // ZONA FINAL
  // ====================================================

  piso(
    mapa,
    10,
    43,
    48
  );

  colocar(
    mapa,
    8,
    47,
    16
  );

  colocar(
    mapa,
    7,
    49,
    16
  );

  colocar(
    mapa,
    8,
    51,
    16
  );

  colocar(
    mapa,
    7,
    53,
    15
  );

  piso(
    mapa,
    10,
    52,
    59
  );


  // Portal
  colocar(
    mapa,
    10,
    57,
    4
  );

  return mapa;
})();


// ======================================================
// NIVEL 2
// ======================================================

const mapaNivel2 = (() => {
  const mapa = crearMapaBase();

  // Fondo
  [3, 11, 19, 29, 40, 52].forEach((x, i) => {
    colocar(
      mapa,
      i % 2 === 0 ? 2 : 3,
      x,
      5
    );
  });


  // Agua
  for (let x = 0; x < 60; x++) {
    mapa[11][x] = 2;
  }


  // ====================================================
  // INICIO
  // ====================================================

  piso(
    mapa,
    10,
    0,
    5
  );

  colocar(
    mapa,
    10,
    4,
    9
  );


  // ====================================================
  // PUENTE COOPERATIVO
  // ====================================================

  colocarVarios(
    mapa,
    10,
    [6, 7, 8],
    10
  );

  piso(
    mapa,
    10,
    9,
    13
  );

  // Segundo botón
  colocar(
    mapa,
    10,
    10,
    17
  );


  // ====================================================
  // PINCHOS
  // ====================================================

  colocarVarios(
    mapa,
    9,
    [11, 12],
    14
  );


  // Plataforma alta
  piso(
    mapa,
    7,
    12,
    15
  );


  // ====================================================
  // PLATAFORMAS FRÁGILES
  // ====================================================

  colocarVarios(
    mapa,
    7,
    [16, 17, 18],
    16
  );

  colocarVarios(
    mapa,
    8,
    [19, 20],
    16
  );


  // ====================================================
  // SIERRA
  // ====================================================

  colocar(
    mapa,
    7,
    21,
    15
  );

  piso(
    mapa,
    10,
    18,
    23
  );


  // ====================================================
  // PLACAS
  // ====================================================

  colocar(
    mapa,
    10,
    21,
    12
  );

  colocar(
    mapa,
    10,
    22,
    12
  );


  // Caja
  colocar(
    mapa,
    4,
    26,
    13
  );


  piso(
    mapa,
    10,
    24,
    29
  );


  // ====================================================
  // TRAMPOLÍN
  // ====================================================

  colocar(
    mapa,
    10,
    30,
    11
  );

  piso(
    mapa,
    7,
    31,
    34
  );

  colocar(
    mapa,
    6,
    33,
    14
  );


  // ====================================================
  // SEGUNDA ALTURA
  // ====================================================

  piso(
    mapa,
    5,
    35,
    38
  );

  colocar(
    mapa,
    5,
    37,
    15
  );


  // ====================================================
  // ZONA DIFÍCIL
  // ====================================================

  colocarVarios(
    mapa,
    6,
    [40, 41],
    16
  );

  colocar(
    mapa,
    5,
    43,
    16
  );

  colocar(
    mapa,
    6,
    45,
    16
  );

  colocarVarios(
    mapa,
    9,
    [43, 44],
    14
  );


  // ====================================================
  // ENERGÍA
  // ====================================================

  piso(
    mapa,
    7,
    46,
    49
  );

  colocar(
    mapa,
    5,
    48,
    3
  );


  // ====================================================
  // FINAL
  // ====================================================

  colocar(
    mapa,
    6,
    50,
    15
  );

  piso(
    mapa,
    8,
    51,
    53
  );

  colocar(
    mapa,
    7,
    52,
    14
  );

  piso(
    mapa,
    10,
    50,
    59
  );

  colocarVarios(
    mapa,
    8,
    [54, 55],
    16
  );


  // Portal
  colocar(
    mapa,
    10,
    57,
    4
  );

  return mapa;
})();


// ======================================================
// MAPA ACTUAL
// ======================================================

function obtenerMapaActual() {
  if (nivelActual === 1) {
    return mapaNivel1;
  }

  if (nivelActual === 2) {
    return mapaNivel2;
  }

  nivelActual = 1;

  return mapaNivel1;
}


// ======================================================
// ESCENA
// ======================================================

class SceneGame extends Phaser.Scene {
  constructor() {
    super({
      key: "SceneGame",
    });

    this.resetEstado();
  }


  // ====================================================
  // RESET
  // ====================================================

  resetEstado() {
    this.jugadoresSprites = {};

    // Energía
    this.energia = null;

    this.energiaOriginalX = 0;
    this.energiaOriginalY = 0;

    this.equipoTieneEnergia = false;
    this.jugadorConEnergiaId = null;

    this.ultimoTraspasoEnergia = 0;

    this.esperandoSeparacionEnergia =
      false;


    // Puerta
    this.puerta = null;
    this.puertaAbierta = false;

    this.jugadoresAdentro =
      new Set();


    // Nivel
    this.nivelSuperado =
      false;


    // Grupos
    this.plataformas = null;
    this.agua = null;
    this.botones = null;
    this.puentes = null;
    this.trampolines = null;
    this.cajas = null;
    this.placasPeso = null;
    this.trampas = null;
    this.plataformasFragiles = null;

    this.grupoJugadores =
      null;


    // Estado cooperativo
    this.pesoActivado =
      false;

    this.puenteActivado =
      false;

    this.puenteAsegurado =
      false;


    this.reiniciando =
      false;


    this.txtVictoria =
      null;


    contadorColores = 0;
  }


  // ====================================================
  // TEXTURAS
  // ====================================================

  crearTextura(
    key,
    w,
    h
  ) {
    if (
      this.textures.exists(key)
    ) {
      return;
    }


    const canvas =
      this.textures.createCanvas(
        key,
        w,
        h
      );


    if (!canvas) {
      return;
    }


    const ctx =
      canvas.context;


    // ==================================================
    // PISO
    // ==================================================

    if (
      key === "ground"
    ) {
      ctx.fillStyle =
        "#202939";

      ctx.fillRect(
        0,
        0,
        w,
        h
      );


      ctx.fillStyle =
        "#34445C";

      ctx.fillRect(
        0,
        0,
        w,
        7
      );


      ctx.fillStyle =
        "#47D7FF";

      ctx.fillRect(
        0,
        7,
        w,
        4
      );


      ctx.fillStyle =
        "#151C29";

      ctx.fillRect(
        0,
        11,
        w,
        h - 11
      );


      ctx.strokeStyle =
        "rgba(255,255,255,0.07)";

      ctx.lineWidth = 1;


      for (
        let x = 5;
        x < w;
        x += 10
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x,
          14
        );

        ctx.lineTo(
          x,
          h
        );

        ctx.stroke();
      }
    }


    // ==================================================
    // AGUA
    // ==================================================

    else if (
      key === "water"
    ) {
      ctx.fillStyle =
        "#26184A";

      ctx.fillRect(
        0,
        0,
        w,
        h
      );


      ctx.fillStyle =
        "#8B4DFF";

      ctx.fillRect(
        0,
        0,
        w,
        8
      );


      ctx.fillStyle =
        "#D06BFF";

      ctx.fillRect(
        5,
        12,
        18,
        3
      );

      ctx.fillRect(
        28,
        25,
        14,
        3
      );

      ctx.fillRect(
        11,
        39,
        22,
        3
      );


      ctx.fillStyle =
        "#59FFB1";

      ctx.beginPath();

      ctx.arc(
        37,
        18,
        5,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }


    // ==================================================
    // PORTAL CERRADO
    // ==================================================

    else if (
      key === "door"
    ) {
      ctx.fillStyle =
        "#0C1220";

      ctx.fillRect(
        4,
        4,
        42,
        46
      );


      ctx.strokeStyle =
        "#47D7FF";

      ctx.lineWidth = 4;

      ctx.strokeRect(
        7,
        7,
        36,
        40
      );


      ctx.fillStyle =
        "#17243A";

      ctx.fillRect(
        14,
        14,
        22,
        26
      );


      ctx.fillStyle =
        "#FF5C8A";

      ctx.fillRect(
        18,
        10,
        14,
        5
      );
    }


    // ==================================================
    // PORTAL ABIERTO
    // ==================================================

    else if (
      key === "doorOpen"
    ) {
      ctx.fillStyle =
        "#0C1220";

      ctx.fillRect(
        4,
        4,
        42,
        46
      );


      ctx.strokeStyle =
        "#9CFF57";

      ctx.lineWidth = 4;

      ctx.strokeRect(
        7,
        7,
        36,
        40
      );


      const brillo =
        ctx.createLinearGradient(
          0,
          12,
          0,
          45
        );


      brillo.addColorStop(
        0,
        "rgba(71,215,255,0.95)"
      );


      brillo.addColorStop(
        0.5,
        "rgba(156,255,87,0.9)"
      );


      brillo.addColorStop(
        1,
        "rgba(71,215,255,0.12)"
      );


      ctx.fillStyle =
        brillo;

      ctx.fillRect(
        14,
        14,
        22,
        26
      );
    }


    // ==================================================
    // BOTÓN
    // ==================================================

    else if (
      key === "button"
    ) {
      // El botón ocupa 20px de altura
      // y queda apoyado sobre el piso.

      ctx.fillStyle =
        "#182231";

      ctx.fillRect(
        2,
        4,
        w - 4,
        h - 4
      );


      ctx.fillStyle =
        "#40516A";

      ctx.fillRect(
        5,
        6,
        w - 10,
        h - 8
      );


      ctx.fillStyle =
        "#FF5C8A";

      ctx.fillRect(
        13,
        8,
        w - 26,
        6
      );


      ctx.fillStyle =
        "#FFD166";

      ctx.fillRect(
        17,
        9,
        5,
        4
      );

      ctx.fillRect(
        w - 22,
        9,
        5,
        4
      );


      ctx.fillStyle =
        "#47D7FF";

      ctx.fillRect(
        7,
        h - 4,
        w - 14,
        2
      );
    }


    // ==================================================
    // PUENTE
    // ==================================================

    else if (
      key === "bridge"
    ) {
      ctx.fillStyle =
        "#384A62";

      ctx.fillRect(
        0,
        8,
        w,
        31
      );


      ctx.fillStyle =
        "#60738C";


      for (
        let x = 4;
        x < w;
        x += 12
      ) {
        ctx.fillRect(
          x,
          12,
          7,
          22
        );
      }


      ctx.fillStyle =
        "#47D7FF";

      ctx.fillRect(
        0,
        34,
        w,
        5
      );
    }


    // ==================================================
    // TRAMPOLÍN
    // ==================================================

    else if (
      key === "trampoline"
    ) {
      ctx.fillStyle =
        "#121925";

      ctx.fillRect(
        4,
        25,
        42,
        20
      );


      ctx.fillStyle =
        "#FF5C8A";

      ctx.fillRect(
        7,
        20,
        36,
        9
      );


      ctx.strokeStyle =
        "#FFD166";

      ctx.lineWidth = 2;

      ctx.strokeRect(
        7,
        20,
        36,
        9
      );


      ctx.strokeStyle =
        "#47D7FF";

      ctx.beginPath();

      ctx.moveTo(
        12,
        31
      );

      ctx.lineTo(
        16,
        42
      );

      ctx.lineTo(
        21,
        31
      );

      ctx.lineTo(
        26,
        42
      );

      ctx.lineTo(
        31,
        31
      );

      ctx.lineTo(
        36,
        42
      );

      ctx.stroke();
    }


    // ==================================================
    // PLACA
    // ==================================================

    else if (
      key === "weightplate"
    ) {
      ctx.fillStyle =
        "#253247";

      ctx.fillRect(
        4,
        28,
        42,
        18
      );


      ctx.fillStyle =
        "#5E738F";

      ctx.fillRect(
        8,
        24,
        34,
        9
      );


      ctx.fillStyle =
        "#9CFF57";

      ctx.fillRect(
        14,
        28,
        22,
        3
      );


      ctx.strokeStyle =
        "#47D7FF";

      ctx.lineWidth = 2;

      ctx.strokeRect(
        5,
        29,
        40,
        15
      );
    }


    // ==================================================
    // CAJA
    // ==================================================

    else if (
      key === "box"
    ) {
      ctx.fillStyle =
        "#586A80";

      ctx.fillRect(
        4,
        6,
        42,
        42
      );


      ctx.strokeStyle =
        "#111722";

      ctx.lineWidth = 3;

      ctx.strokeRect(
        4,
        6,
        42,
        42
      );


      ctx.strokeStyle =
        "#9CB0C7";

      ctx.lineWidth = 2;

      ctx.beginPath();

      ctx.moveTo(
        9,
        11
      );

      ctx.lineTo(
        41,
        43
      );

      ctx.moveTo(
        41,
        11
      );

      ctx.lineTo(
        9,
        43
      );

      ctx.stroke();


      ctx.fillStyle =
        "#FF5C8A";

      ctx.fillRect(
        20,
        21,
        10,
        9
      );
    }


    // ==================================================
    // PINCHOS
    // ==================================================

    else if (
      key === "spike"
    ) {
      ctx.fillStyle =
        "#FF5C8A";


      for (
        let i = 0;
        i < 4;
        i++
      ) {
        const x =
          i * 12 + 1;


        ctx.beginPath();

        ctx.moveTo(
          x,
          h - 5
        );

        ctx.lineTo(
          x + 6,
          8
        );

        ctx.lineTo(
          x + 12,
          h - 5
        );

        ctx.closePath();

        ctx.fill();
      }


      ctx.fillStyle =
        "#FFD166";

      ctx.fillRect(
        0,
        h - 6,
        w,
        6
      );
    }


    // ==================================================
    // SIERRA
    // ==================================================

    else if (
      key === "saw"
    ) {
      ctx.fillStyle =
        "#B7C6D9";

      ctx.beginPath();

      ctx.arc(
        w / 2,
        h / 2,
        14,
        0,
        Math.PI * 2
      );

      ctx.fill();


      ctx.strokeStyle =
        "#FF5C8A";

      ctx.lineWidth = 4;


      for (
        let i = 0;
        i < 8;
        i++
      ) {
        const ang =
          (Math.PI * 2 * i) /
          8;


        ctx.beginPath();

        ctx.moveTo(
          w / 2 +
            Math.cos(ang) *
              12,
          h / 2 +
            Math.sin(ang) *
              12
        );

        ctx.lineTo(
          w / 2 +
            Math.cos(ang) *
              23,
          h / 2 +
            Math.sin(ang) *
              23
        );

        ctx.stroke();
      }


      ctx.fillStyle =
        "#596B81";

      ctx.beginPath();

      ctx.arc(
        w / 2,
        h / 2,
        6,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }


    // ==================================================
    // FRÁGIL
    // ==================================================

    else if (
      key === "fragile"
    ) {
      ctx.fillStyle =
        "#3A4E68";

      ctx.fillRect(
        2,
        8,
        w - 4,
        34
      );


      ctx.strokeStyle =
        "#FFD166";

      ctx.lineWidth = 2;

      ctx.strokeRect(
        2,
        8,
        w - 4,
        34
      );


      ctx.strokeStyle =
        "#FF5C8A";

      ctx.beginPath();

      ctx.moveTo(
        7,
        15
      );

      ctx.lineTo(
        18,
        35
      );

      ctx.moveTo(
        18,
        15
      );

      ctx.lineTo(
        28,
        35
      );

      ctx.moveTo(
        30,
        15
      );

      ctx.lineTo(
        40,
        35
      );

      ctx.stroke();
    }


    // ==================================================
    // DECORACIÓN
    // ==================================================

    else if (
      key === "cloud"
    ) {
      ctx.fillStyle =
        "rgba(71,215,255,0.18)";


      ctx.beginPath();

      ctx.arc(
        25,
        24,
        14,
        0,
        Math.PI * 2
      );

      ctx.fill();


      ctx.fillStyle =
        "#47D7FF";

      ctx.fillRect(
        21,
        20,
        8,
        8
      );


      ctx.fillStyle =
        "rgba(156,255,87,0.65)";

      ctx.fillRect(
        12,
        14,
        4,
        4
      );

      ctx.fillRect(
        35,
        32,
        4,
        4
      );
    }


    // ==================================================
    // ENERGÍA
    // ==================================================

    else if (
      key === "energy"
    ) {
      ctx.fillStyle =
        "rgba(71,215,255,0.20)";

      ctx.beginPath();

      ctx.arc(
        15,
        15,
        12,
        0,
        Math.PI * 2
      );

      ctx.fill();


      ctx.fillStyle =
        "#47D7FF";

      ctx.beginPath();

      ctx.moveTo(
        17,
        2
      );

      ctx.lineTo(
        8,
        16
      );

      ctx.lineTo(
        14,
        16
      );

      ctx.lineTo(
        11,
        28
      );

      ctx.lineTo(
        22,
        12
      );

      ctx.lineTo(
        16,
        12
      );

      ctx.closePath();

      ctx.fill();


      ctx.fillStyle =
        "#9CFF57";

      ctx.fillRect(
        13,
        8,
        4,
        9
      );
    }


    else {
      ctx.fillStyle =
        "#202939";

      ctx.fillRect(
        0,
        0,
        w,
        h
      );
    }


    canvas.refresh();
  }


  // ====================================================
  // AVATAR
  // ====================================================

  crearTexturaJugador() {
    if (
      this.textures.exists(
        "player"
      )
    ) {
      return;
    }


    const canvas =
      this.textures.createCanvas(
        "player",
        40,
        40
      );


    const ctx =
      canvas.context;


    // Cabeza
    ctx.fillStyle =
      "#DDE7F5";

    ctx.fillRect(
      8,
      7,
      24,
      23
    );


    // Casco
    ctx.fillStyle =
      "#7D8EA8";

    ctx.fillRect(
      6,
      11,
      28,
      17
    );


    // Ojos
    ctx.fillStyle =
      "#47D7FF";

    ctx.fillRect(
      10,
      13,
      7,
      7
    );

    ctx.fillRect(
      23,
      13,
      7,
      7
    );


    // Pupilas
    ctx.fillStyle =
      "#111722";

    ctx.fillRect(
      12,
      15,
      3,
      3
    );

    ctx.fillRect(
      25,
      15,
      3,
      3
    );


    // Boca
    ctx.fillStyle =
      "#FF5C8A";

    ctx.fillRect(
      16,
      23,
      8,
      4
    );


    // Piernas
    ctx.fillStyle =
      "#DDE7F5";

    ctx.fillRect(
      10,
      30,
      8,
      7
    );

    ctx.fillRect(
      22,
      30,
      8,
      7
    );


    // Antenas
    ctx.fillStyle =
      "#47D7FF";

    ctx.fillRect(
      7,
      4,
      3,
      7
    );

    ctx.fillRect(
      30,
      4,
      3,
      7
    );


    // Luz superior
    ctx.fillStyle =
      "#9CFF57";

    ctx.fillRect(
      18,
      1,
      4,
      7
    );


    canvas.refresh();
  }


  // ====================================================
  // CREATE
  // ====================================================

  create() {
    this.resetEstado();


    this.cameras.main.setBackgroundColor(
      "#0B1020"
    );


    // Texturas
    this.crearTextura(
      "ground",
      50,
      50
    );

    this.crearTextura(
      "water",
      50,
      50
    );

    this.crearTextura(
      "door",
      50,
      50
    );

    this.crearTextura(
      "doorOpen",
      50,
      50
    );

    this.crearTextura(
      "button",
      50,
      20
    );

    this.crearTextura(
      "bridge",
      50,
      50
    );

    this.crearTextura(
      "trampoline",
      50,
      50
    );

    this.crearTextura(
      "weightplate",
      50,
      50
    );

    this.crearTextura(
      "box",
      50,
      50
    );

    this.crearTextura(
      "spike",
      50,
      50
    );

    this.crearTextura(
      "saw",
      50,
      50
    );

    this.crearTextura(
      "fragile",
      50,
      50
    );

    this.crearTextura(
      "cloud",
      50,
      50
    );

    this.crearTextura(
      "energy",
      30,
      30
    );


    this.crearTexturaJugador();


    // ==================================================
    // GRUPOS
    // ==================================================

    this.plataformas =
      this.physics.add.staticGroup();

    this.agua =
      this.physics.add.staticGroup();

    this.botones =
      this.physics.add.staticGroup();

    this.puentes =
      this.physics.add.staticGroup();

    this.trampolines =
      this.physics.add.staticGroup();

    this.cajas =
      this.physics.add.staticGroup();

    this.placasPeso =
      this.physics.add.staticGroup();

    this.trampas =
      this.physics.add.group({
        allowGravity: false,
        immovable: true,
      });

    this.plataformasFragiles =
      this.physics.add.staticGroup();

    this.grupoJugadores =
      this.physics.add.group();


    // ==================================================
    // DIMENSIONES
    // ==================================================

    const mapaActual =
      obtenerMapaActual();

    const tamanoBloque =
      CONFIG.TAMANO_BLOQUE;

    const mapaAncho =
      mapaActual[0].length *
      tamanoBloque;

    const mapaAlto =
      mapaActual.length *
      tamanoBloque;


    this.physics.world.setBounds(
      0,
      0,
      mapaAncho,
      mapaAlto
    );


    this.cameras.main.setBounds(
      0,
      0,
      mapaAncho,
      mapaAlto
    );


    // ==================================================
    // HUD
    // ==================================================

    this.add
      .text(
        20,
        20,
        `NIVEL ${nivelActual}`,
        {
          fontSize: "20px",
          color: "#47D7FF",
          fontStyle: "bold",
          backgroundColor:
            "#111B2E",

          padding: {
            left: 12,
            right: 12,
            top: 7,
            bottom: 7,
          },
        }
      )
      .setScrollFactor(0)
      .setDepth(100);


    this.add
      .text(
        20,
        68,
        "CONSIGUE LA ENERGÍA Y LLEGA AL PORTAL",
        {
          fontSize: "14px",
          color: "#C9D7EA",
          backgroundColor:
            "#111B2E",

          padding: {
            left: 10,
            right: 10,
            top: 5,
            bottom: 5,
          },
        }
      )
      .setScrollFactor(0)
      .setDepth(100);


    this.txtVictoria =
      this.add
        .text(
          400,
          300,
          "",
          {
            fontSize: "42px",
            color: "#FFFFFF",
            fontStyle: "bold",
            align: "center",

            stroke: "#101722",
            strokeThickness: 8,

            backgroundColor:
              "#17334A",

            padding: {
              left: 26,
              right: 26,
              top: 18,
              bottom: 18,
            },
          }
        )
        .setOrigin(0.5)
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(100);


    // ==================================================
    // CONSTRUIR MAPA
    // ==================================================

    for (
      let y = 0;
      y < mapaActual.length;
      y++
    ) {
      for (
        let x = 0;
        x < mapaActual[y].length;
        x++
      ) {
        const tipo =
          mapaActual[y][x];


        const posX =
          x * tamanoBloque +
          tamanoBloque / 2;


        const posY =
          y * tamanoBloque +
          tamanoBloque / 2;


        // ==========================================
        // PISO
        // ==========================================

        if (tipo === 1) {
          this.plataformas.create(
            posX,
            posY,
            "ground"
          );
        }


        // ==========================================
        // AGUA
        // ==========================================

        else if (
          tipo === 2
        ) {
          const agua =
            this.agua.create(
              posX,
              posY,
              "water"
            );


          agua.body.setSize(
            50,
            12
          );


          agua.body.setOffset(
            0,
            38
          );
        }


        // ==========================================
        // ENERGÍA
        // ==========================================

        else if (
          tipo === 3
        ) {
          this.energiaOriginalX =
            posX;

          this.energiaOriginalY =
            posY;


          this.energia =
            this.physics.add
              .sprite(
                posX,
                posY,
                "energy"
              )
              .setScale(0.8);


          this.energia.body.allowGravity =
            false;
        }


        // ==========================================
        // PORTAL
        // ==========================================

        else if (
          tipo === 4
        ) {
          this.puerta =
            this.physics.add.staticSprite(
              posX,
              posY - 15,
              "door"
            );


          this.puerta.setScale(
            0.9
          );


          this.puerta.refreshBody();
        }


        // ==========================================
        // DECORACIÓN
        // ==========================================

        else if (
          tipo === 5
        ) {
          this.add
            .image(
              posX,
              posY,
              "cloud"
            )
            .setDepth(-10);
        }


        // ==========================================
        // BOTÓN
        // ==========================================

        else if (
          tipo === 9 ||
          tipo === 17
        ) {
          // Creamos piso debajo.
          // Esto evita que el jugador caiga
          // al pisar el botón.

          this.plataformas.create(
            posX,
            posY,
            "ground"
          );


          // La textura mide 20px de alto.
          // El centro queda 35px arriba del centro
          // del bloque de piso, por lo que la parte
          // inferior del botón coincide con la parte
          // superior del piso.

          const boton =
            this.botones.create(
              posX,
              posY - 35,
              "button"
            );


          boton.body.setSize(
            40,
            8
          );


          boton.body.setOffset(
            5,
            6
          );


          boton.setData(
            "tipoBoton",
            tipo === 9
              ? 1
              : 2
          );
        }


        // ==========================================
        // PUENTE
        // ==========================================

        else if (
          tipo === 10
        ) {
          const puente =
            this.puentes.create(
              posX,
              posY - 15,
              "bridge"
            );


          puente.body.setSize(
            50,
            20
          );


          puente.body.setOffset(
            0,
            0
          );


          puente.body.enable =
            false;


          puente.setAlpha(
            0.3
          );
        }


        // ==========================================
        // TRAMPOLÍN
        // ==========================================

        else if (
          tipo === 11
        ) {
          const trampolin =
            this.trampolines.create(
              posX,
              posY,
              "trampoline"
            );


          trampolin.body.setSize(
            50,
            25
          );


          trampolin.body.setOffset(
            0,
            25
          );


          trampolin.body.enable =
            true;


          const texto =
            this.add
              .text(
                posX,
                posY - 30,
                "",
                {
                  fontSize:
                    "28px",

                  color:
                    "#FFFFFF",

                  fontStyle:
                    "bold",

                  stroke:
                    "#1F2937",

                  strokeThickness:
                    5,
                }
              )
              .setOrigin(0.5);


          trampolin.setData(
            "txt",
            texto
          );


          trampolin.setData(
            "estado",
            "idle"
          );
        }


        // ==========================================
        // PLACA
        // ==========================================

        else if (
          tipo === 12
        ) {
          const placa =
            this.placasPeso.create(
              posX,
              posY,
              "weightplate"
            );


          placa.body.setSize(
            40,
            15
          );


          placa.body.setOffset(
            5,
            35
          );
        }


        // ==========================================
        // CAJA
        // ==========================================

        else if (
          tipo === 13
        ) {
          const caja =
            this.cajas.create(
              posX,
              posY,
              "box"
            );


          caja.body.setSize(
            50,
            50
          );


          caja.body.setOffset(
            0,
            0
          );


          caja.setData(
            "xInicial",
            posX
          );


          caja.setData(
            "yInicial",
            posY
          );


          caja.setData(
            "yObjetivo",
            posY +
              CONFIG.FILAS_CAIDA_CAJA *
                tamanoBloque
          );


          caja.setData(
            "aterrizada",
            false
          );
        }


        // ==========================================
        // PINCHOS
        // ==========================================

        else if (
          tipo === 14
        ) {
          const pinchos =
            this.trampas.create(
              posX,
              posY,
              "spike"
            );


          pinchos.body.setSize(
            46,
            28
          );


          pinchos.body.setOffset(
            2,
            20
          );


          pinchos.setData(
            "tipoTrampa",
            "spike"
          );
        }


        // ==========================================
        // SIERRA
        // ==========================================

        else if (
          tipo === 15
        ) {
          const sierra =
            this.trampas.create(
              posX,
              posY,
              "saw"
            );


          sierra.body.setCircle(
            18,
            7,
            7
          );


          sierra.setData(
            "tipoTrampa",
            "saw"
          );


          sierra.setData(
            "xInicial",
            posX
          );


          sierra.setData(
            "yInicial",
            posY
          );


          sierra.setData(
            "fase",
            0
          );
        }


        // ==========================================
        // FRÁGIL
        // ==========================================

        else if (
          tipo === 16
        ) {
          const fragil =
            this.plataformasFragiles.create(
              posX,
              posY,
              "fragile"
            );


          fragil.body.setSize(
            50,
            20
          );


          fragil.body.setOffset(
            0,
            10
          );


          fragil.setData(
            "activa",
            true
          );


          fragil.setData(
            "timer",
            null
          );
        }
      }
    }


    // ==================================================
    // COLISIONES
    // ==================================================

    this.physics.add.collider(
      this.grupoJugadores,
      this.plataformas
    );


    this.physics.add.collider(
      this.grupoJugadores,
      this.puentes
    );


    this.physics.add.collider(
      this.grupoJugadores,
      this.trampolines
    );


    this.physics.add.collider(
      this.grupoJugadores,
      this.cajas
    );


    this.physics.add.collider(
      this.grupoJugadores,
      this.plataformasFragiles
    );


    this.physics.add.collider(
      this.grupoJugadores,
      this.grupoJugadores
    );


    // Trampas
    this.physics.add.overlap(
      this.grupoJugadores,
      this.trampas,
      this.tocarTrampa,
      null,
      this
    );


    // Agua
    this.physics.add.overlap(
      this.grupoJugadores,
      this.agua,
      this.respawnEquipo,
      null,
      this
    );


    // Energía
    if (
      this.energia
    ) {
      this.physics.add.overlap(
        this.grupoJugadores,
        this.energia,
        this.agarrarEnergia,
        null,
        this
      );
    }


    // ==================================================
    // SOCKET INPUT
    // ==================================================

    socket
      .off("inputDeJugador")
      .on(
        "inputDeJugador",
        this.handleInputGame.bind(
          this
        )
      );


    // ==================================================
    // JUGADOR DESCONECTADO
    // ==================================================

    socket
      .off("jugadorDesconectado")
      .on(
        "jugadorDesconectado",
        (id) => {
          if (
            this.jugadoresSprites[
              id
            ]
          ) {
            this.jugadoresAdentro.delete(
              id
            );


            this.jugadoresSprites[
              id
            ].sprite.destroy();


            delete this.jugadoresSprites[
              id
            ];


            contadorColores--;
          }
        }
      );


    // ==================================================
    // NUEVO JUGADOR
    // ==================================================

    socket
      .off("nuevoJugador")
      .on(
        "nuevoJugador",
        ({
          idDelSocket,
          color,
        }) => {
          if (
            this.jugadoresSprites[
              idDelSocket
            ]
          ) {
            return;
          }


          const cantidad =
            Object.keys(
              this.jugadoresSprites
            ).length;


          // Aparecen desde la izquierda
          const player =
            this.grupoJugadores.create(
              90 +
                cantidad *
                  30,
              450,
              "player"
            );


          player.setData(
            "id",
            idDelSocket
          );


          player
            .setTint(color)
            .setCollideWorldBounds(
              true
            )
            .setScale(0.9);


          player.body.setSize(
            40,
            40
          );


          player.body.setOffset(
            0,
            0
          );


          player.setDragX(
            2500
          );


          player.setMaxVelocity(
            CONFIG.VELOCIDAD_JUGADOR,
            1500
          );


          this.jugadoresSprites[
            idDelSocket
          ] = {
            sprite: player,

            controles: {
              left: false,
              right: false,
              jump: false,
              up: false,
              down: false,
            },

            adentro: false,

            upPressedLastFrame:
              false,
          };


          contadorColores++;
        }
      );


    // ==================================================
    // SERVIDOR REINICIADO
    // ==================================================

    socket
      .off(
        "servidorReiniciado"
      )
      .on(
        "servidorReiniciado",
        () => {
          nivelActual = 1;

          this.scene.restart();
        }
      );


    socket.emit(
      "pedirJugadoresConectados"
    );
  }


  // ====================================================
  // INPUT
  // ====================================================

  handleInputGame(input) {
    const jugador =
      this.jugadoresSprites[
        input.idDelSocket
      ];


    if (
      !jugador ||
      this.nivelSuperado
    ) {
      return;
    }


    const activo =
      input.tipoDeEvento ===
      "keydown";


    if (
      input.teclaPresionada ===
      "ArrowLeft"
    ) {
      jugador.controles.left =
        activo;
    }


    if (
      input.teclaPresionada ===
      "ArrowRight"
    ) {
      jugador.controles.right =
        activo;
    }


    if (
      input.teclaPresionada ===
      "Space"
    ) {
      jugador.controles.jump =
        activo;
    }


    if (
      input.teclaPresionada ===
      "ArrowUp"
    ) {
      jugador.controles.up =
        activo;
    }


    if (
      input.teclaPresionada ===
      "ArrowDown"
    ) {
      jugador.controles.down =
        activo;
    }
  }


  // ====================================================
  // RESPAWN
  // ====================================================

  respawnEquipo() {
    if (
      this.nivelSuperado ||
      this.reiniciando
    ) {
      return;
    }


    this.reiniciando = true;


    let indice = 0;


    Object.values(
      this.jugadoresSprites
    ).forEach(
      (jugador) => {
        jugador.sprite
          .setPosition(
            90 +
              indice * 30,
            450
          )
          .setVelocity(
            0,
            0
          )
          .setVisible(
            true
          );


        jugador.adentro =
          false;


        jugador.upPressedLastFrame =
          false;


        jugador.sprite.body.allowGravity =
          true;


        indice++;
      }
    );


    this.jugadoresAdentro.clear();


    // Energía
    this.equipoTieneEnergia =
      false;


    this.jugadorConEnergiaId =
      null;


    this.ultimoTraspasoEnergia =
      0;


    this.esperandoSeparacionEnergia =
      false;


    // Portal
    this.puertaAbierta =
      false;


    // Placas
    this.pesoActivado =
      false;


    // Puente vuelve al inicio
    this.puenteActivado =
      false;


    this.puenteAsegurado =
      false;


    // ==================================================
    // RESET TRAMPOLINES
    // ==================================================

    this.trampolines
      .getChildren()
      .forEach(
        (trampolin) => {
          const timer =
            trampolin.getData(
              "timerEvent"
            );


          if (timer) {
            timer.remove();
          }


          trampolin.setData(
            "estado",
            "idle"
          );


          const txt =
            trampolin.getData(
              "txt"
            );


          if (txt) {
            txt.setText(
              ""
            );
          }
        }
      );


    // ==================================================
    // RESET SIERRAS
    // ==================================================

    this.trampas
      .getChildren()
      .forEach(
        (trampa) => {
          if (
            trampa.getData(
              "tipoTrampa"
            ) !== "saw"
          ) {
            return;
          }


          const x =
            trampa.getData(
              "xInicial"
            );


          const y =
            trampa.getData(
              "yInicial"
            );


          trampa.setPosition(
            x,
            y
          );


          trampa.body.reset(
            x,
            y
          );


          trampa.angle =
            0;


          trampa.setData(
            "fase",
            0
          );
        }
      );


    // ==================================================
    // RESET FRÁGILES
    // ==================================================

    this.plataformasFragiles
      .getChildren()
      .forEach(
        (plataforma) => {
          const timer =
            plataforma.getData(
              "timer"
            );


          if (timer) {
            timer.remove();
          }


          plataforma.body.enable =
            true;


          plataforma.setData(
            "activa",
            true
          );


          plataforma.setAlpha(
            1
          );
        }
      );


    // ==================================================
    // RESET CAJAS
    // ==================================================

    this.cajas
      .getChildren()
      .forEach(
        (caja) => {
          const x =
            caja.getData(
              "xInicial"
            );


          const y =
            caja.getData(
              "yInicial"
            );


          caja.setPosition(
            x,
            y
          );


          caja.body.reset(
            x,
            y
          );


          caja.setData(
            "aterrizada",
            false
          );
        }
      );


    // ==================================================
    // RESET ENERGÍA
    // ==================================================

    if (
      this.energia
    ) {
      this.energia
        .setVisible(true)
        .setPosition(
          this.energiaOriginalX,
          this.energiaOriginalY
        );


      this.energia.body.enable =
        true;
    }


    // ==================================================
    // RESET PORTAL
    // ==================================================

    if (
      this.puerta
    ) {
      this.puerta
        .setTexture(
          "door"
        )
        .refreshBody();
    }


    this.time.delayedCall(
      CONFIG.TIEMPO_RESPAWN,
      () => {
        this.reiniciando =
          false;
      }
    );
  }


  // ====================================================
  // TRAMPAS
  // ====================================================

  tocarTrampa(
    jugador,
    trampa
  ) {
    if (
      this.nivelSuperado ||
      this.reiniciando
    ) {
      return;
    }


    const tipo =
      trampa.getData(
        "tipoTrampa"
      );


    if (
      tipo === "spike" ||
      tipo === "saw"
    ) {
      this.respawnEquipo();
    }
  }


  // ====================================================
  // PLATAFORMA FRÁGIL
  // ====================================================

  activarPlataformaFragil(
    plataforma
  ) {
    if (
      !plataforma.getData(
        "activa"
      )
    ) {
      return;
    }


    plataforma.setData(
      "activa",
      false
    );


    const timer =
      this.time.delayedCall(
        CONFIG.TIEMPO_PLATAFORMA_FRAGIL,
        () => {
          if (
            !plataforma.active ||
            this.nivelSuperado
          ) {
            return;
          }


          plataforma.body.enable =
            false;


          this.tweens.add({
            targets:
              plataforma,

            alpha: 0.15,

            duration: 180,
          });


          const volver =
            this.time.delayedCall(
              1200,
              () => {
                if (
                  !plataforma.active ||
                  this.nivelSuperado
                ) {
                  return;
                }


                plataforma.body.enable =
                  true;


                plataforma.setData(
                  "activa",
                  true
                );


                this.tweens.add({
                  targets:
                    plataforma,

                  alpha: 1,

                  duration: 220,
                });
              }
            );


          plataforma.setData(
            "timer",
            volver
          );
        }
      );


    plataforma.setData(
      "timer",
      timer
    );


    this.tweens.add({
      targets:
        plataforma,

      alpha: 0.45,

      duration: 180,
    });
  }


  // ====================================================
  // AGARRAR ENERGÍA
  // ====================================================

  agarrarEnergia(
    a,
    b
  ) {
    if (
      this.equipoTieneEnergia
    ) {
      return;
    }


    const jugador =
      a.texture.key ===
      "player"
        ? a
        : b;


    const energia =
      a.texture.key ===
      "energy"
        ? a
        : b;


    this.equipoTieneEnergia =
      true;


    this.jugadorConEnergiaId =
      jugador.getData(
        "id"
      );


    // Queda visible sobre el jugador
    energia.setVisible(
      true
    );


    // No puede volver a recogerse
    energia.body.enable =
      false;
  }


  // ====================================================
  // TRANSFERIR ENERGÍA
  // ====================================================

  transferirEnergiaEntreJugadores(
    time
  ) {
    if (
      !this.equipoTieneEnergia ||
      !this.jugadorConEnergiaId
    ) {
      this.esperandoSeparacionEnergia =
        false;

      return;
    }


    const portador =
      this.jugadoresSprites[
        this.jugadorConEnergiaId
      ];


    if (
      !portador ||
      portador.adentro
    ) {
      return;
    }


    // Detectar si todavía siguen tocándose
    let siguenJuntos =
      false;


    for (
      const [
        id,
        jugador,
      ] of Object.entries(
        this.jugadoresSprites
      )
    ) {
      if (
        id ===
          this.jugadorConEnergiaId ||
        jugador.adentro
      ) {
        continue;
      }


      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          portador.sprite.getBounds(),
          jugador.sprite.getBounds()
        )
      ) {
        siguenJuntos =
          true;

        break;
      }
    }


    // Si se separaron, puede volver a transferirse.
    if (!siguenJuntos) {
      this.esperandoSeparacionEnergia =
        false;
    }


    if (
      this.esperandoSeparacionEnergia
    ) {
      return;
    }


    if (
      time <
      this.ultimoTraspasoEnergia
    ) {
      return;
    }


    // Buscar jugador tocando al portador
    for (
      const [
        id,
        jugador,
      ] of Object.entries(
        this.jugadoresSprites
      )
    ) {
      if (
        id ===
          this.jugadorConEnergiaId ||
        jugador.adentro
      ) {
        continue;
      }


      const seTocan =
        Phaser.Geom.Intersects.RectangleToRectangle(
          portador.sprite.getBounds(),
          jugador.sprite.getBounds()
        );


      if (!seTocan) {
        continue;
      }


      // Transferencia
      this.jugadorConEnergiaId =
        id;


      this.ultimoTraspasoEnergia =
        time + 300;


      this.esperandoSeparacionEnergia =
        true;


      break;
    }
  }


  // ====================================================
  // VICTORIA
  // ====================================================

  victoria() {
    if (
      this.nivelSuperado
    ) {
      return;
    }


    this.nivelSuperado =
      true;


    this.plataformas.clear(
      true,
      true
    );


    this.agua.clear(
      true,
      true
    );


    this.botones.clear(
      true,
      true
    );


    this.puentes.clear(
      true,
      true
    );


    this.trampolines.clear(
      true,
      true
    );


    this.cajas.clear(
      true,
      true
    );


    this.placasPeso.clear(
      true,
      true
    );


    this.trampas.clear(
      true,
      true
    );


    this.plataformasFragiles.clear(
      true,
      true
    );


    if (
      this.energia
    ) {
      this.energia.destroy();
    }


    if (
      this.puerta
    ) {
      this.puerta.destroy();
    }


    const mensaje =
      nivelActual <
      CONFIG.TOTAL_NIVELES
        ? `⚡ ¡NIVEL ${nivelActual} SUPERADO! ⚡\nEl equipo llegó al siguiente sector`
        : `🚀 ¡MISIÓN COMPLETADA! 🚀\nTodo el equipo llegó al portal`;


    this.txtVictoria
      .setText(
        mensaje
      )
      .setVisible(
        true
      );


    this.time.delayedCall(
      CONFIG.TIEMPO_VICTORIA,
      () => {
        if (
          nivelActual <
          CONFIG.TOTAL_NIVELES
        ) {
          nivelActual++;
        } else {
          nivelActual = 1;
        }


        this.scene.restart();
      }
    );
  }


  // ====================================================
  // UPDATE
  // ====================================================

  update(
    time,
    delta
  ) {
    if (
      !this.jugadoresSprites ||
      this.nivelSuperado
    ) {
      return;
    }


    const jugadores =
      Object.entries(
        this.jugadoresSprites
      );


    const totalJugadores =
      jugadores.length;


    if (
      totalJugadores === 0
    ) {
      return;
    }


    // ==================================================
    // CÁMARA
    // ==================================================

    const afuera =
      jugadores.filter(
        ([, jugador]) =>
          !jugador.adentro
      );


    if (
      afuera.length > 0
    ) {
      const sumaX =
        afuera.reduce(
          (
            suma,
            [, jugador]
          ) =>
            suma +
            jugador.sprite.x,
          0
        );


      const mapaAncho =
        obtenerMapaActual()[0]
          .length *
        CONFIG.TAMANO_BLOQUE;


      const targetX =
        Phaser.Math.Clamp(
          sumaX /
            afuera.length -
            400,
          0,
          Math.max(
            0,
            mapaAncho -
              800
          )
        );


      this.cameras.main.scrollX +=
        (
          targetX -
          this.cameras.main.scrollX
        ) *
        0.12;
    }


    // ==================================================
    // ENERGÍA
    // ==================================================

    if (
      this.equipoTieneEnergia &&
      this.energia &&
      !this.puertaAbierta
    ) {
      const portador =
        this.jugadoresSprites[
          this.jugadorConEnergiaId
        ];


      if (
        portador &&
        !portador.adentro
      ) {
        this.energia.setPosition(
          portador.sprite.x,
          portador.sprite.y -
            35
        );
      }
    }


    // ==================================================
    // BOTONES
    // ==================================================

    let botonInicialPisado =
      false;

    let botonFinalPisado =
      false;


    this.botones
      .getChildren()
      .forEach(
        (boton) => {
          let pisado =
            false;


          const tipoBoton =
            boton.getData(
              "tipoBoton"
            );


          for (
            const [
              ,
              jugador,
            ] of jugadores
          ) {
            if (
              jugador.adentro
            ) {
              continue;
            }


            if (
              Phaser.Geom.Intersects.RectangleToRectangle(
                jugador.sprite.getBounds(),
                boton.getBounds()
              )
            ) {
              pisado =
                true;

              break;
            }
          }


          if (pisado) {
            boton.setTint(
              0x9cff57
            );


            if (
              tipoBoton ===
              1
            ) {
              botonInicialPisado =
                true;
            }


            if (
              tipoBoton ===
              2
            ) {
              botonFinalPisado =
                true;
            }
          } else {
            boton.clearTint();
          }
        }
      );


    // ==================================================
    // PRIMER BOTÓN
    // ==================================================

    if (
      botonInicialPisado
    ) {
      this.puenteActivado =
        true;
    }


    // ==================================================
    // SEGUNDO BOTÓN
    // ==================================================

    if (
      botonFinalPisado
    ) {
      this.puenteAsegurado =
        true;
    }


    // ==================================================
    // PUENTE
    // ==================================================

    const puenteActivo =
      this.puenteActivado ||
      this.puenteAsegurado;


    this.puentes
      .getChildren()
      .forEach(
        (puente) => {
          puente.body.enable =
            puenteActivo;


          puente.setAlpha(
            puenteActivo
              ? 1
              : 0.3
          );
        }
      );


    // Para los trampolines
    const botonPresionado =
      botonInicialPisado ||
      botonFinalPisado;


    // ==================================================
    // TRAMPOLINES
    // ==================================================

    this.trampolines
      .getChildren()
      .forEach(
        (trampolin) => {
          if (
            botonPresionado &&
            trampolin.getData(
              "estado"
            ) ===
              "idle"
          ) {
            trampolin.setData(
              "estado",
              "contando"
            );


            let contador =
              3;


            const texto =
              trampolin.getData(
                "txt"
              );


            texto.setText(
              contador
            );


            const evento =
              this.time.addEvent({
                delay: 1000,

                repeat: 2,

                callback:
                  () => {
                    contador--;


                    if (
                      contador > 0
                    ) {
                      texto.setText(
                        contador
                      );

                      return;
                    }


                    texto.setText(
                      ""
                    );


                    trampolin.setData(
                      "estado",
                      "disparado"
                    );


                    Object.values(
                      this.jugadoresSprites
                    ).forEach(
                      (jugador) => {
                        if (
                          jugador.adentro
                        ) {
                          return;
                        }


                        const p =
                          jugador.sprite;


                        const diferenciaX =
                          Math.abs(
                            p.x -
                              trampolin.x
                          );


                        const diferenciaY =
                          trampolin.y -
                          p.y;


                        if (
                          diferenciaX <
                            45 &&
                          diferenciaY >
                            0 &&
                          diferenciaY <
                            80
                        ) {
                          p.setVelocityY(
                            -900
                          );
                        }
                      }
                    );


                    this.time.delayedCall(
                      1200,
                      () => {
                        trampolin.setData(
                          "estado",
                          "idle"
                        );
                      }
                    );
                  },
              });


            trampolin.setData(
              "timerEvent",
              evento
            );
          }
        }
      );


    // ==================================================
    // PLACAS
    // ==================================================

    if (
      !this.pesoActivado
    ) {
      const jugadoresEnPlacas =
        new Set();


      this.placasPeso
        .getChildren()
        .forEach(
          (placa) => {
            let pisada =
              false;


            for (
              const [
                id,
                jugador,
              ] of jugadores
            ) {
              if (
                jugador.adentro
              ) {
                continue;
              }


              if (
                Phaser.Geom.Intersects.RectangleToRectangle(
                  jugador.sprite.getBounds(),
                  placa.getBounds()
                )
              ) {
                pisada =
                  true;


                jugadoresEnPlacas.add(
                  id
                );
              }
            }


            if (
              pisada
            ) {
              placa.setTint(
                0xffff55
              );
            } else {
              placa.clearTint();
            }
          }
        );


      if (
        jugadoresEnPlacas.size >=
        CONFIG.JUGADORES_PESO_CAJA
      ) {
        this.pesoActivado =
          true;
      }
    } else {
      this.placasPeso
        .getChildren()
        .forEach(
          (placa) => {
            placa.setTint(
              0x55ff55
            );
          }
        );
    }


    // ==================================================
    // CAJAS
    // ==================================================

    if (
      this.pesoActivado
    ) {
      this.cajas
        .getChildren()
        .forEach(
          (caja) => {
            if (
              caja.getData(
                "aterrizada"
              )
            ) {
              return;
            }


            const objetivo =
              caja.getData(
                "yObjetivo"
              );


            const avance =
              CONFIG
                .VELOCIDAD_CAIDA_CAJA *
              (
                (delta || 16) /
                1000
              );


            const nuevoY =
              Math.min(
                caja.y +
                  avance,
                objetivo
              );


            caja.setPosition(
              caja.x,
              nuevoY
            );


            caja.body.reset(
              caja.x,
              nuevoY
            );


            if (
              nuevoY >=
              objetivo
            ) {
              caja.setData(
                "aterrizada",
                true
              );
            }
          }
        );
    }


    // ==================================================
    // SIERRAS
    // ==================================================

    this.trampas
      .getChildren()
      .forEach(
        (trampa) => {
          if (
            trampa.getData(
              "tipoTrampa"
            ) !== "saw"
          ) {
            return;
          }


          const xInicial =
            trampa.getData(
              "xInicial"
            );


          const yInicial =
            trampa.getData(
              "yInicial"
            );


          let fase =
            trampa.getData(
              "fase"
            );


          fase +=
            (delta || 16) /
            1000;


          const nuevaX =
            xInicial +
            Math.sin(
              fase * 2.2
            ) *
              115;


          trampa.setData(
            "fase",
            fase
          );


          trampa.setPosition(
            nuevaX,
            yInicial
          );


          trampa.body.reset(
            nuevaX,
            yInicial
          );


          trampa.angle +=
            CONFIG
              .VELOCIDAD_SIERRA *
            (
              (delta || 16) /
              16.67
            );
        }
      );


    // ==================================================
    // FRÁGILES
    // ==================================================

    this.plataformasFragiles
      .getChildren()
      .forEach(
        (plataforma) => {
          if (
            !plataforma.getData(
              "activa"
            )
          ) {
            return;
          }


          for (
            const [
              ,
              jugador,
            ] of jugadores
          ) {
            if (
              jugador.adentro
            ) {
              continue;
            }


            if (
              Phaser.Geom.Intersects.RectangleToRectangle(
                jugador.sprite.getBounds(),
                plataforma.getBounds()
              )
            ) {
              this.activarPlataformaFragil(
                plataforma
              );


              break;
            }
          }
        }
      );


    // ==================================================
    // MOVIMIENTO
    // ==================================================

    for (
      const [
        id,
        jugador,
      ] of jugadores
    ) {
      const p =
        jugador.sprite;


      // ==============================================
      // DENTRO DEL PORTAL
      // ==============================================

      if (
        jugador.adentro
      ) {
        p.setPosition(
          this.puerta.x,
          this.puerta.y
        );


        p.setVelocity(
          0,
          0
        );


        p.body.allowGravity =
          false;


        if (
          jugador.controles
            .down
        ) {
          jugador.adentro =
            false;


          p.setVisible(
            true
          );


          p.body.allowGravity =
            true;


          this.jugadoresAdentro.delete(
            id
          );
        }


        continue;
      }


      // ==============================================
      // IZQUIERDA
      // ==============================================

      if (
        jugador.controles
          .left
      ) {
        p.setAccelerationX(
          -CONFIG
            .ACELERACION_JUGADOR
        );
      }


      // ==============================================
      // DERECHA
      // ==============================================

      else if (
        jugador.controles
          .right
      ) {
        p.setAccelerationX(
          CONFIG
            .ACELERACION_JUGADOR
        );
      }


      else {
        p.setAccelerationX(
          0
        );
      }


      // ==============================================
      // SALTO
      // ==============================================

      if (
        jugador.controles
          .jump &&
        p.body.blocked.down
      ) {
        p.setVelocityY(
          -CONFIG.SALTO_FUERZA
        );


        jugador.controles
          .jump = false;
      }


      // ==============================================
      // PORTAL
      // ==============================================

      if (
        this.puerta
      ) {
        const cerca =
          Math.abs(
            p.x -
              this.puerta.x
          ) < 45 &&
          Math.abs(
            p.y -
              this.puerta.y
          ) < 70;


        if (
          cerca
        ) {
          // Abrir con energía
          if (
            !this.puertaAbierta &&
            this.equipoTieneEnergia
          ) {
            this.puertaAbierta =
              true;


            this.puerta
              .setTexture(
                "doorOpen"
              )
              .refreshBody();
          }


          // Entrar con arriba
          if (
            this.puertaAbierta &&
            jugador.controles
              .up &&
            !jugador.upPressedLastFrame
          ) {
            jugador.adentro =
              true;


            p.setVisible(
              false
            );


            p.body.allowGravity =
              false;


            p.setVelocity(
              0,
              0
            );


            this.jugadoresAdentro.add(
              id
            );
          }


          jugador.upPressedLastFrame =
            jugador.controles
              .up;
        }


        else {
          jugador.upPressedLastFrame =
            false;
        }
      }
    }


    // ==================================================
    // TRANSFERENCIA DE ENERGÍA
    // ==================================================

    this.transferirEnergiaEntreJugadores(
      time
    );


    // ==================================================
    // VICTORIA
    // ==================================================

    if (
      this.puertaAbierta &&
      totalJugadores > 0 &&
      this.jugadoresAdentro.size >=
        totalJugadores
    ) {
      this.victoria();
    }
  }
}


// ======================================================
// CONFIGURACIÓN PHASER
// ======================================================

const config = {
  type: Phaser.AUTO,

  width: 800,
  height: 600,

  parent: "juego",

  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: CONFIG.GRAVEDAD,
      },

      debug: false,

      fps: 120,

      overlapBias: 16,

      separationBias: 10,
    },
  },

  scene: [
    SceneGame,
  ],
};


// ======================================================
// INICIAR JUEGO
// ======================================================

new Phaser.Game(
  config
);