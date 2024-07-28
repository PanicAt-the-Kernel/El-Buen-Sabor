import ArticuloInsumo from "../entidades/ArticuloInsumo";

export function controlNivelStockInsumo(insumo:ArticuloInsumo):number{
    let stockActual=insumo.stocksInsumo[0].stockActual;
    let stockMaximo=insumo.stocksInsumo[0].stockMaximo;
    if(stockActual<=(stockMaximo/2) && stockActual>=(stockMaximo/3)){
        //Alerta Baja con Stock Medio
        return 1;
    }else if(stockActual<=(stockMaximo/3) && stockActual>=(stockMaximo/4)){
        //Alerta Media con Stock a 1/3
        return 2;
    }else if(stockActual<=(stockMaximo/4)){
        //Alerta Maxima con stock a 1/4
        return 3;
    }
    return 0;
}