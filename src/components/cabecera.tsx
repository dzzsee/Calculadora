import { StyleSheet, Text, View } from "react-native";

export default function Cabecera({ tamañoTexto }: { tamañoTexto: number }) {
  return (
    <View style={styles.cabecera}>
      <Text style={[styles.titulo, { fontSize: tamañoTexto }]}>CALCULADORA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  titulo: {
    fontWeight: "900",
    color: "#000",
    letterSpacing: 2,
  },
});
