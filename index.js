import express from 'express';
import { rateLimit } from 'express-rate-limit'
import { engineRouter } from './routers/engine-rounter.js';
import { carRouter } from './routers/car-rounter.js';


const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2minuty
    max: 100, // 100 zadan w 2 minutuy
    headers: true // dodaj naglowki: X-RateLimit-Limit i X-RateLimit-Remaining
});

const app = express();
app.use(express.json());
app.use(limiter)

//Routers
app.use('/engines', engineRouter);
app.use('/cars', carRouter);

app.listen(8080, () => {
    console.log("Server Listening on PORT: 8080");
});


//Zadania do wykonania
// 2 gety: id,all
// 5 podstawowych metod: get,post,put,patch,delete

// Stworzenie routów dla resourców swojego tematu
// Poprawne użycie metod HTTP
// Poprawnie użycie kodów HTTP
// Poprawne użycie nagłówków HTTP
// HATEOS
// Konfiguracja serwera
// Poprawność RESTa
