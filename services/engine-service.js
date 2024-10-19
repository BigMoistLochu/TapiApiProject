import { data } from "../fake-database.js";

export function getAllEngines(){
    return data.map(car => car.engine);
}


export function getEngineById(id){
    return data.map(car => car.engine).find((engine)=> engine.id === id);
}
