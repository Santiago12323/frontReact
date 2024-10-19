import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import UserComponent from './components/UserComponent';
import './style.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [updateIndex, setUpdateIndex] = useState(-1); // Para identificar cuál se está actualizando
    const apiUrl = 'https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/tareas';

    // Fetch para obtener las tareas desde la API
    const fetchTasks = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...task, completed: false }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setTasks([...tasks, data]);
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    
    const deleteTask = async (taskId) => {
        try {
            await fetch(`${apiUrl}/${taskId}`, {
                method: 'DELETE',
            });
            const updatedTasks = tasks.filter(task => task.id !== taskId); // Filtra la tarea por id
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

  
    const editTask = (index) => {
        setUpdateIndex(index);
    };

    const updateTask = async (updatedTask) => {
        try {
            const taskId = updatedTask.id;
            await fetch(`${apiUrl}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task));
            setTasks(updatedTasks);
            setUpdateIndex(-1);
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const toggleTaskStatus = async (taskId) => {
      try {
          const response = await fetch(`${apiUrl}/cambio/${taskId}`, {
              method: 'GET', // Cambia a GET
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }
  
          // Después de hacer la llamada, actualiza el estado de la tarea localmente
          const updatedTasks = tasks.map(task => 
              task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          setTasks(updatedTasks);
      } catch (error) {
          console.error("Error toggling task status", error);
      }
  };
  
  

    const taskToUpdate = updateIndex >= 0 ? tasks[updateIndex] : null;

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 id="titulo">Tareas</h1>
            </div>

            <UserComponent/>

            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                updateIndex={updateIndex}
                taskToUpdate={taskToUpdate}
            />

            <TaskTable 
                tasks={tasks} 
                deleteTask={deleteTask} 
                editTask={editTask} 
                toggleTaskStatus={toggleTaskStatus} 
            />
        </div>
    );
};

export default App;
