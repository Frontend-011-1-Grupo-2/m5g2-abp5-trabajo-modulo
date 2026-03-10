import getWeather from './Weather.js';

// Geolocation API (del navegador) para obtener latitud y longitud
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const success = (pos) => {
  const crd = pos.coords;

  console.log(crd);
  console.log(`Tu latitud es: ${crd.latitude}`);
  console.log(`Tu longitud es: ${crd.longitude}`);

  // Pasarle a funcion del clima las coordenadas
  getWeather(crd.latitude, crd.longitude);
};

const error = (error) => {
  console.warn(`Error ${error.code}: ${error.message}`);
};

export { success, error, options };
