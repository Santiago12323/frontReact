import React, { useState } from 'react';

const UserComponent = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    const handleLoginToggle = () => {
        setShowLoginForm(!showLoginForm);
        setShowSignupForm(false); // Oculta el registro si muestra el inicio de sesión
    };

    const handleSignupToggle = () => {
        setShowSignupForm(!showSignupForm);
        setShowLoginForm(false); // Oculta el inicio de sesión si muestra el registro
    };

    const handleClose = () => {
            setShowLoginForm(false);
            setShowSignupForm(false);
    };

    return (
        <div className="user-component d-flex justify-content-end">
            <button className="btn btn-primary me-2" onClick={handleLoginToggle}>
                Iniciar Sesión
            </button>
            <button className="btn btn-secondary me-2" onClick={handleSignupToggle}>
                Crear Cuenta
            </button>
            <button className="btn btn-danger" onClick={handleSignupToggle}>
                Cerrar Sesión
            </button>

             {showLoginForm && (
                            <div className="modal show">
                                <div className="modal-content">
                                    <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                                    <LoginForm />
                                </div>
                            </div>
             )}
            {showSignupForm && (
                            <div className="modal show">
                                <div className="modal-content">
                                    <button onClick={handleClose} className="btn btn-danger close_button">Cerrar</button>
                                    <SignupForm />
                                </div>
                            </div>
            )}
        </div>
    );
};

const LoginForm = () => {
    return (
        <form className="mt-4">
            <h4>Iniciar Sesión</h4>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre de usuario" required />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" required />
            </div>
            <button type="submit" className="btn btn-success">Entrar</button>
        </form>
    );
};

const SignupForm = () => {
    return (
        <form className="mt-4">
            <h4>Crear Cuenta</h4>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre de usuario" required />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" required />
            </div>
            <button type="submit" className="btn btn-success">Registrar</button>
        </form>
    );
};

export default UserComponent;

