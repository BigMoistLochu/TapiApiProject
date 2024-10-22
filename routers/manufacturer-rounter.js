import express from "express";
import * as manufacturerService from "../services/manufacturer-service.js";

export const manufacturerRouter = express.Router();


manufacturerRouter.get("/", (req, res) => {
    const manufacturers = manufacturerService.getAllManufacturers();
    res.status(200).json(manufacturers);
});

manufacturerRouter.get("/:id", (req, res) => {
    const manufacturerId = Number(req.params.id);
    if (manufacturerId < 1) return res.status(400).json({ message: 'Nieprawidlowe ID Producenta.' });

    const manufacturer = manufacturerService.getManufacturerById(manufacturerId);
    if (!manufacturer) return res.status(404).json({ message: 'Producent o podanym ID nie został znaleziony.' });

    res.status(200).json(manufacturer);
});


manufacturerRouter.post("/", (req, res) => {
    const newManufacturer = req.body;

    if (!manufacturerService.isManufacturerDataValid(newManufacturer)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const existingManufacturer = manufacturerService.getManufacturerById(newManufacturer.id);
    if (existingManufacturer) {
        return res.status(409).json({ message: 'Producent z takim id juz istnieje' });
    }

    manufacturerService.createManufacturer(newManufacturer);
    res.status(201).json(newManufacturer);
});


manufacturerRouter.delete('/:id', (req, res) => {
    const manufacturerId = Number(req.params.id);

    if (manufacturerId < 1) {
        return res.status(400).json({ message: 'Nieprawidlowe ID producenta.' });
    }

    const manufacturer = manufacturerService.getManufacturerById(manufacturerId);

    if (!manufacturer) {
        return res.status(404).json({ message: 'Producent o id: ' + manufacturerId + 'nie istnieje' });
    }

    manufacturerService.deleteManufacturerById(manufacturerId);
    res.status(200).json({ message: 'Silnik o ID: ' + manufacturerId + ' zostal usuniety' });
});