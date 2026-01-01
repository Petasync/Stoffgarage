import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';

const products = [
  {
    title: 'Klassisch',
    description: 'Zuverlässiger Grundschutz für Ihr Fahrzeug zu einem günstigen Preis.',
    price: 'ab 89€',
    features: [
      'Wasserabweisend',
      'UV-beständig',
      'Atmungsaktiv',
      'Einfache Handhabung',
      'Für Innen- und Außenbereich',
    ],
    color: '#64748b',
  },
  {
    title: 'Praktisch',
    description: 'Optimaler Schutz mit zusätzlichen praktischen Features.',
    price: 'ab 129€',
    features: [
      'Wasserdicht (5.000 mm Wassersäule)',
      'Extra UV-Schutz',
      'Windfeste Befestigung',
      'Softfutter zum Lackschutz',
      'Reflektierende Elemente',
    ],
    color: '#0ea5e9',
  },
  {
    title: 'Premium',
    description: 'Hochwertige Materialien für maximalen Schutz und Langlebigkeit.',
    price: 'ab 199€',
    features: [
      'Vollständig wasserdicht (10.000 mm)',
      'Hagelschutz bis 4cm',
      'Premium-Softfutter',
      'Atmungsaktiv & schimmelfrei',
      'Diebstahlschutz mit Schloss',
    ],
    color: '#f59e0b',
  },
  {
    title: 'Exclusiv',
    description: 'Luxus-Abdeckung mit maßgeschneiderter Passform und Premium-Ausstattung.',
    price: 'ab 299€',
    features: [
      'Maßanfertigung für Ihr Fahrzeug',
      'Hagelschutz bis 6cm',
      'Luxus-Innenfutter',
      'Integriertes Alarm-System',
      '10 Jahre Garantie',
    ],
    color: '#d97706',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Products Section */}
      <section id="produkte" className="section bg-dark-800">
        <div className="container-custom">
          <h2 className="title-lg text-center gradient-text mb-6">
            Unsere Produktlinien
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            Von grundlegendem Schutz bis zur Luxus-Ausführung – finden Sie die perfekte
            Autoabdeckung für Ihre Bedürfnisse.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.title} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="konfigurator" className="section bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="title-lg gradient-text mb-6">
              3D Auto-Konfigurator
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Konfigurieren Sie Ihre perfekte Autoabdeckung in Echtzeit. Wählen Sie Fahrzeugtyp,
              Größe, Farbe und Produktlinie – sehen Sie das Ergebnis sofort in 3D.
            </p>
          </div>
          <Configurator />
        </div>
      </section>

      <Footer />
    </main>
  );
}
