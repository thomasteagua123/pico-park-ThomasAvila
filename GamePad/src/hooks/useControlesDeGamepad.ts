import { useRef, RefObject } from "react";
import { LayoutDeZona } from "../tipos";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeTouchEvent,
} from "react-native";

const MARGEN_TOQUE = 24;

const useControlesDeGamepad = (
  alPresionarTecla: (tecla: string) => void,
  alSoltarTecla: (tecla: string) => void,
) => {
  const layoutDpad = useRef<LayoutDeZona | null>(null);
  const layoutBotonSalto = useRef<LayoutDeZona | null>(null);
  const layoutBotonArriba = useRef<LayoutDeZona | null>(null);
  const layoutBotonAbajo = useRef<LayoutDeZona | null>(null);
  const layoutBotonIzquierda = useRef<LayoutDeZona | null>(null);
  const layoutBotonDerecha = useRef<LayoutDeZona | null>(null);
  const teclasActivasRef = useRef<Set<string>>(new Set());

  const estaEnZona = (
    px: number,
    py: number,
    zona: LayoutDeZona | null,
    margen = MARGEN_TOQUE,
  ): boolean => {
    if (!zona) return false;

    return (
      px >= zona.x - margen &&
      px <= zona.x + zona.width + margen &&
      py >= zona.y - margen &&
      py <= zona.y + zona.height + margen
    );
  };

  const distanciaAlCentro = (
    px: number,
    py: number,
    zona: LayoutDeZona,
  ) => {
    const centroX = zona.x + zona.width / 2;
    const centroY = zona.y + zona.height / 2;

    return Math.hypot(
      px - centroX,
      py - centroY,
    );
  };

  const capturarLayoutDeZona =
    (ref: RefObject<LayoutDeZona | null>) =>
    (evento: LayoutChangeEvent) => {
      (
        evento.target as unknown as {
          measure: (
            cb: (
              _fx: number,
              _fy: number,
              w: number,
              h: number,
              px: number,
              py: number,
            ) => void,
          ) => void;
        }
      ).measure((_fx, _fy, w, h, px, py) => {
        ref.current = {
          x: px,
          y: py,
          width: w,
          height: h,
        };
      });
    };

  const resolverTeclasActivas = (
    touches: NativeTouchEvent[],
  ): Set<string> => {
    const teclasNuevas = new Set<string>();

    const zonas = [
      {
        tecla: "Space",
        zona: layoutBotonSalto.current,
      },
      {
        tecla: "ArrowUp",
        zona: layoutBotonArriba.current,
      },
      {
        tecla: "ArrowDown",
        zona: layoutBotonAbajo.current,
      },
      {
        tecla: "ArrowLeft",
        zona: layoutBotonIzquierda.current,
      },
      {
        tecla: "ArrowRight",
        zona: layoutBotonDerecha.current,
      },
    ];

    for (const toque of touches) {
      const { pageX, pageY } = toque;

      const zonasDisponibles = zonas.filter(
        (item) =>
          item.zona &&
          estaEnZona(
            pageX,
            pageY,
            item.zona,
          ),
      );

      if (zonasDisponibles.length === 0) {
        continue;
      }

      // Si una zona ampliada se cruza con otra,
      // elegimos el botón cuyo centro está más cerca.
      const zonaMasCercana =
        zonasDisponibles.reduce(
          (mejor, actual) => {
            if (!mejor) return actual;

            const distanciaActual =
              distanciaAlCentro(
                pageX,
                pageY,
                actual.zona!,
              );

            const distanciaMejor =
              distanciaAlCentro(
                pageX,
                pageY,
                mejor.zona!,
              );

            return distanciaActual < distanciaMejor
              ? actual
              : mejor;
          },
          null as {
            tecla: string;
            zona: LayoutDeZona | null;
          } | null,
        );

      if (zonaMasCercana) {
        teclasNuevas.add(
          zonaMasCercana.tecla,
        );
      }
    }

    return teclasNuevas;
  };

  const procesarToques = (
    evento: GestureResponderEvent,
  ) => {
    const teclasNuevas =
      resolverTeclasActivas(
        evento.nativeEvent.touches,
      );

    if (
      evento.nativeEvent.touches.length === 0
    ) {
      teclasActivasRef.current.forEach(
        (tecla) =>
          alSoltarTecla(tecla),
      );

      teclasActivasRef.current =
        new Set();

      return;
    }

    teclasActivasRef.current.forEach(
      (teclaVieja) => {
        if (
          !teclasNuevas.has(teclaVieja)
        ) {
          alSoltarTecla(
            teclaVieja,
          );
        }
      },
    );

    teclasNuevas.forEach(
      (teclaNueva) => {
        if (
          !teclasActivasRef.current.has(
            teclaNueva,
          )
        ) {
          alPresionarTecla(
            teclaNueva,
          );
        }
      },
    );

    teclasActivasRef.current =
      teclasNuevas;
  };

  return {
    layoutDpad,
    layoutBotonSalto,
    layoutBotonArriba,
    layoutBotonAbajo,
    layoutBotonIzquierda,
    layoutBotonDerecha,
    capturarLayoutDeZona,
    procesarToques,
  };
};

export default useControlesDeGamepad;