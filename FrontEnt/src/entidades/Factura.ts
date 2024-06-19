class Factura {
    eliminado: boolean = false;
    fechaBaja: string = '';
    fechaFacturacion: string = '';
    mpPaymentId: number = 0;
    mpMerchantOrderId: number = 0;
    mpPreferenceId: string = '';
    mpPaymentType: string = '';
    formaPago: string = '';
    totalVenta: number = 0;
}

export default Factura;