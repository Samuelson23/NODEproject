# NODEproject

mongodb+srv://SalazarDeJerusalen7:<password>@cluster0.206dk6j.mongodb.net/?retryWrites=true&w=majority
phndjhfnqxcxnagg
941257743569624 api key
xK8hMMxxmYj4VXO-WFcTv_fRDOU api secret
dwbw3uill cloud name


proyecto hecho por Marc, Alex, Carlos y Samuel

OBJETIVOS
Un backend de un hotel donde los usuarios se pueden apuntar a actividades donde conseguir puntos y dichos puntos son gestionados por los administradores del hotel y que te hacen descuento en distintos servicios del hotel.

MODELO DE DATOS
USERS:
name: string, require, unique.
gender: string enum[“hombre”, “mujer”], require.
role: string, enum[“user”, “admin”], require.
email: string, require, unique, validate.
password: string, require, trim, validate.
imagen: string.
confirmationCode: string, require.
check: boolean, default:false.
events: [objectId & populate]
scores: [objectId & populate]

EVENTS:
name: string, require.
location: string, require.
data: date, required.
hour: string, require.
description: string, require.
user: [objectId & populate]
scores: [objectId & populate]

SCORES:
event: [objectId & populate]
user: [objectId & populate]
points: number.
CONTROLLERS

CONTROLLER USERS:
1- REGISTER:
Envíamos un código de confirmación (utils -> random Code)
Comprobamos si el usuario existe en la base de datos.
Si el usuario no existe creamos un new user (con la request body y el confirmation code), le añadimos la imagen de la request o una por defecto.
Envíamos un email de confirmación.
2- LOGIN:
Buscamos el usuario en la base de datos.
Comprobamos contraseña encriptada con contraseña dada.
Generamos el token (utils → tokens).
Dentro de tokens está crear Token y verificarlo.
3- FORGOT PASSWORD:
Crear función que envíe contraseña (tiene que enviar un email con nueva contraseña y hacer un update del usuario).
Introducir correo electrónico y verificar que exista.
Si es correcto añadimos propiedad true y si no se hace un delete del usuario.
4- CHANGEPASSWORD:
En la request enviamos contraseña y new password y comparamos la contraseña con la que tiene el usuario.
Si es correcta encriptamos la nueva contraseña y hacemos un update de usuario.
5- UPDATE:
Actualizamos los datos.
6- DELETE:
Borramos el usuario.
8- ADD TO EVENT:
Buscar el evento y añadirlo al array de los usuario.
Hay que añadir el id del usuario al evento.
9- LOGOUT:
Borrar el token.
10- GETBYID:
Buscar por ID.
11- GETALL:
Buscar todos.
12- GETBYNAME:
Buscar por nombre.

//ENVIAR CÓDIGO Y VERIFICAR CÓDIGO COMO UTILS
CONTROLLER EVENTS:
1- CREATE:
2- UPDATE:
3- DELETE:
Borrar del resto de modelos de datos a los que esté asociado.
4- GETBYID:
5- GETALL:
6- GETBYNAME:

CONTROLLER SCORES:
1- CREATE:
2- UPDATE:
3- DELETE:
Borrar del resto de modelos de datos a los que esté asociado.
4- GETBYID:
5- GETALL:
6- GETBYNAME:
