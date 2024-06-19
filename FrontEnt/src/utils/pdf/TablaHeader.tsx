import { View,StyleSheet,Text } from "@react-pdf/renderer";

const borderColor = 'black'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        backgroundColor: 'orange',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize:"12pt"
    },
    descripcion: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12pt"
    },
    cantidad: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize:"12pt"
    },
    precio: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subTotal: {
        width: '15%',
        fontSize:"12pt"
    },
  });


export default function TablaHeader(){
    return(
        <View style={styles.container}>
            <Text style={styles.cantidad}>Cantidad</Text>
            <Text style={styles.descripcion}>Descripcion</Text>
            <Text style={styles.precio}>Precio Unitario</Text>
            <Text style={styles.subTotal}>Sub Total</Text>
        </View>
    )
}