import { networkInterfaces } from 'os';

const nInterfaces = networkInterfaces();

const ipsFlatten = Object.values(nInterfaces).reduce(
  (acc, val) => [...acc, ...val],
  []
);

const externalIPv4 = ipsFlatten
  ?.filter(ip => ip.family === 'IPv4')
  .find(ip => !ip.internal);

export default externalIPv4;
