import { View } from "@react-pdf/renderer";
import TablaHeader from "./TablaHeader";
import TablaDataRow from "./TablaDataRow";
import TablaFooter from "./TablaFooter";
import MensajeTabla from "./MensajeTabla";

export default function TablaPDF(){
    return(
        <View style={{marginTop:15}}>
          <TablaHeader />
          <TablaDataRow />
          <TablaFooter />
          <MensajeTabla />
        </View>
    )
}