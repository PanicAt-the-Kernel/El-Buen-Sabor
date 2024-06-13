import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

export default function AcordeonPedido() {
  return (
    <Accordion sx={{ backgroundColor: "#B9E4C9" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack
          direction="row"
          spacing={5}
        >
          <Typography>Pedido N°123456</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Estado Pedido: Entregado
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          consectetur, risus sit amet rhoncus gravida, diam lorem facilisis
          nulla, ac mattis metus nulla nec nulla. Morbi dictum, ligula a
          placerat dapibus, libero sapien hendrerit neque, ac fringilla ipsum
          arcu at ex. Morbi gravida diam a odio sodales, eu condimentum velit
          viverra. Maecenas finibus ullamcorper rutrum. Vestibulum mattis et
          nisl in convallis. Pellentesque vitae malesuada elit. Cras id sapien
          non purus dictum aliquet. Fusce nec nibh non nibh pellentesque
          euismod. Nunc quis viverra tellus. Nullam varius consequat purus, at
          pulvinar elit tempus at. Mauris non molestie ipsum, eget elementum
          ante.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
