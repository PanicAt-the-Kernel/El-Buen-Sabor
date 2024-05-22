import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalState {
    selectedEmpresaId: string;
    setSelectedEmpresaId: React.Dispatch<React.SetStateAction<string>>;
    selectedEmpresaNombre: string;
    setSelectedEmpresaNombre: React.Dispatch<React.SetStateAction<string>>;
    selectedSucursalId: string;
    setSelectedSucursalId: React.Dispatch<React.SetStateAction<string>>;
    selectedSucursalNombre: string;
    setSelectedSucursalNombre: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalStateContext = createContext<GlobalState | null>(null);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedEmpresaId, setSelectedEmpresaId] = useState('');
    const [selectedEmpresaNombre, setSelectedEmpresaNombre] = useState('');
    const [selectedSucursalId, setSelectedSucursalId] = useState('');
    const [selectedSucursalNombre, setSelectedSucursalNombre] = useState('');

    const globalState: GlobalState = {
        selectedEmpresaId,
        setSelectedEmpresaId,
        selectedEmpresaNombre,
        setSelectedEmpresaNombre,
        selectedSucursalId,
        setSelectedSucursalId,
        selectedSucursalNombre,
        setSelectedSucursalNombre,
    };

    return (
        <GlobalStateContext.Provider value={globalState}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext)!; // ! para indicar que nunca será nulo
