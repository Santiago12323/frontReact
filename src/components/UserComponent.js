import React, { useState } from 'react';

const UserComponent = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [signupMessage, setSignupMessage] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

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
        setLoginMessage('');
        setSignupMessage('');
    };

    return (
        <div className="user-component d-flex justify-content-end">
            <button className="btn btn-primary me-2" onClick={handleLoginToggle}>
                Iniciar Sesión
            </button>
            <button className="btn btn-secondary me-2" onClick={handleSignupToggle}>
                Crear Cuenta
            </button>
            <button className="btn btn-danger" onClick={handleClose}>
                Cerrar Sesión
            </button>

            {showLoginForm && (
                <div className="modal show">
                    <div className="modal-content">
                        <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                        <LoginForm setLoginMessage={setLoginMessage} />
                        {loginMessage && <p>{loginMessage}</p>}
                    </div>
                </div>
            )}
            {showSignupForm && (
                <div className="modal show">
                    <div className="modal-content">
                        <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                        <SignupForm setSignupMessage={setSignupMessage} 
                        setNotificationVisible={setNotificationVisible}
                        setNotificationMessage={setNotificationMessage} />
                        {signupMessage && <p>{signupMessage}</p>}
                    </div>
                </div>
            )}

            {notificationVisible && (
                <div className="modal show">
                    <div className="modal-content">
                        <button onClick={() => setNotificationVisible(false)} className="btn btn-danger close_button">Cerrar</button>
                        <p>{notificationMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const LoginForm = ({ setLoginMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario/${username}/${password}`);
            const success = await response.json(); 

            if (response.ok && success) {
                setLoginMessage('Inicio de sesión exitoso');
            } else {
                setLoginMessage('Error en el inicio de sesión');
            }
        } catch (error) {
            setLoginMessage('Error en la conexión con el servidor');
        }
    };

    return (
        <form className="mt-4" onSubmit={handleLoginSubmit}>
            <h4>Iniciar Sesión</h4>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre de usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-success">Entrar</button>
        </form>
    );
};

const SignupForm = ({ setSignupMessage, setNotificationVisible, setNotificationMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: username, contraseña :password}),
            });

            const success = await response.json(); 

            if (response.ok && success) {
                setNotificationMessage('Registro exitoso');
            } else {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                setNotificationMessage(`Error en el registro: ${errorMessage}`);
            }
        } catch (error) {
            setNotificationMessage('Error en la conexión con el servidor');
        } finally {
            setNotificationVisible(true);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSignupSubmit}>
            <h4>Crear Cuenta</h4>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre de usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-success">Registrar</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra el mensaje de error */}
        </form>
    );
};

export default UserComponent;
