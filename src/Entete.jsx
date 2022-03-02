import './Entete.scss';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';

// Remarquez la destructuration d'objet
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
export default function Entete({panier}) {
    // Obtenir les 5 info impportantes pour le sommaire panier (on passe le tableau 
    // (Array) des valeurs dans l'objet 'panier')
    const {articlesDifferents: ad, articlesTotaux, sousTotal, taxes, total} = calculerInfoPanier(Object.values(panier));
    return (
        <header className="Entete">
            <h1><NavLink to="/">Magasin général</NavLink></h1>
            <nav className="nav-principale">
                <NavLink to="/nos-produits" className={({isActive}) => isActive ? 'lien-actif' : '' }>Produits</NavLink>
                <NavLink to="/notre-histoire" className={({isActive}) => isActive ? 'lien-actif' : '' }>Notre histoire</NavLink>
            </nav>
            <nav className='nav-secondaire'>
                {/* Sommaire du panier */}
                <input type="checkbox" id="cc-sommaire-panier" />
                <div className="sommaire-panier">
                    <h3>Sommaire du panier</h3>
                    <div><span>Articles différents</span><span>{ad}</span></div>
                    <div><span>Articles totaux</span><span>{articlesTotaux}</span></div>
                    <div><span>Sous-total</span><span>{sousTotal}</span></div>
                    <div><span>Taxes</span><span>{taxes}</span></div>
                    <div><span>Total</span><span>{total}</span></div>
                </div>
                <Badge badgeContent={articlesTotaux} color="secondary">
                    <label htmlFor="cc-sommaire-panier"><ShoppingCartSharpIcon/></label>
                </Badge>
                <a href="#">Contactez-nous</a>
            </nav>
        </header>
    );
}

/**
 * Calculer l'information du sommaire du panier
 * 
 * @param Array panierAchats Objet panier d'achats
 * 
 * @returns Object Objet contenant les 5 info requises du panier
 */

function calculerInfoPanier(panierAchats) {
    const sousTotal = panierAchats.reduce((acc, courant) => acc + courant.qte * courant.prix, 0);
    const taxes = sousTotal * 0.14975;

    return {
        articlesDifferents: panierAchats.length,
        articlesTotaux: panierAchats.reduce((acc, courant) => acc + courant.qte, 0),
        sousTotal: sousTotal.toFixed(2),
        taxes: taxes.toFixed(2),
        total: (sousTotal + taxes).toFixed(2)
    };
}

