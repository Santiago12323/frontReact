import React, { useState, useEffect } from 'react';
import AnaliticaModal from './Analitica';

const TaskForm = ({ addTask, updateTask, updateIndex, taskToUpdate }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [showAnalitica, setShowAnalitica] = useState(false);

    useEffect(() => {
        if (taskToUpdate) {
            setTaskName(taskToUpdate.nombre);
            setTaskDescription(taskToUpdate.descripcion);
        } else {
            resetForm();
        }
    }, [taskToUpdate]);

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            nombre: taskName,
            descripcion: taskDescription,
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
