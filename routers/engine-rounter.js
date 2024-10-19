import express from "express";
import * as engineService from "../services/engine-service.js";



export const engineRouter = express.Router();


engineRouter.get("",(req,res)=>{
    const engines = engineService.getAllEngines();
    res.status(200).json(engines);
});

engineRouter.get("/:id",(req,res)=>{
    const engineId = Number(req.params.id);
    const engine = engineService.getEngineById(engineId);
    res.status(200).json(engine);
});

//DODAC QUERY PARAMSY DO GET, 2 GETY ALL I ID
//5 PODSTAWOWYCH METOD
// const carId = Number(req.params.id);
//     if(carId < 1 ) return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
//     const car = carService.findCarById(carId);
//     if(!car) return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });
//     res.status(200).json(car);
