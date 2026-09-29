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

  VELOCIDAD_CAJA_MOVIL: 190,
  ACELERACION_CAJA_MOVIL: 900,
};

const socket = io({
  query: {
    tipo: "pantalla",
  },
});

let contadorColores = 0;
let nivelActual = 1;

function crearMapaBase() {
  return Array.from(
    { length: 12 },
    () => Array(60).fill(0)
  );
}

function piso(
  mapa,
  fila,
  desde,
  hasta
) {
  for (
    let x = desde;
    x <= hasta;
    x++
  ) {
    mapa[fila][x] = 1;
  }
}

function colocar(
  mapa,
  fila,
  columna,
  tipo
) {
  if (
    fila >= 0 &&
    fila < mapa.length &&
    columna >= 0 &&
    columna < mapa[0].length
  ) {
    mapa[fila][columna] = tipo;
  }
}

function colocarVarios(
  mapa,
  fila,
  columnas,
  tipo
) {
  columnas.forEach(
    (columna) => {
      colocar(
        mapa,
        fila,
        columna,
        tipo
      );
    }
  );
}

const mapaNivel1 = (() => {
  const mapa = crearMapaBase();

  [4, 12, 22, 33, 45, 54].forEach(
    (x, i) => {
      colocar(
        mapa,
        i % 2 === 0 ? 2 : 3,
        x,
        5
      );
    }
  );

  for (
    let x = 0;
    x < 60;
    x++
  ) {
    mapa[11][x] = 2;
  }

  piso(
    mapa,
    10,
    0,
    6
  );

  colocar(
    mapa,
    10,
    5,
    9
  );

  colocarVarios(
    mapa,
    10,
    [
      7,
      8,
      9,
      10,
      11,
      12,
      13,
    ],
    10
  );

  piso(
    mapa,
    10,
    14,
    20
  );

  colocar(
    mapa,
    10,
    15,
    17
  );

  colocarVarios(
    mapa,
    9,
    [
      18,
      19,
    ],
    14
  );

  piso(
    mapa,
    8,
    20,
    23
  );

  colocarVarios(
    mapa,
    7,
    [
      24,
      25,
      26,
    ],
    16
  );

  piso(
    mapa,
    10,
    21,
    27
  );

  colocar(
    mapa,
    8,
    27,
    15
  );

  piso(
    mapa,
    7,
    28,
    31
  );

  colocar(
    mapa,
    8,
    30,
    15
  );

  piso(
    mapa,
    10,
    27,
    33
  );

  colocar(
    mapa,
    10,
    31,
    12
  );

  colocar(
    mapa,
    10,
    32,
    12
  );

  colocar(
    mapa,
    5,
    35,
    13
  );

  piso(
    mapa,
    10,
    34,
    39
  );

  colocar(
    mapa,
    10,
    40,
    11
  );

  piso(
    mapa,
    7,
    41,
    44
  );

  colocar(
    mapa,
    6,
    43,
    14
  );

  colocar(
    mapa,
    5,
    46,
    3
  );

  piso(
    mapa,
    8,
    46,
    49
  );

  piso(
    mapa,
    10,
    45,
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

  colocar(
    mapa,
    10,
    57,
    4
  );

  return mapa;
})();

const mapaNivel2 = (() => {
  const mapa = crearMapaBase();

  [3, 11, 19, 29, 40, 52].forEach(
    (x, i) => {
      colocar(
        mapa,
        i % 2 === 0 ? 2 : 3,
        x,
        5
      );
    }
  );

  for (
    let x = 0;
    x < 60;
    x++
  ) {
    mapa[11][x] = 2;
  }

  piso(
    mapa,
    10,
    0,
    5
  );

  colocar(
    mapa,
    10,
    1,
    9
  );

  colocarVarios(
    mapa,
    10,
    [
      6,
      7,
      8,
    ],
    10
  );

  piso(
    mapa,
    10,
    9,
    18
  );

  piso(
    mapa,
    8,
    10,
    14
  );

  colocar(
    mapa,
    8,
    13,
    17
  );

  colocarVarios(
    mapa,
    9,
    [
      16,
      17,
    ],
    14
  );

  colocarVarios(
    mapa,
    7,
    [
      19,
      20,
      21,
    ],
    16
  );

  colocarVarios(
    mapa,
    8,
    [
      22,
      23,
    ],
    16
  );

  piso(
    mapa,
    10,
    18,
    24
  );

  colocar(
    mapa,
    7,
    24,
    15
  );

  piso(
    mapa,
    10,
    24,
    29
  );

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

  colocarVarios(
    mapa,
    6,
    [
      40,
      41,
    ],
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
    [
      43,
      44,
    ],
    14
  );

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
    [
      54,
      55,
    ],
    16
  );

  colocar(
    mapa,
    10,
    57,
    4
  );

  return mapa;
})();

