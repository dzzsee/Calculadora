import { StyleSheet, View } from "react-native";
import type { ConfigBoton } from "../tipos";
import Boton from "./boton";

export default function Teclado<A>({
  filas,
  onAccion,
  espacio,
  altoBoton,
  textoBoton,
}: {
  filas: ConfigBoton<A>[][];
  onAccion: (accion: A) => void;
  espacio: number;
  altoBoton: number;
  textoBoton: number;
}) {
  return (
    <View style={[styles.teclado, { padding: espacio, gap: espacio }]}>
      {filas.map((fila, i) => (
        <View key={i} style={[styles.fila, { gap: espacio }]}>
          {fila.map((boton, j) => (
            <Boton
              key={j}
              texto={boton.texto}
              fondo={boton.fondo}
              colorTexto={boton.colorTexto}
              alto={altoBoton}
              tamañoTexto={textoBoton}
              onPress={() => onAccion(boton.accion)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: {},
  fila: {
    flexDirection: "row",
  },
});
