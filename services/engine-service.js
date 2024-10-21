import { engines } from '../fakeDataBase/engine-data.js';
import { validateEngineDataByEngine } from './validationData/validation-data.js';
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
    engines.splice(id-1, 1);
}

/**
 * Sprawdza czy obiekt ktory przyszedl od klienta ma wszystkie typy,pola oraz czy id producenta istnieja
* @returns {boolean} - Return true jesli wszystko ok, w innym wypadku false
 */
export function isEngineDataValid(engine){
    if(!validateEngineDataByEngine(engine)) return false;

    const manufacturer = getManufacturerById(engine.manufacturer.id);
    if(!manufacturer) return false;

    return true;
}
