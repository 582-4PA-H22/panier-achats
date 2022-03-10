import './App.scss';
import Entete from './Entete';
import PiedPage from './PiedPage';
import ListeProduits from './ListeProduits';
import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Accueil from './Accueil';
import Histoire from './Histoire';
import { authFirebase, authGoogle } from './firebase/init';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";


function App() {
  // État React pour gérer un panier d'achats
  const etatPanier = useState(() => JSON.parse(window.localStorage.getItem('panier-4pa')) || {});
  const panier = etatPanier[0]; 

  // "Persister" (sauvegarder) le panier dans localStorage
  useEffect(() => window.localStorage.setItem('panier-4pa', JSON.stringify(panier)), [panier]);

  // État de l'utilisateur connecté
  const [util, setUtil] = useState(null);

  /**
   * Déclenche le processus d'authentification avec Google Auth Provider
   */
  function connexion() {
    signInWithPopup(authFirebase, authGoogle).then(
      objUserGoogle => setUtil(objUserGoogle.user)
    );
  }

  // Attacher un "observateur" de changement d'état de connexion (gestionnaire 
  // d'événement de Firebase Authentication)
  useEffect(()=>onAuthStateChanged(authFirebase, user => setUtil(user)), []);

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
