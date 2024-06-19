import { StyleSheet, View,Text } from "@react-pdf/renderer";
import { Fragment } from "react/jsx-runtime";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "orange",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  descripcion: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize:"12pt"
  },
  cantidad: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize:"12pt"
  },
  precio: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize:"12pt"
  },
  subTotal: {
    width: "15%",
    fontSize:"12pt",
  },
  fila: {
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
});
const items = [
  {
    sno: 1,
    desc: "ad sunt culpa occaecat qui",
    qty: 5,
    rate: 405,
  },
  {
    sno: 2,
    desc: "cillum quis sunt qui aute",
    qty: 5,
    rate: 373,
  },
  {
    sno: 3,
    desc: "ea commodo labore culpa irure",
    qty: 5,
    rate: 458,
  },
  {
    sno: 4,
    desc: "nisi consequat et adipisicing dolor",
    qty: 10,
    rate: 725,
  },
  {
    sno: 5,
    desc: "proident cillum anim elit esse",
    qty: 4,
    rate: 141,
  },
];

export default function TablaDataRow() {
  const filas = items.map((item: any) => 
  <View style={styles.fila} key={item.sno.toString()}>
    <Text style={styles.cantidad}>{item.qty}</Text>
    <Text style={styles.descripcion}>{item.desc}</Text>
    <Text style={styles.precio}>{item.rate}</Text>
    <Text style={styles.subTotal}>{item.rate*item.qty}</Text>
  </View>
  );
  return(<Fragment>{filas}</Fragment>)
}
