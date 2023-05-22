//creamos una funcion que nos genera un codigo de verificacion random para enviarlo por email a la hora de registrarse el usuario

const randomCode = () => {
  let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
  return code;
};

module.exports = randomCode;
