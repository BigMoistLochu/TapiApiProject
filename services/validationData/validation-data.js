import Joi from 'joi';

// Schemat walidacji dla producenta silnika
const manufacturerSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().min(1).required(),
  country: Joi.string().min(1).required()
});

// Schemat walidacji dla silnika
const engineSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  horsepower: Joi.number().integer().positive().required(),
  fuelType: Joi.string().valid('Benzyna', 'Diesel', 'Elektryczny', 'Hybryda').required(),
  capacity: Joi.number().positive().required(),
  cylinders: Joi.number().integer().positive().required(),
  manufacturer: manufacturerSchema.required()
});

// Schemat walidacji dla samochodu
const carSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  mark: Joi.string().min(1).required(),
  age: Joi.number().integer().positive().required(),
  color: Joi.string().min(1).required(),
  engine: engineSchema.required()
});

export function validateCar(car) {
  const { error } = carSchema.validate(car);
  if (error) {
    console.log('Błąd walidacji:', error.details);
    return false;
  }

  return true;
}

export function validateEngine(engine) {
  const { error } = engineSchema.validate(engine);
  if (error) {
    console.log('Błąd walidacji:', error.details);
    return false;
  }

  return true;
}

export function validateManufacturer(manufacturer) {
  const { error } = manufacturerSchema.validate(manufacturer);
  if (error) {
    console.log('Błąd walidacji:', error.details);
    return false;
  }

  return true;
}