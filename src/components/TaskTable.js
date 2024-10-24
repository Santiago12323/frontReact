import React from 'react';

const TaskTable = ({ tasks, deleteTask, editTask, toggleTaskStatus }) => {
    return (
        <div className="table-responsive mt-4">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Dificultad</th>
                    <th scope="col">Prioridad</th>
                    <th scope="col">Tiempo Promedio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Actualizar</th>
                    <th scope="col">Borrar</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task, index) => (
                    <tr key={task.id}> {/* Usa task.id como clave única */}
                        <td>{index + 1}</td>
                        <td>{task.nombre}</td>
                        <td>{task.descripcion}</td>
                        <td>{task.dificultad}</td>
                        <td>{task.prioridad}</td>
                        <td>{task.tiempoPromedio}</td>
                        <td className="text-center">
                            <button
                                className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}
                                onClick={() => toggleTaskStatus(task.id)}
                            >
                                {task.completed ? 'Hecho' : 'Pendiente'}
                            </button>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-info" onClick={() => editTask(index)}>
                                Actualizar
                            </button>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Borrar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
