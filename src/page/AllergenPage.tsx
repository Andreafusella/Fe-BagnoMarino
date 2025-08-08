import React from 'react';
import {
  Leaf,
  Bean,
  Milk,
  Egg,
  Droplet,
  Nut,
  CircleDot,
  CircleEllipsis,
  Fish,
//   Crab,
  Shrimp,
  Shell,
  Carrot,
//   Peanut,
  Circle,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allergens = [
  { icon: <Leaf size={32} />, label: 'Glutine' },
  { icon: <Bean size={32} />, label: 'Soia' },
  { icon: <Milk size={32} />, label: 'Latticini' },
  { icon: <Egg size={32} />, label: 'Uova' },
  { icon: <Droplet size={32} />, label: 'Senape' },
  { icon: <Nut size={32} />, label: 'Frutta a guscio' },
  { icon: <CircleDot size={32} />, label: 'Solfiti' },
  { icon: <CircleEllipsis size={32} />, label: 'Sesamo' },
  { icon: <Fish size={32} />, label: 'Pesce' },
//   { icon: <Crab size={32} />, label: 'Crostacei' },
  { icon: <Shrimp size={32} />, label: 'Gamberi / Crostacei' },
  { icon: <Shell size={32} />, label: 'Molluschi' },
  { icon: <Carrot size={32} />, label: 'Sedano' },
//   { icon: <Peanut size={32} />, label: 'Arachidi' },
  { icon: <Circle size={32} />, label: 'Lupini' },
];

const AllergenPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Freccia Indietro */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#333',
            padding: 0
          }}
        >
          <ArrowLeft size={24} style={{ marginRight: '0.5rem' }} />
          Indietro
        </button>
      </div>

      {/* Titolo */}
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Informazioni su Allergeni e Prodotti Congelati
      </h1>

      {/* Testo descrittivo */}
      <div style={{
        fontSize: '1.1rem',
        lineHeight: '1.6',
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        marginBottom: '2rem'
      }}>
        I piatti presenti nel nostro menù possono contenere allergeni. Quando nel menù sono indicati solo alcuni allergeni,
        si intende che i piatti contengono quelli specifici o <strong>possono contenere tracce</strong> di altri allergeni.
        <br /><br />
        Dove è indicata la dicitura <strong>“congelato”</strong>, si intende che il prodotto può essere stato
        <strong> congelato all’origine o in assenza del prodotto fresco</strong>.
        <br /><br />
        In caso di allergie o intolleranze alimentari, vi invitiamo a comunicarlo al nostro personale prima di ordinare.
      </div>

      {/* Griglia allergeni */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1.2rem'
      }}>
        {allergens.map((item, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.05)'
          }}>
            {item.icon}
            <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', color: '#888' }}>
        Chalet Ristorante – Tutti i diritti riservati ©️ 2025
      </footer>
    </div>
  );
};

export default AllergenPage;