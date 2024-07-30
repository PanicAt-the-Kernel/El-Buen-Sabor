import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { Edit, ExpandMore } from "@mui/icons-material";
import { editCategoria, getSubCategoriasPadreIdSucursal } from "../../../../servicios/CategoriaService";
import { localSession } from "../../../../servicios/localSession";
import { useState } from "react";
import AgregarCategoriaModal from "./AgregarCategoriaModal";
import EditarSubCategModal from "./EditarSubCategModal";
import EditarSucursalesModal from "./EditarSucursalesModal";
import BotonAgregarSubCategoria from "./BotonAgregarSubCategoria";
import EditarSubCateg from "./EditarSubCateg";

interface AcordeonCategoriaTypes {
  categoria: Categoria;
}

export default function AcordeonCategoria({ categoria
}: AcordeonCategoriaTypes) {
  const { data: subCategorias } = getSubCategoriasPadreIdSucursal(categoria.id, localSession.getSucursal("sucursal").id);
  if (subCategorias) categoria.subCategorias = subCategorias;
  const [openNombre, setOpenNombre] = useState(false);
  const [openSubCategorias, setOpenSubCategorias] = useState(false);
  const [openSucursales, setOpenSucursales] = useState(false);

  const handleOpenNombre = () => setOpenNombre(true);
  const handleOpenSucursales = () => setOpenSucursales(true);

  const handleClose = () => {
    setOpenNombre(false);
    setOpenSubCategorias(false);
    setOpenSucursales(false);
  };

  const handleSubmit = async (categoria: Categoria) => { 
    console.log(categoria);
    await editCategoria(categoria);
    window.location.reload();
    handleClose();
  };

  return (
    <Accordion sx={{backgroundColor:'#fffdef'}}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5" fontWeight={'bold'}>{categoria.denominacion}</Typography>
        <Button onClick={() => handleOpenNombre()} endIcon={<Edit />} /*sx={{ marginTop: -7, marginLeft: -1 }}*/>
          Nombre
        </Button>
        <Button onClick={() => handleOpenSucursales()} endIcon={<Edit />} /*sx={{ marginTop: -7 }}*/>
          Sucursales
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <EditarSubCateg iCategoria={categoria} />
        <BotonAgregarSubCategoria categoriaPadre={categoria} />
      </AccordionDetails>
      {openNombre && (
        <AgregarCategoriaModal
          open={openNombre}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iCategoria={categoria}
          texto={"Editar Categoría"}
        />
      )}
      {openSubCategorias && (
        <EditarSubCategModal
          open={openSubCategorias}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iCategoria={categoria}
        />
      )}
      {openSucursales && (
        <EditarSucursalesModal
          open={openSucursales}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iCategoria={categoria}
        />
      )}
    </Accordion>
  );
}
