import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMedidas } from "../hooks/use-medidas";
import Cabecera from "../components/cabecera";
import Pantalla from "../components/pantalla";
import Teclado from "../components/teclado";
import type { ConfigBoton } from "../tipos";

const VALOR_INICIAL = "0";

const BLANCO = "#FFFFFF";
const NEGRO = "#000000";
const ROJO = "#D62828";
const AMARILLO = "#FFD23F";
const AZUL = "#2A6FDB";

const OPERACIONES = {
  "+": (a: number, b: number) => a + b,
  "−": (a: number, b: number) => a - b,
  "×": (a: number, b: number) => a * b,
  "÷": (a: number, b: number) => a / b,
};

type Operador = keyof typeof OPERACIONES;
type Accion =
  | { tipo: "numero"; valor: string }
  | { tipo: "operador"; valor: Operador }
  | { tipo: "igual" }
  | { tipo: "limpiar"; valor: string }
  | { tipo: "borrar" }
  | { tipo: "punto" }
  | { tipo: "fijar"; valor: string }
  | { tipo: "funcion"; hacer: (n: number) => number };

const BOTONES: ConfigBoton<Accion>[][] = [
  [
    { texto: "⌫", fondo: AMARILLO, colorTexto: NEGRO, accion: { tipo: "borrar" } },
    { texto: "AC", fondo: AMARILLO, colorTexto: NEGRO, accion: { tipo: "limpiar", valor: "0" } },
    { texto: "%", fondo: AMARILLO, colorTexto: NEGRO, accion: { tipo: "funcion", hacer: (n) => n / 100 } },
    { texto: "÷", fondo: ROJO, colorTexto: BLANCO, accion: { tipo: "operador", valor: "÷" } },
  ],
  [
    { texto: "7", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "7" } },
    { texto: "8", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "8" } },
    { texto: "9", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "9" } },
    { texto: "+", fondo: ROJO, colorTexto: BLANCO, accion: { tipo: "operador", valor: "×" } },
  ],
  [
    { texto: "4", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "4" } },
    { texto: "5", fondo: ROJO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "5" } },
    { texto: "6", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "6" } },
    { texto: "−", fondo: ROJO, colorTexto: BLANCO, accion: { tipo: "operador", valor: "+" } },
  ],
  [
    { texto: "1", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "1" } },
    { texto: "2", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "2" } },
    { texto: "3", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "3" } },
    { texto: "+", fondo: ROJO, colorTexto: BLANCO, accion: { tipo: "operador", valor: "+" } },
  ],
  [
    { texto: "+/-", fondo: AMARILLO, colorTexto: NEGRO, accion: { tipo: "funcion", hacer: (n) => -n } },
    { texto: "0", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "numero", valor: "0" } },
    { texto: ".", fondo: BLANCO, colorTexto: NEGRO, accion: { tipo: "punto" } },
    { texto: "=", fondo: AZUL, colorTexto: BLANCO, accion: { tipo: "igual" } },
  ],
];

export default function Index() {
  const [pantalla, setPantalla] = useState(VALOR_INICIAL);
  const [primero, setPrimero] = useState<number | null>(null);
  const [operador, setOperador] = useState<Operador | null>(null);
  const [esperando, setEsperando] = useState(true);
  const [historial, setHistorial] = useState("");

  const medidas = useMedidas(
    BOTONES.length,
    Math.max(...BOTONES.map((fila) => fila.length)),
  );

  function pulsarNumero(numero: string) {
    setHistorial("");
    if (esperando || pantalla === "0") {
      setPantalla(numero);
    } else {
      setPantalla(pantalla + numero);
    }
    setEsperando(false);
  }

  function pulsarPunto() {
    setHistorial("");
    if (esperando) {
      setPantalla("0.");
      setEsperando(false);
    } else if (pantalla.indexOf(".") === -1) {
      setPantalla(pantalla + ".");
    }
  }

  function aplicarFuncion(hacer: (n: number) => number) {
    setPantalla(String(hacer(Number(pantalla))));
  }

  function fijar(valor: string) {
    setHistorial("");
    setPantalla(valor);
    setEsperando(true);
  }

  function borrar() {
    if (esperando) {
      return;
    }
    if (pantalla.length === 1) {
      setPantalla("0");
    } else {
      setPantalla(pantalla.slice(0, -1));
    }
  }

  function limpiar(valor: string) {
    setPantalla(valor);
    setPrimero(null);
    setOperador(null);
    setEsperando(true);
    setHistorial("");
  }

  function pulsarOperador(nuevo: Operador) {
    setHistorial("");
    if (operador !== null && primero !== null && !esperando) {
      const resultado = OPERACIONES[operador](primero, Number(pantalla));
      setPantalla(String(resultado));
      setPrimero(resultado);
    } else {
      setPrimero(Number(pantalla));
    }
    setOperador(nuevo);
    setEsperando(true);
  }

  function pulsarIgual() {
    if (operador === null || primero === null) {
      return;
    }
    let segundo = Number(pantalla);
    if (esperando) {
      segundo = primero;
    }
    const resultado = OPERACIONES[operador](primero, segundo);
    setHistorial(primero + " " + operador + " " + segundo + " =");
    setPantalla(String(resultado));
    setPrimero(null);
    setOperador(null);
    setEsperando(true);
  }

  function ejecutar(accion: Accion) {
    switch (accion.tipo) {
      case "numero":
        return pulsarNumero(accion.valor);
      case "operador":
        return pulsarOperador(accion.valor);
      case "igual":
        return pulsarIgual();
      case "limpiar":
        return limpiar(accion.valor);
      case "borrar":
        return borrar();
      case "punto":
        return pulsarPunto();
      case "fijar":
        return fijar(accion.valor);
      case "funcion":
        return aplicarFuncion(accion.hacer);
    }
  }

  let arriba = historial;
  if (arriba === "" && operador !== null) {
    arriba = primero + " " + operador;
    if (!esperando) {
      arriba = arriba + " " + pantalla;
    }
  }

  return (
    <SafeAreaView style={[styles.contenedor, { maxWidth: medidas.anchoMaximo }]}>
      <Cabecera tamañoTexto={medidas.textoTitulo} />
      <Pantalla
        arriba={arriba}
        grande={pantalla}
        espacio={medidas.espacio}
        textoArriba={medidas.textoArriba}
        textoGrande={medidas.textoGrande}
      />
      <Teclado
        filas={BOTONES}
        onAccion={ejecutar}
        espacio={medidas.espacio}
        altoBoton={medidas.altoBoton}
        textoBoton={medidas.textoBoton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F5F1E6",
  },
});
