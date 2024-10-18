import express from 'express';
import { engineRouter } from './routers/engine-rounter.js';
import { carRouter } from './routers/car-rounter.js';

const app = express();
app.use(express.json());

//Routers
app.use('/engines', engineRouter);
app.use('/cars', carRouter);

app.listen(8080, () => {
    console.log("Server Listening on PORT: 8080");
});