import { engines } from '../fakeDataBase/engine-data.js';



export function getAllEngines(){
    return engines;
}

export function getEngineById(id){
    return engines.find((engine)=> engine.id===id);
}
