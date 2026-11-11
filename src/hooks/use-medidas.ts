import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PORCION_TECLADO = 0.6;
const ANCHO_MAXIMO = 520;

function categoria(ancho: number, alto: number) {
  if (ancho < 360 || alto < 640) {
    return "chico";
  }
  if (ancho >= 600) {
    return "grande";
  }
  return "mediano";
}

const ESPACIO = { chico: 8, mediano: 12, grande: 16 };

export function useMedidas(filas: number, columnas: number) {
  const { width, height } = useWindowDimensions();
  const margenes = useSafeAreaInsets();

  const tipo = categoria(width, height);
  const espacio = ESPACIO[tipo];
  const ancho = Math.min(width, ANCHO_MAXIMO);
  const alto = height - margenes.top - margenes.bottom;

  const porAncho = (ancho - espacio * 2 - espacio * (columnas - 1)) / columnas;
  const porAlto =
    (alto * PORCION_TECLADO - espacio * 2 - espacio * (filas - 1)) / filas;
  const altoBoton = Math.floor(Math.min(porAncho, porAlto));

  return {
    anchoMaximo: ANCHO_MAXIMO,
    espacio,
    altoBoton,
    textoBoton: Math.round(altoBoton * 0.4),
    textoGrande: Math.round(Math.min(ancho * 0.2, alto * 0.12)),
    textoArriba: Math.round(Math.min(ancho * 0.06, alto * 0.035)),
    textoTitulo: tipo === "chico" ? 18 : tipo === "grande" ? 28 : 22,
  };
}
