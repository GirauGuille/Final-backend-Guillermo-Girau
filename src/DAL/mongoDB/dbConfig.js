import mongoose from 'mongoose';
import { MONGO_URI } from '../../config/config.js';
import { logger } from '../../utils/winston.js';

mongoose
  .connect(MONGO_URI)
  .then(() => logger.info('Conectado a la base de datos monogodb ElectroGirau'))
  .catch((error) => logger.error(error));
