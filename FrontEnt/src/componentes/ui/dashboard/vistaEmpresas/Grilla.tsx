import { Button, Grid } from "@mui/material";
import { editEmpresa, getAllEmpresas } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Empresa from "../../../../entidades/Empresa";
import ItemGrilla from "./ItemGrilla";
import { useState } from "react";
import { Edit, Info } from "@mui/icons-material";
import AgregarEmpresaModal from "./AgregarEmpresaModal";
import MostrarSucursalesModal from "./MostrarSucursalesModal";

interface GrillaProps {
  busqueda: string;
}

export default function Grilla({ busqueda }: GrillaProps) {
  const { data: empresa } = getAllEmpresas();
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleSubmit = (nombre: string, razonSocial: string, cuil: number) => {
    //LLAMADA API EDITAR EMPRESA
    if (editingEmpresa != null) {
      editEmpresa(editingEmpresa.id, nombre, razonSocial, cuil);
      handleClose();
    }
  };

  const handleOpenEditar = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenEditar(true);
  };

  const handleOpenInfo = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenInfo(true);
  };

  const handleClose = () => {
    setEditingEmpresa(null);
    setOpenEditar(false);
    setOpenInfo(false);
  };

  const empresasFiltradas = empresa?.filter((item: Empresa) => {
    return (
      busqueda === "" ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Grid container sx={{
        marginTop: 2,
        justifyContent: "center",
        alignItems: "center",
      }} spacing={1}>
        {empresasFiltradas?.map((item: Empresa) => (
          <ItemGrilla
            nombre={item.nombre}
            descripcion={"Razón social: " + item.razonSocial}
            info={"CUIT: " + item.cuil.toString()}
            urlImagen="/imgs/empresa.jpg"
          >
            <Button size="small" variant="contained" color="info" startIcon={<Info />} onClick={() => handleOpenInfo(item)}>Sucursales</Button>
            <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Editar</Button>
          </ItemGrilla>
        ))}
      </Grid>
      {editingEmpresa && (
        <AgregarEmpresaModal
          open={openEditar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingEmpresa.nombre}
          initialRazonSocial={editingEmpresa.razonSocial}
          initialCuil={editingEmpresa.cuil.toString()}
        />
      )}
      {editingEmpresa && (
        <MostrarSucursalesModal
          open={openInfo}
          onClose={handleClose}
          empresa={editingEmpresa}
        />
      )}
    </>
  );
}
