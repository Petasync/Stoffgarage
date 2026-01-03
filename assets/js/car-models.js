// STOFFGARAGE - Real Car Models Database
// Organized by size category for configurator

const carModels = {
  // Größe S (380-405cm) - Kleinwagen & Kompaktwagen
  S: {
    size: 'S (380-405cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Polo', length: 404 },
      { make: 'VW', model: 'up!', length: 361 },
      { make: 'Audi', model: 'A1', length: 404 },
      { make: 'BMW', model: '1er (F40)', length: 429 },
      { make: 'Mercedes-Benz', model: 'A-Klasse (W177)', length: 439 },
      { make: 'Mini', model: 'Cooper 3-Türer', length: 384 },
      { make: 'Opel', model: 'Corsa', length: 406 },
      { make: 'Ford', model: 'Fiesta', length: 404 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Yaris', length: 395 },
      { make: 'Mazda', model: '2', length: 405 },
      { make: 'Honda', model: 'Jazz', length: 399 },
      { make: 'Suzuki', model: 'Swift', length: 384 },

      // Französische & Italienische Hersteller
      { make: 'Peugeot', model: '208', length: 406 },
      { make: 'Renault', model: 'Clio', length: 405 },
      { make: 'Fiat', model: '500', length: 363 },
      { make: 'Citroën', model: 'C3', length: 399 },

      // Weitere
      { make: 'Seat', model: 'Ibiza', length: 406 },
      { make: 'Skoda', model: 'Fabia', length: 415 }
    ]
  },

  // Größe M (406-432cm) - Kompaktklasse & untere Mittelklasse
  M: {
    size: 'M (406-432cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Golf', length: 430 },
      { make: 'VW', model: 'ID.3', length: 426 },
      { make: 'Audi', model: 'A3', length: 437 },
      { make: 'BMW', model: '2er Active Tourer', length: 442 },
      { make: 'Mercedes-Benz', model: 'B-Klasse', length: 446 },
      { make: 'Opel', model: 'Astra', length: 436 },
      { make: 'Ford', model: 'Focus', length: 437 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Corolla', length: 446 },
      { make: 'Mazda', model: '3', length: 447 },
      { make: 'Honda', model: 'Civic', length: 453 },
      { make: 'Nissan', model: 'Leaf', length: 445 },

      // Französische Hersteller
      { make: 'Peugeot', model: '308', length: 434 },
      { make: 'Renault', model: 'Mégane', length: 433 },
      { make: 'Citroën', model: 'C4', length: 431 },

      // Weitere
      { make: 'Seat', model: 'Leon', length: 430 },
      { make: 'Skoda', model: 'Octavia', length: 463 },
      { make: 'Hyundai', model: 'i30', length: 435 },
      { make: 'Kia', model: 'Ceed', length: 434 }
    ]
  },

  // Größe L (433-457cm) - Mittelklasse
  L: {
    size: 'L (433-457cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Passat', length: 476 },
      { make: 'VW', model: 'ID.4', length: 458 },
      { make: 'Audi', model: 'A4', length: 472 },
      { make: 'Audi', model: 'A5 Sportback', length: 477 },
      { make: 'BMW', model: '3er Limousine (G20)', length: 470 },
      { make: 'BMW', model: '4er Coupé', length: 471 },
      { make: 'Mercedes-Benz', model: 'C-Klasse Limousine', length: 474 },
      { make: 'Mercedes-Benz', model: 'GLC', length: 476 },
      { make: 'Opel', model: 'Insignia', length: 489 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Camry', length: 488 },
      { make: 'Mazda', model: '6', length: 489 },
      { make: 'Honda', model: 'Accord', length: 489 },

      // Französische Hersteller
      { make: 'Peugeot', model: '508', length: 476 },
      { make: 'Renault', model: 'Talisman', length: 484 },

      // Weitere
      { make: 'Skoda', model: 'Superb', length: 491 },
      { make: 'Tesla', model: 'Model 3', length: 469 },
      { make: 'Volvo', model: 'S60', length: 475 }
    ]
  },

  // Größe XL (458-485cm) - Obere Mittelklasse & Oberklasse
  XL: {
    size: 'XL (458-485cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Arteon', length: 488 },
      { make: 'Audi', model: 'A6', length: 494 },
      { make: 'Audi', model: 'A7 Sportback', length: 498 },
      { make: 'Audi', model: 'Q7', length: 505 },
      { make: 'BMW', model: '5er Limousine (G30)', length: 493 },
      { make: 'BMW', model: 'X5', length: 493 },
      { make: 'Mercedes-Benz', model: 'E-Klasse Limousine', length: 493 },
      { make: 'Mercedes-Benz', model: 'GLE', length: 497 },
      { make: 'Porsche', model: 'Panamera', length: 502 },
      { make: 'Porsche', model: 'Cayenne', length: 494 },

      // Premium & Luxus
      { make: 'BMW', model: '7er (G70)', length: 530 },
      { make: 'Audi', model: 'A8', length: 518 },
      { make: 'Mercedes-Benz', model: 'S-Klasse', length: 518 },
      { make: 'Tesla', model: 'Model S', length: 502 },
      { make: 'Tesla', model: 'Model X', length: 505 },

      // SUVs
      { make: 'VW', model: 'Touareg', length: 488 },
      { make: 'Volvo', model: 'XC90', length: 498 },
      { make: 'Land Rover', model: 'Discovery', length: 498 }
    ]
  },

  // Van - Mittelgroß (M)
  VAN_M: {
    size: 'M (450-485cm)',
    models: [
      { make: 'VW', model: 'Caddy', length: 472 },
      { make: 'VW', model: 'Multivan T6.1', length: 497 },
      { make: 'Mercedes-Benz', model: 'V-Klasse kompakt', length: 511 },
      { make: 'Ford', model: 'Tourneo Custom', length: 516 },
      { make: 'Opel', model: 'Zafira Life M', length: 495 },
      { make: 'Peugeot', model: 'Traveller Compact', length: 495 },
      { make: 'Citroën', model: 'SpaceTourer M', length: 495 },
      { make: 'Toyota', model: 'Proace Verso Medium', length: 495 },
      { make: 'Nissan', model: 'Primastar', length: 495 }
    ]
  },

  // Van - Groß (L)
  VAN_L: {
    size: 'L (480-530cm)',
    models: [
      { make: 'VW', model: 'Multivan T6.1 Lang', length: 539 },
      { make: 'VW', model: 'Crafter', length: 599 },
      { make: 'Mercedes-Benz', model: 'V-Klasse lang', length: 537 },
      { make: 'Mercedes-Benz', model: 'Sprinter', length: 600 },
      { make: 'Ford', model: 'Transit Custom Lang', length: 536 },
      { make: 'Ford', model: 'Transit', length: 607 },
      { make: 'Opel', model: 'Zafira Life L', length: 530 },
      { make: 'Peugeot', model: 'Traveller Long', length: 530 },
      { make: 'Fiat', model: 'Ducato', length: 600 }
    ]
  },

  // Pickup - Mittel (M)
  PICKUP_M: {
    size: 'M (480-520cm)',
    models: [
      { make: 'VW', model: 'Amarok', length: 523 },
      { make: 'Mercedes-Benz', model: 'X-Klasse', length: 524 },
      { make: 'Nissan', model: 'Navara Double Cab', length: 521 },
      { make: 'Toyota', model: 'Hilux Double Cab', length: 530 },
      { make: 'Ford', model: 'Ranger Double Cab', length: 531 },
      { make: 'Mitsubishi', model: 'L200 Double Cab', length: 519 },
      { make: 'Isuzu', model: 'D-Max Double Cab', length: 530 }
    ]
  },

  // Pickup - Groß (L)
  PICKUP_L: {
    size: 'L (520-560cm)',
    models: [
      { make: 'Ford', model: 'Ranger Raptor', length: 543 },
      { make: 'Ford', model: 'F-150', length: 586 },
      { make: 'RAM', model: '1500 Crew Cab', length: 579 },
      { make: 'Toyota', model: 'Tundra Crew Max', length: 583 },
      { make: 'Nissan', model: 'Titan Crew Cab', length: 578 },
      { make: 'Chevrolet', model: 'Silverado 1500', length: 583 },
      { make: 'GMC', model: 'Sierra 1500', length: 583 }
    ]
  },

  // Wohnmobile
  WOHNMOBIL_S: {
    size: 'S (550-580cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L2H2', length: 567 },
      { make: 'Mercedes-Benz', model: 'Sprinter kompakt', length: 572 },
      { make: 'VW', model: 'Crafter kurz', length: 565 },
      { make: 'Peugeot', model: 'Boxer L2H2', length: 567 },
      { make: 'Citroën', model: 'Jumper L2H2', length: 567 }
    ]
  },

  WOHNMOBIL_M: {
    size: 'M (620-650cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L3H2', length: 639 },
      { make: 'Mercedes-Benz', model: 'Sprinter mittel', length: 632 },
      { make: 'VW', model: 'Crafter mittel', length: 636 },
      { make: 'Ford', model: 'Transit L3H2', length: 631 },
      { make: 'Renault', model: 'Master L3H2', length: 632 }
    ]
  },

  WOHNMOBIL_L: {
    size: 'L (700-750cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L4H3', length: 706 },
      { make: 'Fiat', model: 'Ducato L5H3', length: 738 },
      { make: 'Mercedes-Benz', model: 'Sprinter lang', length: 729 },
      { make: 'Iveco', model: 'Daily L4H2', length: 707 },
      { make: 'MAN', model: 'TGE L4H3', length: 704 }
    ]
  }
};

// Function to get models by size
function getModelsBySize(sizeCode) {
  return carModels[sizeCode]?.models || [];
}

// Function to find size for specific car
function findSizeForCar(make, model) {
  for (const [sizeCode, data] of Object.entries(carModels)) {
    const found = data.models.find(
      car => car.make.toLowerCase() === make.toLowerCase() &&
             car.model.toLowerCase().includes(model.toLowerCase())
    );
    if (found) {
      return {
        sizeCode,
        size: data.size,
        exactLength: found.length
      };
    }
  }
  return null;
}

// Function to search models
function searchModels(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  for (const [sizeCode, data] of Object.entries(carModels)) {
    const matches = data.models.filter(
      car => car.make.toLowerCase().includes(lowerQuery) ||
             car.model.toLowerCase().includes(lowerQuery)
    );
    if (matches.length > 0) {
      results.push({
        sizeCode,
        size: data.size,
        models: matches
      });
    }
  }
  return results;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { carModels, getModelsBySize, findSizeForCar, searchModels };
}
