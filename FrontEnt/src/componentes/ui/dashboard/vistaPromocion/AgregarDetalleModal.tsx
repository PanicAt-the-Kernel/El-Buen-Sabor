import { useState } from "react";
import { Modal, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, Button, Paper } from "@mui/material";
import PromocionDetalle from "../../../../entidades/PromocionDetalle";
import {
  getArticulosManufacturadosIdSucursal
} from "../../../../servicios/ArticuloManufacturadoService";
import { getAllArticuloInsumoNoElab } from "../../../../servicios/ArticuloInsumoService";
import Articulo from "../../../../entidades/Articulo";
import {localSession} from "../../../../servicios/localSession.ts";

interface AgregarArticuloModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (articulos: PromocionDetalle[]) => void;
  filasActuales: PromocionDetalle[];
}

function AgregarArticuloModal({
  open,
  onClose,
  onSubmit,
  filasActuales,
}: AgregarArticuloModalProps) {
  const [selectedArticulos, setSelectedArticulos] = useState<PromocionDetalle[]>([]);
  const { data: articulos } = getArticulosManufacturadosIdSucursal(localSession.getSucursal("sucursal").id);
  const { data: insumosNoElab } = getAllArticuloInsumoNoElab(localSession.getSucursal("sucursal").id);
  const articulosCombinados = [...(articulos || []), ...(insumosNoElab || [])];
  const detallesActivos = filasActuales.filter(fila => fila.eliminado === false);
  const articulosSinActivos = articulosCombinados.filter(articulo => !detallesActivos.map(fila => fila.articulo.id).includes(articulo.id)); //No mostrar artículos activos
  //Búsqueda
  const [nombreArticulo, setNombreArticulo] = useState<string>("");
  const articulosFiltrados = articulosSinActivos?.filter((item: Articulo) => {
    return (
      (nombreArticulo === "" ||
        item.denominacion
          .toLowerCase()
          .includes(nombreArticulo.toLowerCase())) &&
      !item.eliminado
    );
  });

  const handleSelectArticulo = (articuloSel: Articulo) => {
    const estaEliminado = filasActuales.some(
      (fila) => fila.articulo.id === articuloSel.id && fila.eliminado == true
    );

    const index = selectedArticulos.findIndex(
      (selected) => selected.articulo.id === articuloSel.id
    );

    if (index == -1) {
      if (!estaEliminado) {
        const nuevoDetalle: PromocionDetalle = new PromocionDetalle();
        nuevoDetalle.articulo = articuloSel;
        nuevoDetalle.articuloId = articuloSel.id;
        nuevoDetalle.cantidad = 1;
        nuevoDetalle.fechaBaja = "9999-12-31";
        setSelectedArticulos([...selectedArticulos, nuevoDetalle]);
      } else {
        const filaEditada = filasActuales.find((fila) => fila.articulo.id === articuloSel.id);
        if (filaEditada) {
          const filaEditadaCopia = { ...filaEditada, eliminado: false, fechaBaja: "9999-12-31" };
          setSelectedArticulos([...selectedArticulos, filaEditadaCopia]);
        }
      }
    } else {
      setSelectedArticulos((prevState) => {
        const updatedArticulos = [...prevState];
        updatedArticulos.splice(index, 1);
        return updatedArticulos;
      });
    }
    console.log("Despues de seleccionar")
    console.log(selectedArticulos);
    console.log(filasActuales);
  };

  const handleSubmit = () => {
    const selectedIds = selectedArticulos.map((detalle) => detalle.id);

    const filasSinEditar = filasActuales.filter(
      (detalle) => !selectedIds.includes(detalle.id) || detalle.id === 0
    );

    const filasFinal = [...filasSinEditar, ...selectedArticulos];
    onSubmit(filasFinal);
    setSelectedArticulos([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          height: 620,
        }}
      >
        <Box sx={{ mb: 1 }}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={nombreArticulo}
            onChange={(e) => setNombreArticulo(e.target.value)}
          />
        </Box>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Seleccionar articulos
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            overflow: "auto",
            height: 390,
          }}
        >
          <Table>
            <TableBody>
              {articulosFiltrados
                ?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                .map((item: Articulo) => (
                  <TableRow key={item.id}>
                    <TableCell align="center" style={{ width: "5%" }}>
                      <Checkbox
                        checked={selectedArticulos.some(
                          (selected) => selected.articulo.id === item.id
                        )}
                        onChange={() => handleSelectArticulo(item)}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ width: "45%" }}>
                      <img
                        src={item.imagenes[0].url}
                        width="100%"
                        alt={item.denominacion}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ width: "50%" }}>
                      {item.denominacion}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Agregar Articulos
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AgregarArticuloModal;
