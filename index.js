import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { engineRouter } from './routers/engine-rounter.js';
import { carRouter } from './routers/car-rounter.js';
import { manufacturerRouter } from './routers/manufacturer-rounter.js';
import { isValidContentTypeHeader, isValidAcceptHeader, addHateoasLinks} from './middleware.js';


const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2minuty czasu od pierwszego requesta
    max: 100, // 100 requestow w 2 minutuy
    headers: true // dodaje naglowki: X-RateLimit-Limit i X-RateLimit-Remaining
});


const app = express();

//Konfiguracja Servera
app.use(express.json());
app.use(limiter)
app.use(isValidContentTypeHeader);
app.use(isValidAcceptHeader);
app.use(addHateoasLinks);
app.use(cors());

//Routers
app.use('/api/cars', carRouter);
app.use('/api/engines', engineRouter);
app.use('/api/manufacturers', manufacturerRouter);

app.listen(8080, () => {
    console.log("Server Listening on PORT: 8080");
});

