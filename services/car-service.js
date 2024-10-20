import { cars } from '../fakeDataBase/cars-data.js'
import { validateCarDataByCar} from './validationData/validation-data.js';
import { getEngineById } from './engine-service.js';
import { getManufacturerById } from './manufacturer-service.js';

export function getAllCars(){
    return cars;
}

export function createCar(car){
    car.id = cars.length+1;
    cars.push(car);
}

export function deleteCarById(id){
    cars.splice(id-1, 1);
}


export function getCarById(id){
    return cars.find((car)=> car.id === id);
}

/**
 * Sprawdza czy obiekt ktory przyszedl od klienta ma wszystkie typy,pola oraz czy id silnika i producenta istnieja
* @returns {boolean} - Return true jesli wszystko ok, w innym wypadku false
 */
export function validateCar(car){
    if(!validateCarDataByCar(car)) return false;

    const engine = getEngineById(car.engine.id);
    if(!engine) return false;

    const manufacturer = getManufacturerById(engine.manufacturer.id);
    if(!manufacturer) return false;

    return true;
}

export function getEngineByEngineId(id){
    return getEngineById(id);
}

