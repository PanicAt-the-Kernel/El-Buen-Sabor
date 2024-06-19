
import {
  Page,
  Document,
  View,
  Image,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import TablaPDF from "./TablaPDF";

const documentStyles = StyleSheet.create({
  spacing: { backgroundColor: "orange", color: "orange" },
  textPrimary: { fontSize: 12, color: "gray" },
  textSecondary: { fontSize: 10, color: "gray" },
  header: { backgroundColor: "#f3f3f3", padding: 10 },
  stackRow: { flexDirection: "row", justifyContent: "space-between" },
  stackColumn: { flexDirection: "column", justifyContent: "space-between" },
  flexRow: { flexDirection: "row" },
  flexColumn: { flexDirection: "column" },
  container: { flexDirection: "column", padding: 10 },
});

export default function FacturaClientePDF() {
  return (
    <Document>
      <Page size="A4" orientation="portrait">
        {/*CABECERA*/}
        <View style={documentStyles.spacing}>
          <Text>SPACING</Text>
        </View>
        <View style={[documentStyles.header,{borderBottom:"1px solid grey"}]}>
          <View style={documentStyles.stackRow}>
            <View style={documentStyles.flexRow}>
              <Image
                src={{ uri: "/imgs/IconoColor.png", method: "GET" }}
                style={{ width: 70 }}
              />
              <View style={documentStyles.flexColumn}>
                <Text>Nombre Empresa</Text>
                <Text style={documentStyles.textPrimary}>CUIL:123456</Text>
                <Text style={{ fontSize: 12 }}>Nombre Sucursal</Text>
                <Text style={documentStyles.textSecondary}>
                  Calle Falsa 123
                </Text>
                <Text style={documentStyles.textSecondary}>
                  Lujan de Cuyo, Mendoza
                </Text>
              </View>
            </View>
            <View style={documentStyles.flexColumn}>
              <Text>Factura B</Text>
              <Text style={documentStyles.textSecondary}>
                Fecha de Emision: 06/06/2006
              </Text>
              <Text style={documentStyles.textSecondary}>
                Numero Factura:123456
              </Text>
            </View>
          </View>
        </View>

        {/*CUERPO PDF*/}
        <View style={documentStyles.container}>
          <View style={[documentStyles.stackRow,{border:"1px solid grey",padding:4}]}>
            <View style={documentStyles.stackColumn}>
              <Text style={{ color: "blue" }}>Datos del Cliente</Text>
              <View style={[documentStyles.stackColumn,documentStyles.textSecondary]}>
                <Text>Nombre: Debora Meltrozo</Text>
                <Text>DNI: 12345678</Text>
                <Text>Telefono: 261-123456</Text>
                <Text>Email: ejemplo@ejemplo.com.ar</Text>
              </View>
            </View>

            <View style={documentStyles.stackColumn}>
              <Text style={{ color: "red" }}>Datos de Envio</Text>
              <View style={[documentStyles.stackColumn,documentStyles.textSecondary]}>
                <Text>Direccion: Calle Falsa 321</Text>
                <Text>Piso: 3, Departamento: 5</Text>
                <Text>Codigo Postal: 5539</Text>
                <Text>Localidad: Lujan de Cuyo, Mendoza</Text>
              </View>
            </View>
          </View>
          <TablaPDF />  
        </View>
      </Page>
    </Document>
  );
}
