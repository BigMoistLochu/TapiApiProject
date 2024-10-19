export function validateCarDataByCar(car) {

  if (typeof car.id !== 'number') return false;
  if (typeof car.mark !== 'string') return false;
  if (typeof car.age !== 'number') return false;
  if (typeof car.color !== 'string') return false;

  const engine = car.engine;
  if(!validateEngineDataByEngine(engine)) return false;

  return true;
}

export function validateEngineDataByEngine(engine) {

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
  if (!manufacturer || typeof manufacturer.id !== 'number' || typeof manufacturer.name !== 'string' || typeof manufacturer.country !== 'string') {
    return false;
  }

  return true;
}