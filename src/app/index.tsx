import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Pantalla from "../components/pantalla";
import Teclado from "../components/teclado";
import type { Operador } from "../tipos";

// Esta pantalla es el "contenedor": guarda el estado y la lógica,
// y se lo pasa a los componentes de presentación por props.
export default function Index() {
  // Lo que se ve grande en la pantalla
  const [pantalla, setPantalla] = useState("0");
  // El primer número de la operación
  const [primero, setPrimero] = useState<number | null>(null);
  // El operador pendiente, o null si no hay ninguno
  const [operador, setOperador] = useState<Operador | null>(null);
  // true cuando lo siguiente que escribas debe reemplazar la pantalla
  const [esperando, setEsperando] = useState(false);
  // Lo que se ve arriba después de pulsar "=", por ejemplo "8 + 5 ="
  const [historial, setHistorial] = useState("");

  // Pulsar un número
  function pulsarNumero(numero: string) {
    setHistorial("");
    if (esperando || pantalla === "0") {
      setPantalla(numero);
    } else {
      setPantalla(pantalla + numero);
    }
    setEsperando(false);
  }

  // Pulsar el punto decimal
  function pulsarPunto() {
    setHistorial("");
    if (esperando) {
      setPantalla("0.");
      setEsperando(false);
    } else if (pantalla.indexOf(".") === -1) {
      setPantalla(pantalla + ".");
    }
  }

  // Cambiar el signo (+/-)
  function cambiarSigno() {
    if (pantalla === "0") {
      return;
    }
    if (pantalla.charAt(0) === "-") {
      setPantalla(pantalla.slice(1));
    } else {
      setPantalla("-" + pantalla);
    }
  }

  // Dividir entre 100 (%)
  function porcentaje() {
    setPantalla(String(Number(pantalla) / 100));
  }

  // Borrar el último dígito (⌫)
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

  // Borrar todo (AC)
  function limpiar() {
    setPantalla("0");
    setPrimero(null);
    setOperador(null);
    setEsperando(false);
    setHistorial("");
  }

  // Hacer la cuenta entre dos números
  function hacerCuenta(a: number, op: Operador, b: number): number {
    if (op === "+") {
      return a + b;
    }
    if (op === "−") {
      return a - b;
    }
    if (op === "×") {
      return a * b;
    }
    return a / b;
  }

  // Pulsar un operador (+, −, × o ÷)
  function pulsarOperador(nuevo: Operador) {
    setHistorial("");
    if (operador !== null && primero !== null && !esperando) {
      // Ya había una operación: la hacemos primero (2 + 3 × ...)
      const resultado = hacerCuenta(primero, operador, Number(pantalla));
      setPantalla(String(resultado));
      setPrimero(resultado);
    } else {
      setPrimero(Number(pantalla));
    }
    setOperador(nuevo);
    setEsperando(true);
  }

  // Pulsar el igual (=)
  function pulsarIgual() {
    if (operador === null || primero === null) {
      return;
    }
    // Si no escribiste segundo número, usamos el primero (5 + = da 10)
    let segundo = Number(pantalla);
    if (esperando) {
      segundo = primero;
    }
    const resultado = hacerCuenta(primero, operador, segundo);
    setHistorial(primero + " " + operador + " " + segundo + " =");
    setPantalla(String(resultado));
    setPrimero(null);
    setOperador(null);
    setEsperando(true);
  }

  // Lo que se ve arriba mientras escribes, por ejemplo "8 + 5"
  let arriba = historial;
  if (arriba === "" && operador !== null) {
    arriba = primero + " " + operador;
    if (!esperando) {
      arriba = arriba + " " + pantalla;
    }
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <Pantalla arriba={arriba} grande={pantalla} />
      <Teclado
        onNumero={pulsarNumero}
        onOperador={pulsarOperador}
        onAC={limpiar}
        onBorrar={borrar}
        onPorcentaje={porcentaje}
        onSigno={cambiarSigno}
        onPunto={pulsarPunto}
        onIgual={pulsarIgual}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    backgroundColor: "#000",
  },
});
