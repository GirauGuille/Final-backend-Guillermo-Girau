import express from 'express';
import { __dirname } from './utils/utils.js';
import session, { Cookie } from 'express-session';
import './DAL/mongoDB/dbConfig.js';
import passport from 'passport';
import './passport/passportStrategies.js';
import mongoStore from 'connect-mongo';
import { MONGO_URI, PORT } from './config/config.js';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import registerRouter from './routes/register.router.js';
import sessionsRouter from './routes/sessions.router.js';
import usersRouter from './routes/users.router.js';
import loggerTestRouter from './routes/loggerTestRouter.js';
import { errorMiddleware } from './utils/errors/error.middleware.js';
import { logger } from './utils/winston.js';

const app = express();
/* const cors = require('cors');
app.use (cors()); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/* Handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/* Cookies */
app.use(cookieParser('secretPass'));

/* Mongo */
app.use(
  session({
    store: new mongoStore({mongoUrl: MONGO_URI,}),
    secret: 'secretSession',
    cookie: {maxAge: 24000000,},
  })
);

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.get('/', (req, res) => {res.redirect('/views');});
app.use('/register', registerRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/loggerTest', loggerTestRouter);


  
/* SocketServer */
const httpServer = app.listen(PORT, () => 
logger.info(`escuchando puerto http://localhost:${PORT}`));
console.log(`http://localhost:${PORT}`);


app.use(errorMiddleware);

/* Soket io */
const messages = [];

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {logger.info(`cliente conectado con id: ${socket.id}`);

  socket.on('disconnect', () => {logger.info(`Cliente desconectado con id: ${socket.id}`);});

  socket.on('message', (info) => {messages.push(info);socketServer.emit('chat', messages);
  });

  socket.on('newUser', (newUser) => {socket.broadcast.emit('broadcastChat', newUser);socketServer.emit('chat', messages);});
});

export default app;