function obtenerMapaActual() {
  if (
    nivelActual === 2
  ) {
    return mapaNivel2;
  }

  return mapaNivel1;
}

class SceneGame extends Phaser.Scene {
  constructor() {
    super({
      key: "SceneGame",
    });

    this.resetEstado();
  }

  resetEstado() {
    this.jugadoresSprites = {};

    this.jugadoresAdentro =
      new Set();

    this.plataformas = null;
    this.agua = null;
    this.botones = null;
    this.puentes = null;

    this.trampolines = null;

    this.cajas = null;

    this.cajasMovibles = null;

    this.puertasCaja = null;

    this.placasPeso = null;

    this.trampas = null;

    this.plataformasFragiles =
      null;

    this.grupoJugadores =
      null;

    this.energia = null;

    this.energiaOriginalX = 0;
    this.energiaOriginalY = 0;

    this.equipoTieneEnergia =
      false;

    this.jugadorConEnergiaId =
      null;

    this.ultimoTraspasoEnergia =
      0;

    this.esperandoSeparacionEnergia =
      false;

    this.puerta = null;

    this.puertaX = 0;
    this.puertaY = 0;

    this.puertaAbierta =
      false;

    this.pesoActivado =
      false;

    this.puenteActivado =
      false;

    this.puenteAsegurado =
      false;

    this.cajaMovilOriginalX =
      0;

    this.cajaMovilOriginalY =
      0;

    this.reiniciando =
      false;

    this.nivelSuperado =
      false;

    this.txtVictoria =
      null;

    contadorColores =
      0;
  }

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

    ctx.fillStyle =
      "#DDE7F5";

    ctx.fillRect(
      8,
      7,
      24,
      23
    );

    ctx.fillStyle =
      "#7D8EA8";

    ctx.fillRect(
      6,
      11,
      28,
      17
    );

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

    ctx.fillStyle =
      "#FF5C8A";

    ctx.fillRect(
      16,
      23,
      8,
      4
    );

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

  crearTextura(
    key,
    w,
    h
  ) {
    if (
      this.textures.exists(
        key
      )
    ) {
      return;
    }

    const canvas =
      this.textures.createCanvas(
        key,
        w,
        h
      );

    const ctx =
      canvas.context;

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

      ctx.lineWidth =
        4;

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

      ctx.lineWidth =
        4;

      ctx.strokeRect(
        7,
        7,
        36,
        40
      );

      ctx.fillStyle =
        "#47D7FF";

      ctx.fillRect(
        14,
        14,
        22,
        26
      );

      ctx.fillStyle =
        "#9CFF57";

      ctx.fillRect(
        18,
        10,
        14,
        4
      );
    }

    else if (
      key === "button"
    ) {
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

      ctx.lineWidth =
        2;

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

      ctx.strokeRect(
        5,
        29,
        40,
        15
      );
    }

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

      ctx.lineWidth =
        3;

      ctx.strokeRect(
        4,
        6,
        42,
        42
      );

      ctx.strokeStyle =
        "#9CB0C7";

      ctx.lineWidth =
        2;

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

    else if (
      key === "gate"
    ) {
      ctx.fillStyle =
        "#1A1F2D";

      ctx.fillRect(
        3,
        2,
        w - 6,
        h - 2
      );

      ctx.fillStyle =
        "#FF5C8A";

      ctx.fillRect(
        7,
        6,
        w - 14,
        7
      );

      ctx.fillRect(
        7,
        20,
        w - 14,
        7
      );

      ctx.fillRect(
        7,
        34,
        w - 14,
        7
      );

      ctx.strokeStyle =
        "#FFD166";

      ctx.lineWidth =
        3;

      ctx.strokeRect(
        4,
        3,
        w - 8,
        h - 6
      );

      ctx.fillStyle =
        "#111722";

      ctx.fillRect(
        20,
        13,
        10,
        24
      );

      ctx.fillStyle =
        "#9CFF57";

      ctx.fillRect(
        23,
        17,
        4,
        16
      );
    }

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

