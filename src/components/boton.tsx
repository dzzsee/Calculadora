import { Pressable, StyleSheet, Text } from "react-native";

export default function Boton({
  texto,
  fondo,
  colorTexto,
  alto,
  tamañoTexto,
  onPress,
}: {
  texto: string;
  fondo: string;
  colorTexto: string;
  alto: number;
  tamañoTexto: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.boton,
        { backgroundColor: fondo, height: alto, borderRadius: alto * 0.26 },
      ]}
    >
      <Text style={[styles.texto, { color: colorTexto, fontSize: tamañoTexto }]}>
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontWeight: "900",
  },
});
