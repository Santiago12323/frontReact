// components/AnaliticaModal.js
import React, { useState } from 'react';

import AnaliticaGrafico from "./AnaliticaGraphics";

const AnaliticaModal = ({ onClose }) => {
    const [tipoGrafico, setTipoGrafico] = useState(null); // Estado para el tipo de gráfico

    const mostrarGrafico = (tipo) => {
        setTipoGrafico(tipo); // Actualiza el tipo de gráfico

    };

    const handleClose = () => {
        setTipoGrafico(null); // Restablece el tipo de gráfico al cerrar
        onClose();
    };

    return (
        <div className="modal show">
            <div className="modal-content-analitica">
                <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                <h4 className="text-center mb-4">Selecciona un Gráfico</h4>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('histogramaDificultad')}>
                            Histograma Dificultad
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('tareasFinalizadas')}>
                            Tareas Finalizadas
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('promediosPrioridad')}>
                            Promedios Prioridad
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('tiempoInvertido')}>
                            Tiempo Invertido
                        </button>
                    </div>
                </div>

                {/* Renderiza el componente de gráfico si se selecciona uno */}
                {tipoGrafico && (
                    <div className="mt-4">
                        <AnaliticaGrafico tipo={tipoGrafico} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnaliticaModal;
