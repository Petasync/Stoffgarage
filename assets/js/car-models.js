// STOFFGARAGE - Real Car Models Database
// Organized by size category for configurator

const carModels = {
  // Größe S (380-405cm) - Kleinwagen
  S: {
    size: 'S (380-405cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Polo', length: 404 },
      { make: 'VW', model: 'up!', length: 361 },
      { make: 'Audi', model: 'A1', length: 404 },
      { make: 'Mini', model: 'Cooper 3-Türer', length: 384 },
      { make: 'Smart', model: 'ForFour', length: 353 },
      { make: 'Ford', model: 'Fiesta', length: 404 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Yaris', length: 395 },
      { make: 'Mazda', model: '2', length: 405 },
      { make: 'Honda', model: 'Jazz', length: 399 },
      { make: 'Suzuki', model: 'Swift', length: 384 },
      { make: 'Suzuki', model: 'Ignis', length: 377 },

      // Französische & Italienische Hersteller
      { make: 'Renault', model: 'Clio', length: 405 },
      { make: 'Fiat', model: '500', length: 363 },
      { make: 'Fiat', model: 'Panda', length: 365 },
      { make: 'Citroën', model: 'C3', length: 399 },
      { make: 'Dacia', model: 'Sandero', length: 405 }
    ]
  },

  // Größe M (406-432cm) - Kompaktklasse
  M: {
    size: 'M (406-432cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Golf', length: 430 },
      { make: 'VW', model: 'ID.3', length: 426 },
      { make: 'VW', model: 'T-Roc', length: 426 },
      { make: 'BMW', model: '1er (F40)', length: 429 },
      { make: 'Opel', model: 'Corsa', length: 406 },
      { make: 'Opel', model: 'Grandland', length: 446 },
      { make: 'Mini', model: 'Clubman', length: 427 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'C-HR', length: 436 },
      { make: 'Mazda', model: 'CX-30', length: 434 },
      { make: 'Nissan', model: 'Juke', length: 421 },
      { make: 'Honda', model: 'HR-V', length: 434 },

      // Französische Hersteller
      { make: 'Peugeot', model: '208', length: 406 },
      { make: 'Peugeot', model: '2008', length: 430 },
      { make: 'Renault', model: 'Captur', length: 421 },
      { make: 'Citroën', model: 'C4', length: 431 },
      { make: 'Citroën', model: 'C4 Cactus', length: 420 },

      // Weitere
      { make: 'Seat', model: 'Ibiza', length: 406 },
      { make: 'Seat', model: 'Leon', length: 430 },
      { make: 'Seat', model: 'Arona', length: 418 },
      { make: 'Skoda', model: 'Fabia', length: 415 },
      { make: 'Skoda', model: 'Kamiq', length: 426 },
      { make: 'Hyundai', model: 'Kona', length: 419 },
      { make: 'Kia', model: 'Stonic', length: 410 }
    ]
  },

  // Größe L (433-457cm) - Mittelklasse
  L: {
    size: 'L (433-457cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'ID.4', length: 458 },
      { make: 'BMW', model: 'X1', length: 443 },
      { make: 'BMW', model: 'X3', length: 452 },
      { make: 'Audi', model: 'Q3', length: 451 },
      { make: 'Mercedes-Benz', model: 'GLA', length: 441 },
      { make: 'Mercedes-Benz', model: 'GLB', length: 463 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'RAV4', length: 458 },
      { make: 'Mazda', model: 'CX-5', length: 454 },
      { make: 'Honda', model: 'CR-V', length: 453 },
      { make: 'Nissan', model: 'Qashqai', length: 443 },

      // Weitere
      { make: 'Skoda', model: 'Karoq', length: 444 },
      { make: 'Volvo', model: 'XC40', length: 442 },
      { make: 'Peugeot', model: '3008', length: 447 }
    ]
  },

  // Größe XL (458-485cm) - Obere Mittelklasse & Große SUVs
  XL: {
    size: 'XL (458-485cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Passat', length: 476 },
      { make: 'VW', model: 'Arteon', length: 488 },
      { make: 'Audi', model: 'A4', length: 472 },
      { make: 'Audi', model: 'A5 Sportback', length: 477 },
      { make: 'Audi', model: 'A6', length: 494 },
      { make: 'Audi', model: 'Q5', length: 467 },
      { make: 'BMW', model: '3er Limousine', length: 470 },
      { make: 'BMW', model: '4er Coupé', length: 471 },
      { make: 'BMW', model: '5er Limousine', length: 493 },
      { make: 'BMW', model: 'X5', length: 493 },
      { make: 'Mercedes-Benz', model: 'C-Klasse', length: 474 },
      { make: 'Mercedes-Benz', model: 'E-Klasse', length: 493 },
      { make: 'Mercedes-Benz', model: 'GLC', length: 476 },
      { make: 'Mercedes-Benz', model: 'GLE', length: 497 },
      { make: 'Porsche', model: 'Cayenne', length: 494 },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Camry', length: 488 },
      { make: 'Mazda', model: '6', length: 489 },
      { make: 'Honda', model: 'Accord', length: 489 },
      { make: 'Lexus', model: 'RX', length: 490 },

      // Französische Hersteller
      { make: 'Peugeot', model: '508', length: 476 },
      { make: 'Renault', model: 'Talisman', length: 484 },

      // Weitere
      { make: 'Skoda', model: 'Superb', length: 491 },
      { make: 'Volvo', model: 'S60', length: 475 },
      { make: 'Volvo', model: 'XC60', length: 476 },
      { make: 'Tesla', model: 'Model 3', length: 469 }
    ]
  },

  // Van - Mittelgroß (M)
  VAN_M: {
    size: 'M (450-485cm)',
    models: [
      { make: 'VW', model: 'Caddy', length: 472 },
      { make: 'VW', model: 'Caddy Maxi', length: 483 },
      { make: 'Ford', model: 'Tourneo Connect', length: 463 },
      { make: 'Opel', model: 'Combo Life XL', length: 475 },
      { make: 'Citroën', model: 'Berlingo XL', length: 475 },
      { make: 'Peugeot', model: 'Rifter Long', length: 475 },
      { make: 'Mercedes-Benz', model: 'Citan Tourer', length: 454 },
      { make: 'Renault', model: 'Kangoo', length: 448 }
    ]
  },

  // Van - Groß (L)
  VAN_L: {
    size: 'L (480-530cm)',
    models: [
      { make: 'VW', model: 'Multivan T6.1', length: 497 },
      { make: 'VW', model: 'Caravelle', length: 497 },
      { make: 'Mercedes-Benz', model: 'V-Klasse kompakt', length: 511 },
      { make: 'Ford', model: 'Tourneo Custom', length: 516 },
      { make: 'Opel', model: 'Zafira Life M', length: 495 },
      { make: 'Opel', model: 'Zafira Life L', length: 530 },
      { make: 'Peugeot', model: 'Traveller Compact', length: 495 },
      { make: 'Peugeot', model: 'Traveller Long', length: 530 },
      { make: 'Citroën', model: 'SpaceTourer M', length: 495 },
      { make: 'Citroën', model: 'SpaceTourer L', length: 530 },
      { make: 'Toyota', model: 'Proace Verso Medium', length: 495 },
      { make: 'Nissan', model: 'Primastar', length: 495 }
    ]
  },

  // Pickup - Mittel (M)
  PICKUP_M: {
    size: 'M (480-520cm)',
    models: [
      { make: 'VW', model: 'Amarok', length: 523 },
      { make: 'Mercedes-Benz', model: 'X-Klasse', length: 524 },
      { make: 'Nissan', model: 'Navara Double Cab', length: 521 },
      { make: 'Mitsubishi', model: 'L200 Double Cab', length: 519 },
      { make: 'Isuzu', model: 'D-Max Double Cab', length: 530 },
      { make: 'Ssangyong', model: 'Musso Grand', length: 519 },
      { make: 'Fiat', model: 'Fullback Double Cab', length: 523 }
    ]
  },

  // Pickup - Groß (L)
  PICKUP_L: {
    size: 'L (520-560cm)',
    models: [
      { make: 'Toyota', model: 'Hilux Double Cab', length: 530 },
      { make: 'Ford', model: 'Ranger Double Cab', length: 531 },
      { make: 'Ford', model: 'Ranger Raptor', length: 543 },
      { make: 'Toyota', model: 'Hilux Extra Cab', length: 534 },
      { make: 'Nissan', model: 'Navara King Cab', length: 534 },
      { make: 'Mazda', model: 'BT-50 Double Cab', length: 530 }
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
