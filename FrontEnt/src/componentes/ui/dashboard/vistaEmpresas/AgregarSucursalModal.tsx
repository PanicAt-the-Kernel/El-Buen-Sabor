import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button, FormControlLabel, Checkbox } from '@mui/material';

interface AgregarSucursalModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    iNombre: string;
    iHoraApertura: string;
    iHoraCierre: string;
    iEsCasaMatriz: boolean;
    iDomicilio: string;
    iEmpresa: string;
}

function AgregarEmpresaModal({ open, onClose, onSubmit, iNombre, iHoraApertura, iHoraCierre, iEsCasaMatriz, iDomicilio, iEmpresa }: AgregarSucursalModalProps) {
    const [nombre, setNombre] = useState(iNombre);
    const [horaApertura, setHoraApertura] = useState(iHoraApertura);
    const [horaCierre, setHoraCierre] = useState(iHoraCierre);
    const [esCasaMatriz, setEsCasaMatriz] = useState(iEsCasaMatriz);
    const [domicilio, setDomicilio] = useState(iDomicilio);
    const [empresa, setEmpresa] = useState(iEmpresa);

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" id="modal-title" gutterBottom>
                    Agregar Nueva Sucursal
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Hora de Apertura"
                        variant="outlined"
                        value={horaApertura}
                        onChange={(e) => setHoraApertura(e.target.value)}
                    />
                    <TextField
                        label="Hora de Cierre"
                        variant="outlined"
                        value={horaCierre}
                        onChange={(e) => setHoraCierre(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={esCasaMatriz}
                                onChange={(e) => setEsCasaMatriz(e.target.checked)}
                                name="esCasaMatriz"
                                color="primary"
                            />
                        }
                        label="Es Casa Matriz"
                    />
                    <TextField
                        label="Domicilio"
                        variant="outlined"
                        value={domicilio}
                        onChange={(e) => setDomicilio(e.target.value)}
                    />
                    <TextField
                        label="Empresa"
                        variant="outlined"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AgregarEmpresaModal;