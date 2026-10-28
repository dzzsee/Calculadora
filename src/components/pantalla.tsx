import { StyleSheet, Text, View } from "react-native";

// Componente de presentación: muestra el texto de arriba y el número grande
// dentro de un globo de cómic con borde negro
export default function Pantalla({
  arriba,
  grande,
}: {
  arriba: string;
  grande: string;
}) {
  return (
    <View style={styles.globo}>
      <Text style={styles.arriba} numberOfLines={1}>
        {arriba}
      </Text>
      <Text style={styles.grande} numberOfLines={1} adjustsFontSizeToFit>
        {grande}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  globo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 16,
    padding: 8,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  arriba: {
    color: "#555",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  grande: {
    color: "#000",
    fontSize: 60,
    fontWeight: "900",
  },
});
