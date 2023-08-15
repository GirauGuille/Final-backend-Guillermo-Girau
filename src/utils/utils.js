//__dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
export const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));

export const ASC = 'asc';
export const DESC = 'desc';

export const TRUE = 'true';
export const FALSE = 'false';


export const validateInteger = (input, lowerLimit, upperLimit) => {
  const num = parseInt(input);
  return Number.isInteger(num) && num >= lowerLimit && num <= upperLimit;
};


export const validateSort = (input) => {
  return input === ASC || input === DESC;
};


export const validateBoolean = (input) => {
  return input === TRUE || input === FALSE;
};

const saltRound = 10;

export const hashData = async (data) => {
  return bcrypt.hash(data, saltRound);
};

export const compareData = async (data, dataDB) => {
  return bcrypt.compare(data, dataDB);
};
