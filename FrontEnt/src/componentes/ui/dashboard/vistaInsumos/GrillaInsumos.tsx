import { Button, Checkbox, CircularProgress, FormControlLabel, Grid } from "@mui/material";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import { editArticuloInsumo, getInsumosPorSucursal } from "../../../../servicios/ArticuloInsumoService";
import ItemGrillaInsumos from "./ItemGrillaInsumos";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import AgregarInsumoModal from "./AgregarInsumoModal";
import { localSession } from "../../../../servicios/localSession";

interface GrillaProps {
  busqueda: string;
}
export default function GrillaInsumos({ busqueda }: GrillaProps) {
  const { data: insumos,isLoading,error } = getInsumosPorSucursal(localSession.getSucursal('sucursal').id);
  const [editingInsumo, setEditingInsumo] = useState<ArticuloInsumo | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);

  if(isLoading){
    return(
      <CircularProgress />
    )
  }
  if(error){
    return(
      <h1>Ocurrio un error al cargar los insumos</h1>
    )
  }

  const handleOpenEditar = (insumo: ArticuloInsumo) => {
    setEditingInsumo(insumo);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingInsumo(null);
    setOpenEditar(false);
  };

  const handleSubmit = (insumo: ArticuloInsumo) => {
    if (editingInsumo != null) {
      editArticuloInsumo(insumo);
      handleCloseEditar();
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLowStock(event.target.checked);
  };



  let insumosFiltrados = insumos?.filter((item: ArticuloInsumo) => {
    const matchesSearch = busqueda === "" || item.denominacion.toLowerCase().includes(busqueda.toLowerCase());
    const matchesLowStock = !showLowStock || item.stocksInsumo[0].stockActual < item.stocksInsumo[0].stockMinimo;
    return matchesSearch && matchesLowStock;
  });


  const insumosFiltradosConStock = insumosFiltrados.map(insumo => {
    const stockFiltrado = insumo.stocksInsumo.find(stock => stock.sucursal.id === localSession.getSucursal('sucursal').id);

    return {
      ...insumo,
      stocksInsumo: stockFiltrado ? [stockFiltrado] : [] // Retorna un array con el stock filtrado o vacío si no se encuentra
    };
  });

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>
        {insumosFiltradosConStock?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: ArticuloInsumo) => (
            <ItemGrillaInsumos
              key={item.id}
              denominacion={item.denominacion}
              stockActual={"Stock actual: " + item.
                  stocksInsumo[0].stockActual + " " + item.unidadMedida.denominacion.toLowerCase()}
              precioCompra={"Precio de compra: $" + item.precioCompra}
              urlImagen={item.imagenes[0].url}
              isLowStock={item.stocksInsumo[0].stockActual < item.stocksInsumo[0].stockMinimo+5}
            >
              <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Ver Info / Editar</Button>
            </ItemGrillaInsumos>
          ))}
      </Grid>
      {openEditar && editingInsumo && (
        <AgregarInsumoModal
          open={openEditar}
          onClose={handleCloseEditar}
          onSubmit={handleSubmit}
          iInsumo={editingInsumo}
        />
      )}
    </>

  );
}
