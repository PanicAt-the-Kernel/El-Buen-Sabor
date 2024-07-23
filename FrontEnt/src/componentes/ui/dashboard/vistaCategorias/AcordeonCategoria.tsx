import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { Edit, ExpandMore } from "@mui/icons-material";
import { editCategoria, editCategoriaHija, getSubCategoriasPadreIdSucursal } from "../../../../servicios/CategoriaService";
import { localSession } from "../../../../servicios/localSession";
import { useState } from "react";
import AgregarCategoriaModal from "./AgregarCategoriaModal";
import EditarSubCategModal from "./EditarSubCategModal";
import EditarSucursalesModal from "./EditarSucursalesModal";
import BotonAgregarSubCategoria from "./BotonAgregarSubCategoria";

interface AcordeonCategoriaTypes {
  categoria: Categoria;
}

export default function AcordeonCategoria({ categoria,
}: AcordeonCategoriaTypes) {
  const { data: subCategorias } = getSubCategoriasPadreIdSucursal(categoria.id, localSession.getSucursal("sucursal").id);
  if (subCategorias) categoria.subCategorias = subCategorias;
  const [openNombre, setOpenNombre] = useState(false);
  const [openSubCategorias, setOpenSubCategorias] = useState(false);
  const [openSucursales, setOpenSucursales] = useState(false);
  const [openNombreSubCat, setOpenNombreSubCat] = useState(false);
  const [editingSubCat, setEditingSubCat] = useState<Categoria | null>(null);

  const handleOpenNombre = () => setOpenNombre(true);
  const handleOpenSubCategorias = () => setOpenSubCategorias(true);
  const handleOpenSucursales = () => setOpenSucursales(true);
  const handleOpenNombreSubCat = (subcat: Categoria) => {
    setEditingSubCat(subcat);
    setOpenNombreSubCat(true);
  };

  const handleClose = () => {
    setOpenNombre(false);
    setOpenSubCategorias(false);
    setOpenSucursales(false);
    setOpenNombreSubCat(false);
    setEditingSubCat(null);
  };

  const handleSubmit = (categoria: Categoria) => {
    //if (subCategorias) categoria.subCategorias = subCategorias;
    console.log(categoria);
    editCategoria(categoria);
    handleClose();
  };

  const handleSubmitSubCat = (categoria: Categoria) => {
    if (editingSubCat != null) {
      console.log(categoria);
      editCategoriaHija(categoria);
      handleClose();
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5" fontWeight={'bold'}>{categoria.denominacion}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={() => handleOpenNombre()} endIcon={<Edit />} sx={{ marginTop: -7, marginLeft: -1 }}>
          Editar Nombre
        </Button>
        <Button onClick={() => handleOpenSucursales()} endIcon={<Edit />} sx={{ marginTop: -7 }}>
          Editar Sucursales
        </Button>
        <Typography variant="h6">Subcategorías</Typography>
        <List>
          {subCategorias?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (
            <ListItem>
              <Button onClick={() => handleOpenNombreSubCat(item)} endIcon={<Edit />} />
              <Typography variant="body1">{item.denominacion}</Typography>
            </ListItem>
          ))}
        </List>
        <BotonAgregarSubCategoria categoriaPadre={categoria} />
        <Button onClick={() => handleOpenSubCategorias()} endIcon={<Edit />}>
          Activar/Desactivar Subcategorías
        </Button>
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
      {openNombreSubCat && editingSubCat && (
        <AgregarCategoriaModal
          open={openNombreSubCat}
          onClose={handleClose}
          onSubmit={handleSubmitSubCat}
          iCategoria={editingSubCat}
          texto={"Editar Subcategoría"}
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
