import {data} from './fake-database.js';


export function getAllCars(){
    return data;
}

export function getCarsByMark(){
    return data.forEach((car)=>{
        
    })
}

export function createCar(body){
    const { name, age, email } = body;
    console.log(name);
    console.log(age);
    console.log(email || "ape");
    data.push(body);
}