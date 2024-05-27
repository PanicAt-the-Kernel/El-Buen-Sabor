import { Grid } from "@mui/material";
import { getAllEmpresas } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Empresa from "../../../../entidades/Empresa";
import ItemGrilla from "./ItemGrilla";
import BotonEditarGenerico from "./BotonEditarGenerico";
import BotonInfoGenerico from "./BotonInfoGenerico";

interface GrillaProps {
  busqueda: string;
}

export default function Grilla({ busqueda }: GrillaProps) {
  const { data: empresa } = getAllEmpresas();

  const empresasFiltradas = empresa?.filter((item: Empresa) => {
    return (
      busqueda === "" ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <Grid container sx={{ marginTop: 2}} spacing={1}>
      {empresasFiltradas?.map((item: Empresa) => (
        <ItemGrilla
          nombre={item.nombre}
          descripcion={item.razonSocial}
          urlImagen="/imgs/empresa.jpg"
        >
          <BotonEditarGenerico />
          <BotonInfoGenerico />
        </ItemGrilla>
      ))}
    </Grid>
  );
}
