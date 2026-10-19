import { StyleSheet, Text, View } from "react-native";

// Componente de presentación: solo muestra el texto de arriba y el número grande
export default function Pantalla({
  arriba,
  grande,
}: {
  arriba: string;
  grande: string;
}) {
  return (
    <View style={styles.pantalla}>
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
  pantalla: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 24,
  },
  arriba: {
    color: "#A5A5A5",
    fontSize: 28,
    marginBottom: 4,
  },
  grande: {
    color: "#FFF",
    fontSize: 96,
    fontWeight: "200",
  },
});
