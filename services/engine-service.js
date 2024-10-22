import { engines } from '../fakeDataBase/engine-data.js';
import { validateEngine } from './validationData/validation-data.js';
import { getManufacturerById } from './manufacturer-service.js';


export function getAllEngines(){
    return engines;
}

export function getEngineById(id){
    return engines.find((engine)=> engine.id===id);
}

export function createEngine(engine){
    engine.id = engines.length+1;
    engines.push(engine);
}

export function deleteEngineById(id){
    const indexToRemove = engines.findIndex(engine => engine.id === id);
    engines.splice(indexToRemove, 1);
}

/**
 * Sprawdza czy obiekt ktory przyszedl od klienta ma wszystkie typy,pola oraz czy id producenta istnieja
* @returns {boolean} - Return true jesli wszystko ok, w innym wypadku false
 */
export function isEngineDataValid(engine){
    return validateEngine(engine)
}

export function getManufacturerByManufacturerId(id){
    return getManufacturerById(id);
}
