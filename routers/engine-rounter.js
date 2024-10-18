import express from "express";
import * as engineService from "../services/engine-service.js";
export const engineRouter = express.Router();

engineRouter.get("",(reg,res)=>{
    const engines = engineService.getAllEngines();
    res.status(200).json(engines);
});

//DODAC QUERY PARAMSY DO GET, 2 GETY ALL I ID

//5 PODSTAWOWYCH METOD

