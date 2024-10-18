import React, { useState } from 'react';

const UserComponent = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

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
                        <SignupForm setSignupMessage={setSignupMessage} />
                        {signupMessage && <p>{signupMessage}</p>}
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

const SignupForm = ({ setSignupMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://apptareas-f5gxfjabgwfxe2ed.canadacentral-01.azurewebsites.net/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password,username}),
            });

            const success = await response.json(); 

            if (response.ok && success) {
                setSignupMessage('Registro exitoso');
            } else {
                setSignupMessage('Error en el registro');
            }
        } catch (error) {
            setSignupMessage('Error en la conexión con el servidor');
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
        </form>
    );
};

export default UserComponent;
