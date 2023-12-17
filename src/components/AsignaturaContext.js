'use client'
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [refrescarAsignaturas, setRefrescarAsignaturas] = useState(false);
    const [refrescarDocentes, setRefrescarDocentes] = useState(false);

    const actualizarAsignaturas = () => {
        setRefrescarAsignaturas(prev => !prev);
    };

    const actualizarDocentes = () => {
        setRefrescarDocentes(prev => !prev);
    };

    return (
        <DataContext.Provider value={{ 
            refrescarAsignaturas, actualizarAsignaturas, 
            refrescarDocentes, actualizarDocentes 
        }}>
            {children}
        </DataContext.Provider>
    );
};
