import { StyleSheet, View } from "react-native";
import Boton from "./boton";
import type { Operador } from "../tipos";

// Colores estilo Snoopy
const BLANCO = "#FFFFFF";
const NEGRO = "#000000";
const ROJO = "#D62828"; // casita de Snoopy
const AMARILLO = "#FFD23F"; // Woodstock
const AZUL = "#2A6FDB"; // el igual

// Componente de presentación: solo dibuja las teclas.
// Las funciones que llegan por props son las que hace index.tsx.
export default function Teclado({
  onNumero,
  onOperador,
  onAC,
  onBorrar,
  onPorcentaje,
  onSigno,
  onPunto,
  onIgual,
}: {
  onNumero: (numero: string) => void;
  onOperador: (operador: Operador) => void;
  onAC: () => void;
  onBorrar: () => void;
  onPorcentaje: () => void;
  onSigno: () => void;
  onPunto: () => void;
  onIgual: () => void;
}) {
  return (
    <View style={styles.teclado}>
      <View style={styles.fila}>
        <Boton texto="⌫" fondo={AMARILLO} colorTexto={NEGRO} onPress={onBorrar} />
        <Boton texto="AC" fondo={AMARILLO} colorTexto={NEGRO} onPress={onAC} />
        <Boton texto="%" fondo={AMARILLO} colorTexto={NEGRO} onPress={onPorcentaje} />
        <Boton texto="÷" fondo={ROJO} colorTexto={BLANCO} onPress={() => onOperador("÷")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="7" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("7")} />
        <Boton texto="8" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("8")} />
        <Boton texto="9" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("9")} />
        <Boton texto="×" fondo={ROJO} colorTexto={BLANCO} onPress={() => onOperador("×")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="4" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("4")} />
        <Boton texto="5" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("5")} />
        <Boton texto="6" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("6")} />
        <Boton texto="−" fondo={ROJO} colorTexto={BLANCO} onPress={() => onOperador("−")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="1" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("1")} />
        <Boton texto="2" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("2")} />
        <Boton texto="3" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("3")} />
        <Boton texto="+" fondo={ROJO} colorTexto={BLANCO} onPress={() => onOperador("+")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="+/-" fondo={AMARILLO} colorTexto={NEGRO} onPress={onSigno} />
        <Boton texto="0" fondo={BLANCO} colorTexto={NEGRO} onPress={() => onNumero("0")} />
        <Boton texto="." fondo={BLANCO} colorTexto={NEGRO} onPress={onPunto} />
        <Boton texto="=" fondo={AZUL} colorTexto={BLANCO} onPress={onIgual} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: {
    padding: 16,
    gap: 12,
  },
  fila: {
    flexDirection: "row",
    gap: 12,
  },
});
