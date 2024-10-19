// components/AnaliticaModal.js
import React from 'react';

const AnaliticaModal = ({ onClose }) => {
    const mostrarGrafico = (tipo) => {
        console.log(`Mostrando gráfico: ${tipo}`);
        // Aquí puedes agregar la lógica para mostrar el gráfico correspondiente
        onClose(); // Cierra el modal después de seleccionar
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-content">
                <button onClick={onClose} className="btn btn-danger close_button">Cerrar</button>
                <h4 className="text-center mb-4">Selecciona un Gráfico</h4>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('histogramaDificultad')}>
                            Gráfico 1
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('tareasFinalizadas')}>
                            Gráfico 2
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('promediosPrioridad')}>
                            Gráfico 3
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => mostrarGrafico('tiempoInvertido')}>
                            Gráfico 4
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnaliticaModal;
