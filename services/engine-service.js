import { data } from "../fake-database.js";

export function getAllEngines(){
    return data.map(car => car.engine);
}
