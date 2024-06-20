import {StyleSheet,View,Text} from "@react-pdf/renderer"

const borderColor = 'black'
const styles = StyleSheet.create({
    fila: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    descricion: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
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

export default function TablaFooter(){
    const total = items.map((item:any)=> item.qty*item.rate).reduce((accumulator,currentValue)=>accumulator+currentValue,0)
    return(
        <View style={styles.fila}>
            <Text style={styles.descricion}>TOTAL</Text>
            <Text style={styles.total}>{total.toFixed(2)}</Text>
        </View>
    )
}