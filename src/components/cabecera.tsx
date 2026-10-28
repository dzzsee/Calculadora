import { StyleSheet, Text, View } from "react-native";

export default function Cabecera() {
  return (
    <View style={styles.cabecera}>
      <View>
        <Text style={styles.titulo}>CALCULADORA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingTop: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 2,
  },
});
