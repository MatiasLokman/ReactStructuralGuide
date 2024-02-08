// Función para obtener la fecha y hora actual
function getCurrentDateTime() {
  const currentDateTime = new Date();
  const date = currentDateTime.toLocaleDateString();
  const time = currentDateTime.toLocaleTimeString();
  return { date, time };
}

export {
  getCurrentDateTime
}