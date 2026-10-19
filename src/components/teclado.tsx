import { StyleSheet, View } from "react-native";
import Boton from "./boton";
import type { Operador } from "../tipos";

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
        <Boton texto="⌫" fondo="#A5A5A5" colorTexto="#000" onPress={onBorrar} />
        <Boton texto="AC" fondo="#A5A5A5" colorTexto="#000" onPress={onAC} />
        <Boton texto="%" fondo="#A5A5A5" colorTexto="#000" onPress={onPorcentaje} />
        <Boton texto="÷" fondo="#FF9F0A" colorTexto="#FFF" onPress={() => onOperador("÷")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="7" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("7")} />
        <Boton texto="8" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("8")} />
        <Boton texto="9" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("9")} />
        <Boton texto="×" fondo="#FF9F0A" colorTexto="#FFF" onPress={() => onOperador("×")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="4" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("4")} />
        <Boton texto="5" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("5")} />
        <Boton texto="6" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("6")} />
        <Boton texto="−" fondo="#FF9F0A" colorTexto="#FFF" onPress={() => onOperador("−")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="1" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("1")} />
        <Boton texto="2" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("2")} />
        <Boton texto="3" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("3")} />
        <Boton texto="+" fondo="#FF9F0A" colorTexto="#FFF" onPress={() => onOperador("+")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="+/-" fondo="#A5A5A5" colorTexto="#000" onPress={onSigno} />
        <Boton texto="0" fondo="#333" colorTexto="#FFF" onPress={() => onNumero("0")} />
        <Boton texto="." fondo="#333" colorTexto="#FFF" onPress={onPunto} />
        <Boton texto="=" fondo="#FF9F0A" colorTexto="#FFF" onPress={onIgual} />
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