      ctx.lineWidth =
        4;

      for (
        let i = 0;
        i < 8;
        i++
      ) {
        const ang =
          (
            Math.PI * 2 * i
          ) /
          8;

        ctx.beginPath();

        ctx.moveTo(
          w / 2 +
            Math.cos(
              ang
            ) *
              12,
          h / 2 +
            Math.sin(
              ang
            ) *
              12
        );

        ctx.lineTo(
          w / 2 +
            Math.cos(
              ang
            ) *
              23,
          h / 2 +
            Math.sin(
              ang
            ) *
              23
        );

        ctx.stroke();
      }
    }

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
    }

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

    canvas.refresh();
  }

  create() {
    this.resetEstado();

    this.cameras.main.setBackgroundColor(
      "#0B1020"
    );

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
      "gate",
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

    this.cajasMovibles =
      this.physics.add.group({
        allowGravity:
          true,

        immovable:
          false,
      });

    this.puertasCaja =
      this.physics.add.staticGroup();

    this.placasPeso =
      this.physics.add.staticGroup();

    this.trampas =
      this.physics.add.group({
        allowGravity:
          false,

        immovable:
          true,
      });

    this.plataformasFragiles =
      this.physics.add.staticGroup();

    this.grupoJugadores =
      this.physics.add.group();

    const mapa =
      obtenerMapaActual();

    const ancho =
      mapa[0].length *
      CONFIG.TAMANO_BLOQUE;

    const alto =
      mapa.length *
      CONFIG.TAMANO_BLOQUE;

    this.physics.world.setBounds(
      0,
      0,
      ancho,
      alto
    );

    this.cameras.main.setBounds(
      0,
      0,
      ancho,
      alto
    );

    this.add
      .text(
        780,
        20,
        `NIVEL ${nivelActual}`,
        {
          fontSize:
            "20px",

          color:
            "#47D7FF",

          fontStyle:
            "bold",

          backgroundColor:
            "#111B2E",

          padding: {
            left:
              12,

            right:
              12,

            top:
              7,

            bottom:
              7,
          },
        }
      )
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(100);

    let textoAyuda =
      "PISA EL BOTÓN, CRUZA EL PUENTE Y USA EL TRAMPOLÍN";

    if (
      nivelActual ===
      2
    ) {
      textoAyuda =
        "PISA EL BOTÓN PARA HABILITAR EL PUENTE Y AVANZAR";
    }

    this.add
      .text(
        780,
        68,
        textoAyuda,
        {
          fontSize:
            "14px",

          color:
            "#C9D7EA",

          backgroundColor:
            "#111B2E",

          padding: {
            left:
              10,

            right:
              10,

            top:
              5,

            bottom:
              5,
          },
        }
      )
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(100);

    this.txtVictoria =
      this.add
        .text(
          400,
          300,
          "",
          {
            fontSize:
              "42px",

            color:
              "#FFFFFF",

            fontStyle:
              "bold",

            align:
              "center",

            stroke:
              "#101722",

            strokeThickness:
              8,

            backgroundColor:
              "#17334A",

            padding: {
              left:
                26,

              right:
                26,

              top:
                18,

              bottom:
                18,
            },
          }
        )
        .setOrigin(0.5)
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(100);

    for (
      let y = 0;
      y < mapa.length;
      y++
    ) {
      for (
        let x = 0;
        x < mapa[y].length;
        x++
      ) {
        const tipo =
          mapa[y][x];

        const posX =
          x *
            CONFIG.TAMANO_BLOQUE +
          CONFIG.TAMANO_BLOQUE /
            2;

        const posY =
          y *
            CONFIG.TAMANO_BLOQUE +
          CONFIG.TAMANO_BLOQUE /
            2;

        if (
          tipo === 1
        ) {
          this.plataformas.create(
            posX,
            posY,
            "ground"
          );
        }

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
              .setScale(
                0.8
              );

          this.energia.body.allowGravity =
            false;
        }

        else if (
          tipo === 4
        ) {
          this.puertaX =
            posX;

          this.puertaY =
            posY - 15;

          this.puerta =
            this.add
              .image(
                this.puertaX,
                this.puertaY,
                "door"
              )
              .setScale(
                0.9
              );
        }

        else if (
          tipo === 5
        ) {
          this.add
            .image(
              posX,
              posY,
              "cloud"
            )
            .setDepth(
              -10
            );
        }

        else if (
          tipo === 9 ||
          tipo === 17
        ) {
          if (
            y === 10
          ) {
            this.plataformas.create(
              posX,
              posY,
              "ground"
            );
          }

          const boton =
            this.botones.create(
              posX,
              posY - 35,
              "button"
            );

          boton.body.setSize(
            42,
            10
          );

          boton.body.setOffset(
            4,
            5
          );

          boton.setData(
            "tipoBoton",
            tipo === 9
              ? 1
              : 2
          );
        }

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
            10
          );

          puente.body.setOffset(
            0,
            15
          );

          puente.body.enable =
            false;

          puente.setAlpha(
            0.3
          );
        }

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
            10
          );

          trampolin.body.setOffset(
            0,
            15
          );

          trampolin.setData(
            "cooldownHasta",
            0
          );
        }

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

        else if (
          tipo === 13
        ) {
          if (
            nivelActual === 1
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
                  CONFIG.TAMANO_BLOQUE
            );

            caja.setData(
              "aterrizada",
              false
            );
          }
        }

        else if (
          tipo === 20
        ) {
          const puertaCaja =
            this.puertasCaja.create(
              posX,
              posY - 25,
              "gate"
            );

          puertaCaja.body.setSize(
            42,
            50
          );

          puertaCaja.body.setOffset(
            4,
            0
          );

          puertaCaja.setData(
            "activa",
            true
          );
        }

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
      this.cajasMovibles
    );

    this.physics.add.collider(
      this.cajasMovibles,
      this.plataformas
    );

    this.physics.add.collider(
      this.cajasMovibles,
      this.puertasCaja
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.puertasCaja
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.plataformasFragiles
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.grupoJugadores
    );

    this.physics.add.overlap(
      this.grupoJugadores,
      this.agua,
      this.respawnEquipo,
      null,
      this
    );

    this.physics.add.overlap(
      this.grupoJugadores,
      this.trampas,
      this.tocarTrampa,
      null,
      this
    );

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

    socket
      .off(
        "inputDeJugador"
      )
      .on(
        "inputDeJugador",
        this.handleInputGame.bind(
          this
        )
      );

    socket
      .off(
        "jugadorDesconectado"
      )
      .on(
        "jugadorDesconectado",
        (id) => {
          if (
            !this.jugadoresSprites[
              id
            ]
          ) {
            return;
          }

          this.jugadoresAdentro.delete(
            id
          );

          this.jugadoresSprites[
            id
          ].sprite.destroy();

          delete this.jugadoresSprites[
            id
          ];

          contadorColores =
            Math.max(
              0,
              contadorColores - 1
            );
        }
      );

    socket
      .off(
        "nuevoJugador"
      )
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
            .setTint(
              color
            )
            .setCollideWorldBounds(
              true
            )
            .setScale(
              0.9
            );

          player.body.setSize(
            40,
            40
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
            sprite:
              player,

            controles: {
              left:
                false,

              right:
                false,

              jump:
                false,

              up:
                false,

              down:
                false,
            },

            adentro:
              false,

            upPressedLastFrame:
              false,
          };

          contadorColores++;
        }
      );

    socket
      .off(
        "servidorReiniciado"
      )
      .on(
        "servidorReiniciado",
        () => {
          nivelActual =
            1;

          this.scene.restart();
        }
      );

    socket.emit(
      "pedirJugadoresConectados"
    );
  }

  handleInputGame(
    input
  ) {
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

    energia.body.enable =
      false;
  }

  transferirEnergiaEntreJugadores(
    time
  ) {
    if (
      !this.equipoTieneEnergia ||
      !this.jugadorConEnergiaId
    ) {
      return;
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
        this.jugadorConEnergiaId =
          id;

        this.ultimoTraspasoEnergia =
          time + 300;

        this.esperandoSeparacionEnergia =
          true;

        break;
      }
    }
  }

  tocarTrampa() {
    if (
      !this.nivelSuperado &&
      !this.reiniciando
    ) {
      this.respawnEquipo();
    }
  }

  activarFragil(
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

          plataforma.setAlpha(
            0.15
          );

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

                plataforma.setAlpha(
                  1
                );
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
  }

  respawnEquipo() {
    if (
      this.nivelSuperado ||
      this.reiniciando
    ) {
      return;
    }

    this.reiniciando =
      true;

    let indice = 0;

    Object.values(
      this.jugadoresSprites
    ).forEach(
      (
        jugador
      ) => {
        jugador.sprite
          .setPosition(
            90 +
              indice *
                30,
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

    this.equipoTieneEnergia =
      false;

    this.jugadorConEnergiaId =
      null;

    this.ultimoTraspasoEnergia =
      0;

    this.esperandoSeparacionEnergia =
      false;

    this.puertaAbierta =
      false;

    if (
      this.puerta
    ) {
      this.puerta.setTexture(
        "door"
      );
    }

    this.pesoActivado =
      false;

    this.puenteActivado =
      false;

    this.puenteAsegurado =
      false;

    this.cajasMovibles
      .getChildren()
      .forEach(
        (
          caja
        ) => {
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

          caja.setVelocity(
            0,
            0
          );

          caja.setAccelerationX(
            0
          );
        }
      );

    this.puertasCaja
      .getChildren()
      .forEach(
        (
          puerta
        ) => {
          puerta.body.enable =
            true;

          puerta.setAlpha(
            1
          );
        }
      );

    this.trampolines
      .getChildren()
      .forEach(
        (
          trampolin
        ) => {
          trampolin.setData(
            "cooldownHasta",
            0
          );
        }
      );

    this.plataformasFragiles
      .getChildren()
      .forEach(
        (
          plataforma
        ) => {
          const timer =
            plataforma.getData(
              "timer"
            );

          if (
            timer
          ) {
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

    this.cajas
      .getChildren()
      .forEach(
        (
          caja
        ) => {
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

    if (
      this.energia
    ) {
      this.energia
        .setPosition(
          this.energiaOriginalX,
          this.energiaOriginalY
        )
        .setVisible(
          true
        );

      this.energia.body.enable =
        true;
    }

    this.time.delayedCall(
      CONFIG.TIEMPO_RESPAWN,
      () => {
        this.reiniciando =
          false;
      }
    );
  }

  victoria() {
    if (
      this.nivelSuperado
    ) {
      return;
    }

    this.nivelSuperado =
      true;

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
        nivelActual =
          nivelActual <
          CONFIG.TOTAL_NIVELES
            ? nivelActual + 1
            : 1;

        this.scene.restart();
      }
    );
  }

  update(
    time,
    delta
  ) {
    if (
      this.nivelSuperado
    ) {
      return;
    }

    const jugadores =
      Object.entries(
        this.jugadoresSprites
      );

    if (
      jugadores.length === 0
    ) {
      return;
    }

    const afuera =
      jugadores.filter(
        (
          [
            ,
            jugador,
          ]
        ) =>
          !jugador.adentro
      );

    if (
      afuera.length
    ) {
      const centro =
        afuera.reduce(
          (
            suma,
            [
              ,
              jugador,
            ]
          ) =>
            suma +
            jugador.sprite.x,
          0
        ) /
        afuera.length;

      const ancho =
        obtenerMapaActual()[0]
          .length *
        CONFIG.TAMANO_BLOQUE;

      const targetX =
        Phaser.Math.Clamp(
          centro -
            400,
          0,
          Math.max(
            0,
            ancho -
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

    let botonInicialPisado =
      false;

    let botonFinalPisado =
      false;

    this.botones
      .getChildren()
      .forEach(
        (
          boton
        ) => {
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

          if (
            pisado
          ) {
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
          }

          else {
            boton.clearTint();
          }
        }
      );

    const puenteActivo =
      botonInicialPisado ||
      botonFinalPisado;

    this.puenteActivado =
      puenteActivo;

    this.puentes
      .getChildren()
      .forEach(
        (
          puente
        ) => {
          puente.body.enable =
            puenteActivo;

          puente.setAlpha(
            puenteActivo
              ? 1
              : 0.3
          );
        }
      );

    this.trampolines
      .getChildren()
      .forEach(
        (
          trampolin
        ) => {
          const cooldownHasta =
            trampolin.getData(
              "cooldownHasta"
            ) || 0;

          if (
            time <
            cooldownHasta
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

            const p =
              jugador.sprite;

            const diferenciaX =
              Math.abs(
                p.x -
                  trampolin.x
              );

            const diferenciaY =
              p.y -
              trampolin.y;

            const estaAbajo =
              diferenciaY >=
                -85 &&
              diferenciaY <=
                20;

            const estaApoyado =
              p.body.blocked.down ||
              p.body.touching.down;

            const estaSubiendo =
              p.body.velocity.y <
              -50;

            if (
              diferenciaX <=
                36 &&
              estaAbajo &&
              estaApoyado &&
              !estaSubiendo
            ) {
              p.setVelocityY(
                -850
              );

              trampolin.setData(
                "cooldownHasta",
                time + 900
              );

              this.tweens.add({
                targets:
                  trampolin,

                scaleY:
                  0.8,

                duration:
                  90,

                yoyo:
                  true,
              });

              break;
            }
          }
        }
      );

    if (
      !this.pesoActivado
    ) {
      const sobrePlaca =
        new Set();

      this.placasPeso
        .getChildren()
        .forEach(
          (
            placa
          ) => {
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

                sobrePlaca.add(
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
            }

            else {
              placa.clearTint();
            }
          }
        );

      if (
        sobrePlaca.size >=
        CONFIG.JUGADORES_PESO_CAJA
      ) {
        this.pesoActivado =
          true;
      }
    }

    else {
      this.placasPeso
        .getChildren()
        .forEach(
          (
            placa
          ) => {
            placa.setTint(
              0x55ff55
            );
          }
        );
    }

    if (
      this.pesoActivado
    ) {
      this.cajas
        .getChildren()
        .forEach(
          (
            caja
          ) => {
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

    this.trampas
      .getChildren()
      .forEach(
        (
          trampa
        ) => {
          if (
            trampa.getData(
              "tipoTrampa"
            ) !==
            "saw"
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

          const fase =
            (
              trampa.getData(
                "fase"
              ) || 0
            ) +
            (
              delta ||
              16
            ) /
            1000;

          const nuevaX =
            xInicial +
            Math.sin(
              fase *
                2.2
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

    this.plataformasFragiles
      .getChildren()
      .forEach(
        (
          plataforma
        ) => {
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
              this.activarFragil(
                plataforma
              );

              break;
            }
          }
        }
      );

    for (
      const [
        id,
        jugador,
      ] of jugadores
    ) {
      const p =
        jugador.sprite;

      if (
        jugador.adentro
      ) {
        p
          .setPosition(
            this.puertaX,
            this.puertaY
          )
          .setVelocity(
            0,
            0
          );

        p.body.allowGravity =
          false;

        if (
          jugador.controles.down
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

      if (
        jugador.controles.left
      ) {
        p.setAccelerationX(
          -CONFIG
            .ACELERACION_JUGADOR
        );
      }

      else if (
        jugador.controles.right
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

      if (
        jugador.controles.jump &&
        p.body.blocked.down
      ) {
        p.setVelocityY(
          -CONFIG.SALTO_FUERZA
        );

        jugador.controles.jump =
          false;
      }

      if (
        this.puerta
      ) {
        const cerca =
          Math.abs(
            p.x -
              this.puertaX
          ) <
            45 &&
          Math.abs(
            p.y -
              this.puertaY
          ) <
            70;

        if (
          cerca
        ) {
          if (
            !this.puertaAbierta &&
            this.equipoTieneEnergia
          ) {
            this.puertaAbierta =
              true;

            this.puerta.setTexture(
              "doorOpen"
            );
          }

          if (
            this.puertaAbierta &&
            jugador.controles.up &&
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
            jugador.controles.up;
        }

        else {
          jugador.upPressedLastFrame =
            false;
        }
      }
    }

    this.transferirEnergiaEntreJugadores(
      time
    );

    if (
      this.puertaAbierta &&
      jugadores.length > 0 &&
      this.jugadoresAdentro.size >=
        jugadores.length
    ) {
      this.victoria();
    }
  }
}

const config = {
  type:
    Phaser.AUTO,

  width:
    800,

  height:
    600,

  parent:
    "juego",

  physics: {
    default:
      "arcade",

    arcade: {
      gravity: {
        y:
          CONFIG.GRAVEDAD,
      },

      debug:
        false,

      fps:
        120,

      overlapBias:
        16,

      separationBias:
        10,
    },
  },

  scene: [
    SceneGame,
  ],
};

new Phaser.Game(
  config
);