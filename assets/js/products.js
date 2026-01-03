// STOFFGARAGE - Product Database
// All products organized by category

const products = {
  auto: [
    // Klassisch Serie
    {
      id: 'auto-klassisch-s',
      quality: 'Klassisch',
      size: 'S (380-405cm)',
      material: '4-lagig Polypropylen',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'elastisch'],
      description: 'Zuverlässiger Schutz für kleine PKW mit 4-lagigem Polypropylen-Material.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-klassisch-m',
      quality: 'Klassisch',
      size: 'M (406-432cm)',
      material: '4-lagig Polypropylen',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'elastisch'],
      description: 'Zuverlässiger Schutz für mittelgroße PKW mit 4-lagigem Polypropylen-Material.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-klassisch-l',
      quality: 'Klassisch',
      size: 'L (433-457cm)',
      material: '4-lagig Polypropylen',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'elastisch'],
      description: 'Zuverlässiger Schutz für große PKW mit 4-lagigem Polypropylen-Material.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-klassisch-xl',
      quality: 'Klassisch',
      size: 'XL (458-485cm)',
      material: '4-lagig Polypropylen',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'elastisch'],
      description: 'Zuverlässiger Schutz für sehr große PKW mit 4-lagigem Polypropylen-Material.',
      price: 'auf Anfrage'
    },

    // Praktisch Serie
    {
      id: 'auto-praktisch-s',
      quality: 'Praktisch',
      size: 'S (380-405cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Premium-Schutz mit zusätzlicher Mikrovlies-Schicht für kleine PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-praktisch-m',
      quality: 'Praktisch',
      size: 'M (406-432cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Premium-Schutz mit zusätzlicher Mikrovlies-Schicht für mittelgroße PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-praktisch-l',
      quality: 'Praktisch',
      size: 'L (433-457cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Premium-Schutz mit zusätzlicher Mikrovlies-Schicht für große PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-praktisch-xl',
      quality: 'Praktisch',
      size: 'XL (458-485cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Premium-Schutz mit zusätzlicher Mikrovlies-Schicht für sehr große PKW.',
      price: 'auf Anfrage'
    },

    // Premium Serie
    {
      id: 'auto-premium-s',
      quality: 'Premium',
      size: 'S (380-405cm)',
      material: '5-lagig Premium Softshell',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Hochwertige Softshell-Abdeckung mit Soft-Touch-Oberfläche für kleine PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-premium-m',
      quality: 'Premium',
      size: 'M (406-432cm)',
      material: '5-lagig Premium Softshell',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Hochwertige Softshell-Abdeckung mit Soft-Touch-Oberfläche für mittelgroße PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-premium-l',
      quality: 'Premium',
      size: 'L (433-457cm)',
      material: '5-lagig Premium Softshell',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Hochwertige Softshell-Abdeckung mit Soft-Touch-Oberfläche für große PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-premium-xl',
      quality: 'Premium',
      size: 'XL (458-485cm)',
      material: '5-lagig Premium Softshell',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Hochwertige Softshell-Abdeckung mit Soft-Touch-Oberfläche für sehr große PKW.',
      price: 'auf Anfrage'
    },

    // Exklusiv Serie
    {
      id: 'auto-exklusiv-s',
      quality: 'Exklusiv',
      size: 'S (380-405cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Absolute Top-Qualität mit 7-lagigem Material und Premium-Finish für kleine PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-exklusiv-m',
      quality: 'Exklusiv',
      size: 'M (406-432cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Absolute Top-Qualität mit 7-lagigem Material und Premium-Finish für mittelgroße PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-exklusiv-l',
      quality: 'Exklusiv',
      size: 'L (433-457cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Absolute Top-Qualität mit 7-lagigem Material und Premium-Finish für große PKW.',
      price: 'auf Anfrage'
    },
    {
      id: 'auto-exklusiv-xl',
      quality: 'Exklusiv',
      size: 'XL (458-485cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Absolute Top-Qualität mit 7-lagigem Material und Premium-Finish für sehr große PKW.',
      price: 'auf Anfrage'
    }
  ],

  van: [
    // Praktisch Serie
    {
      id: 'van-praktisch-m',
      quality: 'Praktisch',
      size: 'M (450-485cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Zuverlässiger Schutz für mittelgroße Vans und Kleinbusse.',
      price: 'auf Anfrage'
    },
    {
      id: 'van-praktisch-l',
      quality: 'Praktisch',
      size: 'L (480-530cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Zuverlässiger Schutz für große Vans und Kleinbusse.',
      price: 'auf Anfrage'
    },

    // Exklusiv Serie
    {
      id: 'van-exklusiv-m',
      quality: 'Exklusiv',
      size: 'M (450-485cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Premium-Schutz für mittelgroße Vans mit höchster Qualität.',
      price: 'auf Anfrage'
    },
    {
      id: 'van-exklusiv-l',
      quality: 'Exklusiv',
      size: 'L (480-530cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch'],
      description: 'Premium-Schutz für große Vans mit höchster Qualität.',
      price: 'auf Anfrage'
    },

    // Exklusiv mit seitlicher Öffnung
    {
      id: 'van-exklusiv-oeffnung-m',
      quality: 'Exklusiv mit Öffnung',
      size: 'M (450-485cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'seitliche-oeffnung'],
      description: 'Premium-Schutz mit seitlichem Reißverschluss für einfachen Zugang.',
      price: 'auf Anfrage'
    },
    {
      id: 'van-exklusiv-oeffnung-l',
      quality: 'Exklusiv mit Öffnung',
      size: 'L (480-530cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'seitliche-oeffnung'],
      description: 'Premium-Schutz mit seitlichem Reißverschluss für einfachen Zugang.',
      price: 'auf Anfrage'
    }
  ],

  pickup: [
    // Praktisch Serie
    {
      id: 'pickup-praktisch-m',
      quality: 'Praktisch',
      size: 'M (480-520cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Robuster Schutz für mittelgroße Pickup-Trucks.',
      price: 'auf Anfrage'
    },
    {
      id: 'pickup-praktisch-l',
      quality: 'Praktisch',
      size: 'L (520-560cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Robuster Schutz für große Pickup-Trucks.',
      price: 'auf Anfrage'
    },

    // Exklusiv Serie
    {
      id: 'pickup-exklusiv-m',
      quality: 'Exklusiv',
      size: 'M (480-520cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Premium-Schutz für mittelgroße Pickup-Trucks mit höchster Qualität.',
      price: 'auf Anfrage'
    },
    {
      id: 'pickup-exklusiv-l',
      quality: 'Exklusiv',
      size: 'L (520-560cm)',
      material: '7-lagig Exklusiv Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Premium-Schutz für große Pickup-Trucks mit höchster Qualität.',
      price: 'auf Anfrage'
    }
  ],

  wohnmobil: [
    {
      id: 'wohnmobil-s',
      quality: 'Standard',
      size: 'S (550-580cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Zuverlässiger Schutz für kompakte Wohnmobile.',
      price: 'auf Anfrage'
    },
    {
      id: 'wohnmobil-m',
      quality: 'Standard',
      size: 'M (620-650cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Zuverlässiger Schutz für mittelgroße Wohnmobile.',
      price: 'auf Anfrage'
    },
    {
      id: 'wohnmobil-l',
      quality: 'Standard',
      size: 'L (700-750cm)',
      material: '5-lagig mit Mikrovlies',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch'],
      description: 'Zuverlässiger Schutz für große Wohnmobile.',
      price: 'auf Anfrage'
    },
    {
      id: 'wohnmobil-premium-s',
      quality: 'Premium',
      size: 'S (550-580cm)',
      material: '7-lagig Premium Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Premium-Schutz für kompakte Wohnmobile mit höchster Qualität.',
      price: 'auf Anfrage'
    },
    {
      id: 'wohnmobil-premium-m',
      quality: 'Premium',
      size: 'M (620-650cm)',
      material: '7-lagig Premium Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Premium-Schutz für mittelgroße Wohnmobile mit höchster Qualität.',
      price: 'auf Anfrage'
    },
    {
      id: 'wohnmobil-premium-l',
      quality: 'Premium',
      size: 'L (700-750cm)',
      material: '7-lagig Premium Material',
      features: ['wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest', 'elastisch', 'softtouch', 'premium-finish'],
      description: 'Premium-Schutz für große Wohnmobile mit höchster Qualität.',
      price: 'auf Anfrage'
    }
  ],

  hagelschutz: [
    // PKW Hagelschutz
    {
      id: 'hagel-auto-s',
      quality: 'Hagelschutz Klasse 3',
      size: 'S (380-405cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für kleine PKW - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'PKW',
      price: 'auf Anfrage'
    },
    {
      id: 'hagel-auto-m',
      quality: 'Hagelschutz Klasse 3',
      size: 'M (406-432cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für mittelgroße PKW - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'PKW',
      price: 'auf Anfrage'
    },
    {
      id: 'hagel-auto-l',
      quality: 'Hagelschutz Klasse 3',
      size: 'L (433-457cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für große PKW - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'PKW',
      price: 'auf Anfrage'
    },
    {
      id: 'hagel-auto-xl',
      quality: 'Hagelschutz Klasse 3',
      size: 'XL (458-485cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für sehr große PKW - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'PKW',
      price: 'auf Anfrage'
    },

    // Van Hagelschutz
    {
      id: 'hagel-van-m',
      quality: 'Hagelschutz Klasse 3',
      size: 'M (450-485cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für mittelgroße Vans - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'Van',
      price: 'auf Anfrage'
    },
    {
      id: 'hagel-van-l',
      quality: 'Hagelschutz Klasse 3',
      size: 'L (480-530cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für große Vans - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'Van',
      price: 'auf Anfrage'
    },

    // Pickup Hagelschutz
    {
      id: 'hagel-pickup-m',
      quality: 'Hagelschutz Klasse 3',
      size: 'M (480-520cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für mittelgroße Pickups - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'Pickup',
      price: 'auf Anfrage'
    },
    {
      id: 'hagel-pickup-l',
      quality: 'Hagelschutz Klasse 3',
      size: 'L (520-560cm)',
      material: '8-lagig Spezial-Hagelschutz',
      features: ['hagelschutz-klasse-3', 'wasserdicht', 'uv-schutz', 'atmungsaktiv', 'kratzfest'],
      description: 'Professioneller Hagelschutz für große Pickups - schützt vor Hagel bis 4cm Durchmesser.',
      vehicleType: 'Pickup',
      price: 'auf Anfrage'
    }
  ]
};

// Feature Icons Mapping
const featureIcons = {
  'wasserdicht': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>',
  'uv-schutz': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>',
  'atmungsaktiv': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>',
  'kratzfest': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  'elastisch': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>',
  'softtouch': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
  'premium-finish': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>',
  'seitliche-oeffnung': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>',
  'hagelschutz-klasse-3': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
};

// Quality Descriptions
const qualityDescriptions = {
  'Klassisch': 'Zuverlässiger Schutz für den täglichen Gebrauch',
  'Praktisch': 'Premium-Qualität mit zusätzlicher Mikrovlies-Schicht',
  'Premium': 'Hochwertige Softshell-Technologie für maximalen Komfort',
  'Exklusiv': 'Absolute Top-Qualität mit 7-lagigem Premium-Material',
  'Exklusiv mit Öffnung': 'Top-Qualität mit praktischem Seitenzugang',
  'Standard': 'Bewährte Qualität für Wohnmobile',
  'Hagelschutz Klasse 3': 'Professioneller Schutz vor Hagel bis 4cm Durchmesser'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, featureIcons, qualityDescriptions };
}
