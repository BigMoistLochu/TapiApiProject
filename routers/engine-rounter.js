import express from "express";
import * as engineService from "../services/engine-service.js";

export const engineRouter = express.Router();


engineRouter.get("/",(req,res)=>{
    const engines = engineService.getAllEngines();
    res.status(200).json(engines);
});

engineRouter.get("/:id",(req,res)=>{
    const engineId = Number(req.params.id);
    if(engineId < 1 ) return res.status(400).json({ message: 'Nieprawidlowe ID Silnika.' });
    const engine = engineService.getEngineById(engineId);
    if(!engine) return res.status(404).json({ message: 'Silnik o podanym ID nie został znaleziony.' });
    res.status(200).json(engine);
});



