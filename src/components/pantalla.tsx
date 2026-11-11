import { StyleSheet, Text, View } from "react-native";

export default function Pantalla({
  arriba,
  grande,
  espacio,
  textoArriba,
  textoGrande,
}: {
  arriba: string;
  grande: string;
  espacio: number;
  textoArriba: number;
  textoGrande: number;
}) {
  return (
    <View style={[styles.globo, { margin: espacio, padding: espacio }]}>
      <Text style={[styles.arriba, { fontSize: textoArriba }]} numberOfLines={1}>
        {arriba}
      </Text>
      <Text
        style={[styles.grande, { fontSize: textoGrande }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
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
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  arriba: {
    color: "#555",
    fontWeight: "700",
    marginBottom: 4,
  },
  grande: {
    color: "#000",
    fontWeight: "900",
  },
});
