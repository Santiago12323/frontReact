import React, { useState, useEffect } from 'react';
import AnaliticaModal from './Analitica';

const TaskForm = ({ addTask, updateTask, updateIndex, taskToUpdate }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState(1);
    const [dificultad, setDificultad] = useState('Medio');
    const [tiempoPromedio, setTiempoPromedio] = useState(1);
    const [showAnalitica, setShowAnalitica] = useState(false);

    useEffect(() => {
        if (taskToUpdate) {
            setTaskName(taskToUpdate.nombre);
            setTaskDescription(taskToUpdate.descripcion);
            setPriority(taskToUpdate.prioridad);
            setDificultad(taskToUpdate.dificultad);
            setTiempoPromedio(taskToUpdate.tiempoPromedio);
        } else {
            resetForm();
        }
    }, [taskToUpdate]);

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
        setPriority(1);
        setDificultad('Medio');
        setTiempoPromedio(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            nombre: taskName,
            descripcion: taskDescription,
            prioridad: priority,
            dificultad: dificultad,
            tiempoPromedio: tiempoPromedio,
        };

        if (updateIndex >= 0) {
            updateTask({ ...newTask, id: taskToUpdate.id });
        } else {
            addTask(newTask);
        }

        resetForm();
    };

    return (
        <>
            <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Nombre de la tarea"
                        required
                    />
                </div>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Descripción"
                        required
                    />
                </div>
                <div className="col-md-3">
                    <label>Dificultad</label>
                    <select className="form-control" value={dificultad}
                            onChange={(e) => setDificultad(e.target.value)}>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label>Prioridad</label>
                    <input
                        type="number"
                        className="form-control"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="col-md-3">
                    <label>Tiempo Promedio (días)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={tiempoPromedio}
                        onChange={(e) => setTiempoPromedio(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <div className="col-md-2 d-flex">
                    <button type="submit" className="btn btn-success me-2">
                        {updateIndex >= 0 ? 'Actualizar' : 'Agregar'}
                    </button>
                    <button type="button" className="btn btn-success w-100" onClick={() => setShowAnalitica(true)}>
                        Analítica
                    </button>
                </div>
            </form>

            {showAnalitica && <AnaliticaModal onClose={() => setShowAnalitica(false)} />}
        </>
    );
};

export default TaskForm;