import { manufacturers } from "../fakeDataBase/manufacturer-data.js"



export function getManufacturerById(id){
    return manufacturers.find((manufacturer)=> manufacturer.id===id);
}