// STOFFGARAGE - Real Car Models Database
// Organized by size category for configurator

const carModels = {
  // Größe S (380-405cm) - Kleinwagen
  S: {
    size: 'S (380-405cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Polo', length: 404, bodyType: 'hatchback' },
      { make: 'VW', model: 'up!', length: 361, bodyType: 'hatchback' },
      { make: 'Audi', model: 'A1', length: 404, bodyType: 'hatchback' },
      { make: 'Mini', model: 'Cooper 3-Türer', length: 384, bodyType: 'hatchback' },
      { make: 'Smart', model: 'ForFour', length: 353, bodyType: 'hatchback' },
      { make: 'Ford', model: 'Fiesta', length: 404, bodyType: 'hatchback' },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Yaris', length: 395, bodyType: 'hatchback' },
      { make: 'Mazda', model: '2', length: 405, bodyType: 'hatchback' },
      { make: 'Honda', model: 'Jazz', length: 399, bodyType: 'hatchback' },
      { make: 'Suzuki', model: 'Swift', length: 384, bodyType: 'hatchback' },
      { make: 'Suzuki', model: 'Ignis', length: 377, bodyType: 'hatchback' },

      // Französische & Italienische Hersteller
      { make: 'Renault', model: 'Clio', length: 405, bodyType: 'hatchback' },
      { make: 'Fiat', model: '500', length: 363, bodyType: 'hatchback' },
      { make: 'Fiat', model: 'Panda', length: 365, bodyType: 'hatchback' },
      { make: 'Citroën', model: 'C3', length: 399, bodyType: 'hatchback' },
      { make: 'Dacia', model: 'Sandero', length: 405, bodyType: 'hatchback' }
    ]
  },

  // Größe M (406-432cm) - Kompaktklasse
  M: {
    size: 'M (406-432cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'Golf', length: 430, bodyType: 'hatchback' },
      { make: 'VW', model: 'ID.3', length: 426, bodyType: 'hatchback' },
      { make: 'VW', model: 'T-Roc', length: 426, bodyType: 'suv' },
      { make: 'BMW', model: '1er (F40)', length: 429, bodyType: 'hatchback' },
      { make: 'Opel', model: 'Corsa', length: 406, bodyType: 'hatchback' },
      { make: 'Opel', model: 'Grandland', length: 446, bodyType: 'suv' },
      { make: 'Mini', model: 'Clubman', length: 427, bodyType: 'wagon' },

      // Japanische Hersteller
      { make: 'Toyota', model: 'C-HR', length: 436, bodyType: 'suv' },
      { make: 'Mazda', model: 'CX-30', length: 434, bodyType: 'suv' },
      { make: 'Nissan', model: 'Juke', length: 421, bodyType: 'suv' },
      { make: 'Honda', model: 'HR-V', length: 434, bodyType: 'suv' },

      // Französische Hersteller
      { make: 'Peugeot', model: '208', length: 406, bodyType: 'hatchback' },
      { make: 'Peugeot', model: '2008', length: 430, bodyType: 'suv' },
      { make: 'Renault', model: 'Captur', length: 421, bodyType: 'suv' },
      { make: 'Citroën', model: 'C4', length: 431, bodyType: 'hatchback' },
      { make: 'Citroën', model: 'C4 Cactus', length: 420, bodyType: 'suv' },

      // Weitere
      { make: 'Seat', model: 'Ibiza', length: 406, bodyType: 'hatchback' },
      { make: 'Seat', model: 'Leon', length: 430, bodyType: 'hatchback' },
      { make: 'Seat', model: 'Arona', length: 418, bodyType: 'suv' },
      { make: 'Skoda', model: 'Fabia', length: 415, bodyType: 'hatchback' },
      { make: 'Skoda', model: 'Kamiq', length: 426, bodyType: 'suv' },
      { make: 'Hyundai', model: 'Kona', length: 419, bodyType: 'suv' },
      { make: 'Kia', model: 'Stonic', length: 410, bodyType: 'suv' }
    ]
  },

  // Größe L (433-457cm) - Mittelklasse SUVs
  L: {
    size: 'L (433-457cm)',
    models: [
      // Deutsche Hersteller
      { make: 'VW', model: 'ID.4', length: 458, bodyType: 'suv' },
      { make: 'BMW', model: 'X1', length: 443, bodyType: 'suv' },
      { make: 'BMW', model: 'X3', length: 452, bodyType: 'suv' },
      { make: 'Audi', model: 'Q3', length: 451, bodyType: 'suv' },
      { make: 'Mercedes-Benz', model: 'GLA', length: 441, bodyType: 'suv' },
      { make: 'Mercedes-Benz', model: 'GLB', length: 463, bodyType: 'suv' },

      // Japanische Hersteller
      { make: 'Toyota', model: 'RAV4', length: 458, bodyType: 'suv' },
      { make: 'Mazda', model: 'CX-5', length: 454, bodyType: 'suv' },
      { make: 'Honda', model: 'CR-V', length: 453, bodyType: 'suv' },
      { make: 'Nissan', model: 'Qashqai', length: 443, bodyType: 'suv' },

      // Weitere
      { make: 'Skoda', model: 'Karoq', length: 444, bodyType: 'suv' },
      { make: 'Volvo', model: 'XC40', length: 442, bodyType: 'suv' },
      { make: 'Peugeot', model: '3008', length: 447, bodyType: 'suv' }
    ]
  },

  // Größe XL (458-485cm) - Obere Mittelklasse & Große SUVs
  XL: {
    size: 'XL (458-485cm)',
    models: [
      // Deutsche Hersteller - Limousinen
      { make: 'VW', model: 'Passat', length: 476, bodyType: 'sedan' },
      { make: 'VW', model: 'Arteon', length: 488, bodyType: 'sedan' },
      { make: 'Audi', model: 'A4', length: 472, bodyType: 'sedan' },
      { make: 'Audi', model: 'A5 Sportback', length: 477, bodyType: 'sedan' },
      { make: 'Audi', model: 'A6', length: 494, bodyType: 'sedan' },
      { make: 'Audi', model: 'Q5', length: 467, bodyType: 'suv' },
      { make: 'BMW', model: '3er Limousine', length: 470, bodyType: 'sedan' },
      { make: 'BMW', model: '4er Coupé', length: 471, bodyType: 'sedan' },
      { make: 'BMW', model: '5er Limousine', length: 493, bodyType: 'sedan' },
      { make: 'BMW', model: 'X5', length: 493, bodyType: 'suv' },
      { make: 'Mercedes-Benz', model: 'C-Klasse', length: 474, bodyType: 'sedan' },
      { make: 'Mercedes-Benz', model: 'E-Klasse', length: 493, bodyType: 'sedan' },
      { make: 'Mercedes-Benz', model: 'GLC', length: 476, bodyType: 'suv' },
      { make: 'Mercedes-Benz', model: 'GLE', length: 497, bodyType: 'suv' },
      { make: 'Porsche', model: 'Cayenne', length: 494, bodyType: 'suv' },

      // Japanische Hersteller
      { make: 'Toyota', model: 'Camry', length: 488, bodyType: 'sedan' },
      { make: 'Mazda', model: '6', length: 489, bodyType: 'sedan' },
      { make: 'Honda', model: 'Accord', length: 489, bodyType: 'sedan' },
      { make: 'Lexus', model: 'RX', length: 490, bodyType: 'suv' },

      // Französische Hersteller
      { make: 'Peugeot', model: '508', length: 476, bodyType: 'sedan' },
      { make: 'Renault', model: 'Talisman', length: 484, bodyType: 'sedan' },

      // Weitere
      { make: 'Skoda', model: 'Superb', length: 491, bodyType: 'sedan' },
      { make: 'Volvo', model: 'S60', length: 475, bodyType: 'sedan' },
      { make: 'Volvo', model: 'XC60', length: 476, bodyType: 'suv' },
      { make: 'Tesla', model: 'Model 3', length: 469, bodyType: 'sedan' }
    ]
  },

  // Van - Mittelgroß (M)
  VAN_M: {
    size: 'M (450-485cm)',
    models: [
      { make: 'VW', model: 'Caddy', length: 472, bodyType: 'van' },
      { make: 'VW', model: 'Caddy Maxi', length: 483, bodyType: 'van' },
      { make: 'Ford', model: 'Tourneo Connect', length: 463, bodyType: 'van' },
      { make: 'Opel', model: 'Combo Life XL', length: 475, bodyType: 'van' },
      { make: 'Citroën', model: 'Berlingo XL', length: 475, bodyType: 'van' },
      { make: 'Peugeot', model: 'Rifter Long', length: 475, bodyType: 'van' },
      { make: 'Mercedes-Benz', model: 'Citan Tourer', length: 454, bodyType: 'van' },
      { make: 'Renault', model: 'Kangoo', length: 448, bodyType: 'van' }
    ]
  },

  // Van - Groß (L)
  VAN_L: {
    size: 'L (480-530cm)',
    models: [
      { make: 'VW', model: 'Multivan T6.1', length: 497, bodyType: 'van' },
      { make: 'VW', model: 'Caravelle', length: 497, bodyType: 'van' },
      { make: 'Mercedes-Benz', model: 'V-Klasse kompakt', length: 511, bodyType: 'van' },
      { make: 'Ford', model: 'Tourneo Custom', length: 516, bodyType: 'van' },
      { make: 'Opel', model: 'Zafira Life M', length: 495, bodyType: 'van' },
      { make: 'Opel', model: 'Zafira Life L', length: 530, bodyType: 'van' },
      { make: 'Peugeot', model: 'Traveller Compact', length: 495, bodyType: 'van' },
      { make: 'Peugeot', model: 'Traveller Long', length: 530, bodyType: 'van' },
      { make: 'Citroën', model: 'SpaceTourer M', length: 495, bodyType: 'van' },
      { make: 'Citroën', model: 'SpaceTourer L', length: 530, bodyType: 'van' },
      { make: 'Toyota', model: 'Proace Verso Medium', length: 495, bodyType: 'van' },
      { make: 'Nissan', model: 'Primastar', length: 495, bodyType: 'van' }
    ]
  },

  // Pickup - Mittel (M)
  PICKUP_M: {
    size: 'M (480-520cm)',
    models: [
      { make: 'VW', model: 'Amarok', length: 523, bodyType: 'pickup' },
      { make: 'Mercedes-Benz', model: 'X-Klasse', length: 524, bodyType: 'pickup' },
      { make: 'Nissan', model: 'Navara Double Cab', length: 521, bodyType: 'pickup' },
      { make: 'Mitsubishi', model: 'L200 Double Cab', length: 519, bodyType: 'pickup' },
      { make: 'Isuzu', model: 'D-Max Double Cab', length: 530, bodyType: 'pickup' },
      { make: 'Ssangyong', model: 'Musso Grand', length: 519, bodyType: 'pickup' },
      { make: 'Fiat', model: 'Fullback Double Cab', length: 523, bodyType: 'pickup' }
    ]
  },

  // Pickup - Groß (L)
  PICKUP_L: {
    size: 'L (520-560cm)',
    models: [
      { make: 'Toyota', model: 'Hilux Double Cab', length: 530, bodyType: 'pickup' },
      { make: 'Ford', model: 'Ranger Double Cab', length: 531, bodyType: 'pickup' },
      { make: 'Ford', model: 'Ranger Raptor', length: 543, bodyType: 'pickup' },
      { make: 'Toyota', model: 'Hilux Extra Cab', length: 534, bodyType: 'pickup' },
      { make: 'Nissan', model: 'Navara King Cab', length: 534, bodyType: 'pickup' },
      { make: 'Mazda', model: 'BT-50 Double Cab', length: 530, bodyType: 'pickup' }
    ]
  },

  // Wohnmobile
  WOHNMOBIL_S: {
    size: 'S (550-580cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L2H2', length: 567, bodyType: 'van' },
      { make: 'Mercedes-Benz', model: 'Sprinter kompakt', length: 572, bodyType: 'van' },
      { make: 'VW', model: 'Crafter kurz', length: 565, bodyType: 'van' },
      { make: 'Peugeot', model: 'Boxer L2H2', length: 567, bodyType: 'van' },
      { make: 'Citroën', model: 'Jumper L2H2', length: 567, bodyType: 'van' }
    ]
  },

  WOHNMOBIL_M: {
    size: 'M (620-650cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L3H2', length: 639, bodyType: 'van' },
      { make: 'Mercedes-Benz', model: 'Sprinter mittel', length: 632, bodyType: 'van' },
      { make: 'VW', model: 'Crafter mittel', length: 636, bodyType: 'van' },
      { make: 'Ford', model: 'Transit L3H2', length: 631, bodyType: 'van' },
      { make: 'Renault', model: 'Master L3H2', length: 632, bodyType: 'van' }
    ]
  },

  WOHNMOBIL_L: {
    size: 'L (700-750cm)',
    models: [
      { make: 'Fiat', model: 'Ducato L4H3', length: 706, bodyType: 'van' },
      { make: 'Fiat', model: 'Ducato L5H3', length: 738, bodyType: 'van' },
      { make: 'Mercedes-Benz', model: 'Sprinter lang', length: 729, bodyType: 'van' },
      { make: 'Iveco', model: 'Daily L4H2', length: 707, bodyType: 'van' },
      { make: 'MAN', model: 'TGE L4H3', length: 704, bodyType: 'van' }
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
        exactLength: found.length,
        bodyType: found.bodyType
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
