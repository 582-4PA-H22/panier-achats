import './App.scss';
import Entete from './Entete';
import PiedPage from './PiedPage';
import ListeProduits from './ListeProduits';
import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Accueil from './Accueil';
import Histoire from './Histoire';

function App() {
  // État React pour gérer un panier d'achats
  const etatPanier = useState(() => JSON.parse(window.localStorage.getItem('panier-4pa')) || {});
  // Remarquez que useState retourne un tableau : 
  // Le premier élément du tableau représente le contenu de l'état
  const panier = etatPanier[0]; 

  // "Persister" (sauvegarder) le panier dans localStorage
  // Utiliser le HOOK useEffect pour exécuter ce code de façon controlée
  useEffect(() => window.localStorage.setItem('panier-4pa', JSON.stringify(panier)), [panier]);

  // État de l'utilisateur connecté
  const [util, setUtil] = useState(null);

  /**
   * Déclenche le processus d'authentification avec Google Auth Provider
   */
  function connexion() {
    
  }

  return (
    <div className="App">
      {
        util ?
        <>
          <Entete util={util} setUtil={setUtil} panier={panier} />
          <Routes>
            <Route path='/' element={<Accueil/>}/>
            <Route path='/notre-histoire' element={<Histoire/>}/>
            <Route path='/nos-produits' element={<ListeProduits etatPanier={etatPanier} />}/>
          </Routes>
          <PiedPage />
        </>
        :
        <button onClick={connexion}>Connexion</button>
      }
    </div>
  );
}

export default App;
