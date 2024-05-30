import { Button, Grid } from "@mui/material";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import { editArticuloManufacturado, getAllArticulosManufacturados } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaProducto from "./ItemGrillaProducto";
import { useState } from "react";
import AgregarProductoModal from "./AgregarProductoModal";
import { Edit, Info } from "@mui/icons-material";

interface GrillaProductoTypes {
  busqueda: string;
}

export default function GrillaProducto({ busqueda }: GrillaProductoTypes) {
  const { data: articuloManufacturados } = getAllArticulosManufacturados();
  const [editingArtMan, setEditingArtMan] = useState<ArticuloManufacturado | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  //const [openInfo, setOpenInfo] = useState(false);


  const handleOpenEditar = (artMan: ArticuloManufacturado) => {
    setEditingArtMan(artMan);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingArtMan(null);
    setOpenEditar(false);
  };
  /*
  const handleOpenInfo = (artMan: ArticuloManufacturado) => {
    setEditingArtMan(artMan);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setEditingArtMan(null);
    setOpenInfo(false);
  };*/

  const handleSubmit = (articuloM: ArticuloManufacturado) => {
    if (editingArtMan != null) {
      editArticuloManufacturado(articuloM);
      handleCloseEditar();
    }
  };

  const artManuFiltrados = articuloManufacturados?.filter(
    (item: ArticuloManufacturado) => {
      return (
        busqueda == "" ||
        item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  );
  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>
        {artManuFiltrados?.map((item: ArticuloManufacturado) => (
          <ItemGrillaProducto
            key={item.id}
            nombre={item.denominacion}
            urlImagen={item.imagenes[0].url}
            precio={"$" + item.precioVenta + ".00"}
            tiempoCoccion={"Tiempo de cocción estimado: " + item.tiempoEstimadoMinutos + " minutos."}
          >
            <Button size="small" variant="contained" color="info" startIcon={<Info />} /*onClick={() => handleOpenInfo(item)}*/>Info</Button>
            <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Editar</Button>
          </ItemGrillaProducto>
        ))}
      </Grid>
      {editingArtMan && (
        <AgregarProductoModal
          open={openEditar}
          onClose={handleCloseEditar}
          onSubmit={handleSubmit}
          iArticuloM={editingArtMan}
        />
      )}
    </>

  );
}
