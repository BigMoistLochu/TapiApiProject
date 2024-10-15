export function validate(car) {
    if (typeof car.id !== 'number') return false;
    if (typeof car.mark !== 'string') return false;
    if (typeof car.age !== 'number') return false;
    if (typeof car.color !== 'string') return false;
    
    const engine = car.engine;
    if (!engine || typeof engine.horsepower !== 'number' || typeof engine.fuelType !== 'string' || typeof engine.capacity !== 'number' || typeof engine.cylinders !== 'number') {
      return false;
    }
  
    const manufacturer = engine.manufacturer;
    if (!manufacturer || typeof manufacturer.name !== 'string' || typeof manufacturer.country !== 'string') {
      return false;
    }
  
    return true;
  }