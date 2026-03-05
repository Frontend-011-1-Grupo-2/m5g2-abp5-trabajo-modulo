import { DateTime } from 'luxon';

const fechaLimite = DateTime.fromISO('2026-03-06T12:44:59');

const actualizarCuenta = () => {
  const ahora = DateTime.now();

  const diferencia = fechaLimite.diff(ahora, [
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
  ]);

  const { days, hours, minutes, seconds, milliseconds } = diferencia.toObject();
  console.log(`${days} dias y ${hours}:${minutes}:${seconds}`);
};

setInterval(actualizarCuenta, 1000);
