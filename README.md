# LABORATORIO 6 - React

## PARTE I. Definiendo Funcionalidades
### Nuevos requisitos
Utilizando el proyecto de tareas desarrollado en las sesiones anteriores tenga en cuenta las siguientes funcionalidades:
1) Autenticación: El sistema de tareas deberá tener un sistema de autenticación ahora los usuarios podrán gestionar sus tareas; una vez que el usuario inicia sesión podrá ver sus tareas

## Componentes Principales Autenticación
### Componente UserComponent
Este componente permite a los usuarios registrarse, iniciar sesión y cerrar sesión.
### Funcionalidades
#### Registro: 
Permite a los usuarios registrarse en el sistema mediante un formulario.
#### Inicio de Sesión: 
Los usuarios pueden iniciar sesión, ver sus tareas y gestionar sus credenciales.
### Cerrar Sesión: 
Permite a los usuarios cerrar sesión y revoca su acceso a las tareas.
### Estado Local:
#### showLoginForm y showSignupForm:
Controlan la visualización de los formularios de inicio de sesión y registro.
#### notificationVisible: 
Muestra o esconde mensajes de notificación.
#### isLoggedIn: 
Indica si el usuario está autenticado.
#### username: 
Almacena el nombre de usuario del usuario autenticado.
### Métodos
#### handleLoginToggle y handleSignupToggle: 
Alternan la visualización de los formularios de inicio de sesión y registro.
#### handleLoginSubmit: 
Envía los datos de inicio de sesión del usuario al servidor y autentica al usuario.
#### handleSignupSubmit: 
Registra a un nuevo usuario en el sistema.
#### handleLogout: 
Cierra la sesión del usuario y restablece el estado del componente.

2) Todas las intefaces gráficas deberán migrarse a REACT.

Todo el proyecto ha sido migrado a React, por lo que todas las interfaces gráficas ahora están implementadas usando componentes React.

# LABORATORIO 7 - Seguridad 

En este laboratorio configuramos la seguridad de la aplicación usando Spring Security para autenticar ciertas rutas. Definimos una clase (SecurityConfig) que implementa una autenticación básica en rutas específicas (como /usuario/**) y permite acceso público en el resto de la aplicación. Para facilitar el desarrollo, desactivamos CSRF, lo que simplifica la gestión de solicitudes.

Dentro de SecurityConfig, creamos un usuario de prueba con una contraseña encriptada usando BCryptPasswordEncoder, que asegura que las contraseñas se almacenen de forma segura, incluso si alguien accede a la base de datos.

```yaml
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request ->
                        request.requestMatchers("/usuario/**").authenticated()
                                .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public UserDetailsService testUser(PasswordEncoder passwordEncoder) {
        User.UserBuilder user = User.builder();
        UserDetails user1 = user.username("coronado")
                .password(passwordEncoder.encode("coronado123"))
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user1);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
```

En usuarioController, implementamos un método para verificar contraseñas encriptadas, que compara la contraseña ingresada por el usuario con la almacenada.
```yaml
@GetMapping("/verificar/{nombre}/{contraseña}")
    public boolean verificarPass(@PathVariable String nombre, @PathVariable String contraseña) {

        usuario usuario = usuarioService.encontrarUsuario(nombre);
        if (usuario != null) {
            String contrasenaAlmacenada = usuario.getContraseña();
            boolean match = passwordEncoder.matches(contraseña, contrasenaAlmacenada);
            return match;
        }

        System.out.println("Usuario no encontrado: " + nombre);
        return false;
    }
```

En usuario integramos un método en la clase usuario para encriptar contraseñas antes de guardarlas,

```yaml

private String encriptarContraseña(String contraseña) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(contraseña);
    }

```

# PARTE II. SSL

En esta sección, configuramos el proyecto para asegurar las peticiones HTTP con certificados SSL. Para ello, primero añadimos un keystore al proyecto, que almacena el certificado en un archivo .p12.

![Captura de pantalla 2024-10-27 113113](https://github.com/user-attachments/assets/9b54d963-3422-4562-9fd2-37f9802b2e12)

Luego, en application.properties, configuramos los parámetros para habilitar SSL en el servidor, especificando la ubicación del keystore (server.ssl.key-store=keystore.p12), el tipo de almacenamiento (PKCS12), la contraseña del keystore y el alias del certificado.

![app properties](https://github.com/user-attachments/assets/023eaa3f-966d-473c-9f06-9de853defb95)

Con esta configuración, todos los Endpoints definidos en la aplicación ahora cuentan con una capa de seguridad HTTPS, protegiendo las comunicaciones.