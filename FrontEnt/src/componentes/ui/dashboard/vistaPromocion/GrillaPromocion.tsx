import { Button, Grid } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import { editPromocion, getPromocionesIdSucursal } from "../../../../servicios/PromocionService";
import ItemGrillaPromocion from "./ItemGrillaPromocion";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import AgregarPromocionModal from "./AgregarPromocionModal";
import { localSession } from "../../../../servicios/localSession";

interface GrillaPromocionTypes {
  busqueda: string;
}

export default function GrillaPromocion({ busqueda }: GrillaPromocionTypes) {
  const idSucursal = localSession.getSucursal("sucursal").id;
  const { data: promociones } = getPromocionesIdSucursal(idSucursal);
  const [editingProm, setEditingProm] = useState<Promocion | null>(null);
  const [openEditar, setOpenEditar] = useState(false);

  const handleOpenEditar = (promocion: Promocion) => {
    setEditingProm(promocion);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingProm(null);
    setOpenEditar(false);
  };

  const handleSubmit = (promocion: Promocion) => {
    if (editingProm != null) {
      editPromocion(promocion);
      handleCloseEditar();
    }
  };

  const promocionesFiltradas = promociones?.filter((item: Promocion) => {
    return (
      busqueda === "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        {promocionesFiltradas?.length==0 && (<h1>No hay promociones disponibles</h1>)}
        {promocionesFiltradas?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
        .map((item: Promocion) => (
          <ItemGrillaPromocion
            key={item.id}
            item={item}
          >
            <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Ver Info / Editar</Button>
          </ItemGrillaPromocion>
        ))}
      </Grid>
      {editingProm && openEditar && (
        <AgregarPromocionModal
          open={openEditar}
          onClose={handleCloseEditar}
          onSubmit={handleSubmit}
          iPromocion={editingProm}
        />
      )}
    </>
  );
}
