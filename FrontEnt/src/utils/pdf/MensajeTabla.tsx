import { StyleSheet,View,Text } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems:"center",
    justifyContent:"center",

  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default function MensajeTabla() {
    return(
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Gracias por tu compra!</Text>
        </View>
    )
}
