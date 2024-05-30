import { Button, Grid } from "@mui/material";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import { editArticuloInsumo, getAllInsumos } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaInsumos from "./ItemGrillaInsumos";
import { useState } from "react";
import { Edit, Info } from "@mui/icons-material";
import AgregarInsumoModal from "./AgregarInsumoModal";

interface GrillaProps {
  busqueda: string;
}
export default function GrillaInsumos({ busqueda }: GrillaProps) {
  //const idSucursal = 1;
  const { data: insumos } = getAllInsumos();
  const [editingInsumo, setEditingInsumo] = useState<ArticuloInsumo | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  //const [openInfo, setOpenInfo] = useState(false);

  const handleOpenEditar = (insumo: ArticuloInsumo) => {
    setEditingInsumo(insumo);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingInsumo(null);
    setOpenEditar(false);
  };
  /*
  const handleOpenInfo = (insumo: ArticuloInsumo) => {
    setEditingArtMan(artMan);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setEditingArtMan(null);
    setOpenInfo(false);
  };*/

  const handleSubmit = (insumo: ArticuloInsumo) => {
    if (editingInsumo != null) {
      editArticuloInsumo(insumo);
      handleCloseEditar();
    }
  };

  const insumosFiltrados = insumos?.filter((item: ArticuloInsumo) => {
    return (
      busqueda === "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>
        {insumosFiltrados?.map((item: ArticuloInsumo) => (
          <ItemGrillaInsumos
            denominacion={item.denominacion}
            stockActual={"Stock actual: " + item.stockActual + " " + item.unidadMedida.denominacion}
            precioCompra={"Precio de compra: $" + item.precioCompra}
            urlImagen={item.imagenes[0].url}
          >
            <Button size="small" variant="contained" color="info" startIcon={<Info />} /*onClick={() => handleOpenInfo(item)}*/>Info</Button>
            <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Editar</Button>
          </ItemGrillaInsumos>
        ))}
      </Grid>
      {editingInsumo && (
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
