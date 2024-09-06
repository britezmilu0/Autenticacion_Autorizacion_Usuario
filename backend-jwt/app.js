// server.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import morgan from 'morgan';
import { config } from './config/config.js';
import { authRouter } from './src/routes/authRoutes.js';

const PORT = config.PORT
const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(authRouter)
// Servidor escuchandos
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
