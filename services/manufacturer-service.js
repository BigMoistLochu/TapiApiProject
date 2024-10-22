import { manufacturers } from "../fakeDataBase/manufacturer-data.js"
import { validateManufacturer } from './validationData/validation-data.js';

export function getAllManufacturers() {
    return manufacturers;
}

export function getManufacturerById(id) {
    return manufacturers.find((manufacturer) => manufacturer.id === id);
}


export function createManufacturer(manufacturer) {
    manufacturer.id = manufacturers.length + 1;
    manufacturers.push(manufacturer);
}


export function deleteManufacturerById(id) {
    const indexToRemove = manufacturers.findIndex(manufacturer => manufacturer.id === id);
    manufacturers.splice(indexToRemove, 1);
}


export function isManufacturerDataValid(manufacturer) {
    return validateManufacturer(manufacturer);
}