import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FormSelectDomicilioTypes{
  metodoEntrega:string;
  domicilio:number;
  setDomicilio:(item:number)=>void;
}

export default function FormSelectDomicilio({metodoEntrega,domicilio,setDomicilio}:FormSelectDomicilioTypes) {
  return (
    <Box component="form" autoComplete="off" sx={{padding:2}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Domicilios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Domicilios"
          value={domicilio}
          disabled={metodoEntrega==="RETIRO"}
          onChange={(e)=>setDomicilio(Number(e.target.value))}
        >
          <MenuItem value={0}>Selecciona un domicilio para enviar tu pedido</MenuItem>
          <MenuItem value={1}>Domicilio 1</MenuItem>
          <MenuItem value={2}>Domicilio 2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
