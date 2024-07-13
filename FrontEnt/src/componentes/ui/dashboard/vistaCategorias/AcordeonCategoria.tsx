import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { Edit, ExpandMore } from "@mui/icons-material";

interface AcordeonCategoriaTypes {
  categoria: Categoria;
  openEditFunction: (item: Categoria) => void;
}

export default function AcordeonCategoria({
  categoria,
  openEditFunction,
}: AcordeonCategoriaTypes) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{categoria.denominacion}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {categoria.subCategorias.map((item: Categoria) => (
            <ListItem>
              <Typography variant="body1">{item.denominacion}</Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={() => openEditFunction(categoria)} endIcon={<Edit />}>
          Editar Categoria
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
