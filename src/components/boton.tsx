import { Pressable, StyleSheet, Text } from "react-native";

// Componente de presentación: solo muestra un botón.
// No sabe qué hace; recibe el texto, los colores y la función al pulsar.
export default function Boton({
  texto,
  fondo,
  colorTexto,
  onPress,
}: {
  texto: string;
  fondo: string;
  colorTexto: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.boton, { backgroundColor: fondo }]}>
      <Text style={[styles.texto, { color: colorTexto }]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 36,
  },
});
