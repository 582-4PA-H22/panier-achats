import './ListeProduits.scss';
import Produit from './Produit';
import { useState, useEffect } from 'react';
import { bdFirestore as bd } from './firebase/init';
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ListeProduits({etatPanier}) {
    // Variable d'état des produits
    const [produits, setProduits] = useState([]);

    // Obtenir les produits de la collection Firestore
    useEffect(function() {
        // Obtenir tous les documents de la collection 'magasin-produits'
        getDocs(query(collection(bd, 'magasin-produits'), where('prix', '<=', 40))).then(
            qs => setProduits(qs.docs.map(doc => ({id: doc.id, ...doc.data()})))
        );
    }, []);

    return (
        <section className="ListeProduits">
            <h2>Nos produits</h2>
            <div className="produits">
                {
                    produits.map(p => <Produit etatPanier={etatPanier} key={p.id} nom={p.nom} prix={p.prix} pid={p.id} />)
                }
            </div>
        </section>
    );
}