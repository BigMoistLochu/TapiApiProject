import express from "express";

export const engineRouter = express.Router();

engineRouter.get("",(reg,res)=>{

    res.send("HIHI");
});

//DODAC QUERY PARAMSY DO GET, 2 GETY ALL I ID

//5 PODSTAWOWYCH METOD

