export function validateCarDataByCar(car) {

  const allowedCarFields = ['id', 'mark', 'age', 'color', 'engine'];
  if (!areOnlyAllowedFields(car, allowedCarFields)) return false;

  if (typeof car.id !== 'number') return false;
  if (typeof car.mark !== 'string') return false;
  if (typeof car.age !== 'number') return false;
  if (typeof car.color !== 'string') return false;

  const engine = car.engine;
  if(!validateEngineDataByEngine(engine)) return false;

  return true;
}

export function validateEngineDataByEngine(engine) {

  const allowedEngineFields = ['id', 'horsepower', 'fuelType', 'capacity', 'cylinders', 'manufacturer'];
  if (!areOnlyAllowedFields(engine, allowedEngineFields)) return false;


  if (!engine) return false;
  if (typeof engine.id !== 'number') return false;
  if (typeof engine.horsepower !== 'number') return false;
  if (typeof engine.fuelType !== 'string') return false;
  if (typeof engine.capacity !== 'number') return false;
  if (typeof engine.cylinders !== 'number') return false;

  const manufacturer = engine.manufacturer;
  if(!validateManufacturerDataByManufacturer(manufacturer)) return false;

  return true;
}

export function validateManufacturerDataByManufacturer(manufacturer) {
  const allowedManufacturerFields = ['id', 'name', 'country'];
  if (!areOnlyAllowedFields(manufacturer, allowedManufacturerFields)) return false;

  if (!manufacturer || typeof manufacturer.id !== 'number' || typeof manufacturer.name !== 'string' || typeof manufacturer.country !== 'string') {
    return false;
  }

  return true;
}

// Pomocnicza funkcja, ktora sprawdza czy obiekt zawiera tylko dozwolone pola
function areOnlyAllowedFields(obj, allowedFields) {
  const objKeys = Object.keys(obj);

  return objKeys.every(key => allowedFields.includes(key));
}