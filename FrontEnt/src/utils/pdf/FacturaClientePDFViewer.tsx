import { PDFViewer } from "@react-pdf/renderer";
import FacturaClientePDF from "./FacturaClientePDF";

export default function FacturaClientePDFViewer(){
    return(
        <PDFViewer style={{width:"100vw",height:"100vh"}}>
            <FacturaClientePDF />
        </PDFViewer>
    )
}