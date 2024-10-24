import React, { useState } from 'react';

const UserComponent = ({ setTasks }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLoginToggle = () => {
        setShowLoginForm(!showLoginForm);
        setShowSignupForm(false);
    };

    const handleSignupToggle = () => {
        setShowSignupForm(!showSignupForm);
        setShowLoginForm(false);
    };

    const handleClose = () => {
        setShowLoginForm(false);
        setShowSignupForm(false);
        setNotificationVisible(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const isUserEndpoint = true;
            const apiUsername = isUserEndpoint ? 'coronado' : username;
            const apiPassword = isUserEndpoint ? 'coronado123' : password;

            
            const response = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario/verificar/${username}/${password}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${apiUsername}:${apiPassword}`),
                },
            });

            const success = await response.json();
            console.log(success)

            if (response.ok && success) {
                setNotificationMessage('Inicio de sesión exitoso');
                setNotificationType('success');
                setIsLoggedIn(true);
                setShowLoginForm(false);
                setUsername(username);

                const tasksResponse = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario/tareas/${username}`, {
                    headers: {
                        'Authorization': 'Basic ' + btoa(`${apiUsername}:${apiPassword}`),
                    },
                });

                const userTasks = await tasksResponse.json();
                setTasks(userTasks);
            } else {
                const errorMessage = success.message || 'Error en el inicio de sesión';
                setNotificationMessage(errorMessage);
                setNotificationType('error');
            }
        } catch (error) {
            setNotificationMessage('Error en la conexión con el servidor');
            setNotificationType('error');
        } finally {
            setNotificationVisible(true);
        }
    };



    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: username, contraseña: password }),
            });

            const success = await response.json();

            if (response.ok) {
                setNotificationMessage('Registro exitoso');
                setNotificationType('success');
                setShowSignupForm(false); 
            } else {
                const errorMessage = success.message || 'Error en el registro';
                setNotificationMessage(errorMessage);
                setNotificationType('error');
            }
        } catch (error) {
            setNotificationMessage('Usuario creado');
            setNotificationVisible(true);
            setShowSignupForm(false);
        } finally {
            setNotificationVisible(true);
        }
    };

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setNotificationVisible(false);


        const tasksResponse = await fetch('https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/tareas');
        const allTasks = await tasksResponse.json();
        setTasks(allTasks); 
    };

    return (
        <div className="user-component d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                {!isLoggedIn ? (
                    <>
                        <button className="btn btn-primary me-2" onClick={handleLoginToggle}>
                            Iniciar Sesión
                        </button>
                        <button className="btn btn-secondary me-2" onClick={handleSignupToggle}>
                            Crear Cuenta
                        </button>
                    </>
                ) : (
                    <>
                        <div className={`notification ${notificationType} me-3`} style={{ textAlign: 'left' }}>
                            {notificationMessage}
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </div>

            {notificationVisible && !isLoggedIn && (
                <div className={`notification ${notificationType} me-3`}>
                    {notificationMessage}
                </div>
            )}

            {showLoginForm && (
                <div className="modal show">
                    <div className="modal-content">
                        <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                        <form className="mt-4" onSubmit={handleLoginSubmit}>
                            <h4>Iniciar Sesión</h4>
                            <div className="mb-3">
                                <input type="text" name="username" className="form-control" placeholder="Nombre de usuario" required />
                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Contraseña" required />
                            </div>
                            <button type="submit" className="btn btn-success">Entrar</button>
                        </form>
                    </div>
                </div>
            )}

            {showSignupForm && (
                <div className="modal show">
                    <div className="modal-content">
                        <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                        <form className="mt-4" onSubmit={handleSignupSubmit}>
                            <h4>Crear Cuenta</h4>
                            <div className="mb-3">
                                <input type="text" name="username" className="form-control" placeholder="Nombre de usuario" required />
                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Contraseña" required />
                            </div>
                            <button type="submit" className="btn btn-success">Registrar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserComponent;
