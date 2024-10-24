import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AnaliticaGrafico = ({ tipo }) => {
    const [grafico, setGrafico] = useState(null);
    const ctxRef = useRef(null);

    const obtenerDatosGrafico = async () => {
        try {
            const response = await fetch("https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/tareas");
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return null;
        }
    };

    const mostrarGrafico = async () => {
        const datos = await obtenerDatosGrafico();
        if (!datos) return;

        // Destruir el gráfico anterior si existe
        if (grafico) {
            grafico.destroy();
        }

        // Limpiar el contenedor del canvas
        ctxRef.current.innerHTML = '';

        // Crear un nuevo canvas para el gráfico
        const canvas = document.createElement('canvas');
        ctxRef.current.appendChild(canvas); // Añadir el canvas al contenedor
        const ctx = canvas.getContext("2d");

        let graficoDatos;

        switch (tipo) {
            case 'histogramaDificultad':
                const tareasPorDificultad = { alto: 0, medio: 0, bajo: 0 };
                datos.forEach(tarea => {
                    if (tarea.dificultad === 'Alto') tareasPorDificultad.alto++;
                    else if (tarea.dificultad === 'Medio') tareasPorDificultad.medio++;
                    else if (tarea.dificultad === 'Bajo') tareasPorDificultad.bajo++;
                });

                graficoDatos = {
                    type: 'bar',
                    data: {
                        labels: ['Alto', 'Medio', 'Bajo'],
                        datasets: [{
                            label: 'Número de Tareas',
                            data: [tareasPorDificultad.alto, tareasPorDificultad.medio, tareasPorDificultad.bajo],
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                };
                break;

            case 'tareasFinalizadas':
                const tareasPorDuracion = [0, 0, 0, 0];
                datos.forEach(tarea => {
                    const duracion = tarea.tiempoPromedio;
                    if (duracion <= 5) tareasPorDuracion[0]++;
                    else if (duracion <= 10) tareasPorDuracion[1]++;
                    else if (duracion <= 15) tareasPorDuracion[2]++;
                    else tareasPorDuracion[3]++;
                });

                graficoDatos = {
                    type: 'line',
                    data: {
                        labels: ['0-5 días', '6-10 días', '11-15 días', 'Más de 15 días'],
                        datasets: [{
                            label: 'Tareas Finalizadas',
                            data: tareasPorDuracion,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            tension: 0.1,
                        }],
                    },
                };
                break;

            case 'promediosPrioridad':
                const tareasPorPrioridad = [0, 0, 0, 0, 0];
                datos.forEach(tarea => {
                    const prioridad = tarea.prioridad;
                    if (prioridad >= 1 && prioridad <= 5) {
                        tareasPorPrioridad[prioridad - 1]++;
                    }
                });

                graficoDatos = {
                    type: 'pie',
                    data: {
                        labels: ['Prioridad 1', 'Prioridad 2', 'Prioridad 3', 'Prioridad 4', 'Prioridad 5'],
                        datasets: [{
                            label: 'Promedio de Tareas',
                            data: tareasPorPrioridad,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                        }],
                    },
                };
                break;

            case 'tiempoInvertido':
                const tareasDificultad = { alto: 0, medio: 0, bajo: 0 };
                datos.forEach(tarea => {
                    if (tarea.dificultad === 'Alto') tareasDificultad.alto += tarea.tiempoPromedio;
                    else if (tarea.dificultad === 'Medio') tareasDificultad.medio += tarea.tiempoPromedio;
                    else if (tarea.dificultad === 'Bajo') tareasDificultad.bajo += tarea.tiempoPromedio;
                });

                graficoDatos = {
                    type: 'pie',
                    data: {
                        labels: ['Alto', 'Medio', 'Bajo'],
                        datasets: [{
                            label: 'Tiempo Invertido',
                            data: [tareasDificultad.alto, tareasDificultad.medio, tareasDificultad.bajo],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                        }],
                    },
                };
                break;

            default:
                console.error("Tipo de gráfico no soportado");
                return;
        }

        const newGrafico = new Chart(ctx, graficoDatos);
        setGrafico(newGrafico);
    };

    useEffect(() => {
        mostrarGrafico();

        // Limpiar el gráfico cuando el componente se desmonte o se actualice
        return () => {
            if (grafico) {
                grafico.destroy();
            }
        };
    }, [tipo]);  // Solo actualiza cuando el tipo de gráfico cambia

    return (
        <div ref={ctxRef} style={{ position: 'relative', width: '100%', height: '400px' }} />
    );
};

export default AnaliticaGrafico;
