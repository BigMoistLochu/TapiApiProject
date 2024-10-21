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

engineRouter.post("/",(req,res)=>{
    const newEngine = req.body;

    if (!engineService.isEngineDataValid(newEngine)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const existingEngine = engineService.getEngineById(newEngine.id);
    if (existingEngine) {
        return res.status(409).json({ message: 'Silnik z takim id juz istnieje' });
    }

    engineService.createEngine(newEngine);
    res.status(201).json(newEngine);
});



engineRouter.delete('/:id', (req, res) => {
    const engineId = Number(req.params.id);

    if (engineId < 1) {
        return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
    }

    const engine = engineService.getEngineById(engineId);

    if (!engine) {
        return res.status(404).json({ message: 'Silnik o id: ' + engineId + 'nie istnieje' });
    }

    engineService.deleteEngineById(engineId);
    res.status(200).json({ message: 'Silnik o ID: ' + engineId + ' zostal usuniety' });
});



