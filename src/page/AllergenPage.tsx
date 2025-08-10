import { useState, useEffect } from 'react';
import { ArrowLeft, Info, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const allergens = [
  { emoji: '🌿', label: 'Glutine' },
  { emoji: '🌱', label: 'Soia' },
  { emoji: '🥛', label: 'Latticini' },
  { emoji: '🥚', label: 'Uova' },
  { emoji: '🌭', label: 'Senape' },
  { emoji: '🌰', label: 'Frutta a guscio' },
  { emoji: 'SO₂', label: 'Solfiti' },
  { emoji: '⚫️', label: 'Sesamo' },
  { emoji: '🐟', label: 'Pesce' },
  { emoji: '🦀', label: 'Crostacei' },
  { emoji: '🦐', label: 'Gamberi' },
  { emoji: '🐚', label: 'Molluschi' },
  { emoji: '🥬', label: 'Sedano' },
  { emoji: '🥜', label: 'Arachidi' },
  { emoji: '🫘', label: 'Lupini' },
];

const AllergenPage = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
    allergens.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, index]));
      }, index * 10);
    });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans min-h-screen">
      <div className='mb-10 lg:mb-0'>
        <Link to="/" className=''>
          <Button className='bg-blue-500 cursor-pointer hover:bg-blue-600'>
            <div className='flex items-center gap-2 rounded-2xl'>
              <ArrowLeft />
              <h1>Indietro</h1>
            </div>
          </Button>
        </Link>
      </div>

      {/* Title */}
      <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-blue-800 bg-clip-text text-transparent mb-4 tracking-tight">
          Informazioni su Allergeni
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto" />
      </div>

      {/* Info Card */}
      <div className={`bg-white/85 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-sky-500/5 border border-sky-100 mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex items-start mb-6">
          <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-3 rounded-xl mr-4 shadow-lg">
            <Info size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-blue-900 mt-1">
            Informazioni Importanti
          </h3>
        </div>

        <div className="text-lg leading-relaxed text-gray-700 space-y-6">
          <p>
            I piatti presenti nel nostro menù possono contenere allergeni. Quando nel menù sono indicati solo alcuni allergeni,
            si intende che i piatti contengono quelli specifici o <span className="font-semibold text-blue-800">possono contenere tracce</span> di altri allergeni.
          </p>
          <p>
            Dove è indicata la dicitura <span className="font-semibold text-blue-800">"congelato"</span>, si intende che il prodotto può essere stato
            <span className="font-semibold text-blue-800"> congelato all'origine o in assenza del prodotto fresco</span>.
          </p>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-4 flex flex-col md:flex-row items-center">
            <AlertTriangle
              size={32}
              className="text-sky-600 mb-4 md:mb-0 md:mr-3 self-center md:self-auto"
            />
            <p className="text-blue-900 font-medium m-0">
              In caso di allergie o intolleranze alimentari, vi invitiamo a comunicarlo al nostro personale prima di ordinare.
            </p>
          </div>
        </div>
      </div>

      {/* Allergens Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
        {allergens.map((item, index) => (
          <div
            key={index}
            className={`group bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg shadow-sky-500/5 border border-sky-100 cursor-pointer hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 hover:scale-105 hover:bg-white/95 transition-all duration-300 ${visibleCards.has(index)
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-5 opacity-0 scale-95'
              }`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {item.emoji}
            </div>
            <div className="text-sm font-medium text-gray-700 group-hover:text-blue-800 transition-colors duration-300">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className={`text-center transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg shadow-sky-500/5 border border-sky-100 inline-block">
          <p className="text-gray-600 m-0">
            <span className="font-semibold bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
              Chalet Ristorante Bagno Marino
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">©️ 2025</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AllergenPage;