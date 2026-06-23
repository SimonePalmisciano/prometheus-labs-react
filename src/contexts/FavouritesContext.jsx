import { createContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]); // serve per popolare la whislist
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");
        // recupera dalla memoria locale del browser la chiave "favourites" 
        // che restituisce true se esiste altrimenti restituisce null

        if (storedFavourites) {
            try {
                const parsedFavourites = JSON.parse(storedFavourites); // prende i vecchi preferiti salvati e li rimette 
                // in memoria nella variabile favourites
                setFavourites(parsedFavourites);
            } catch {
                console.error("Errore nel parsing dei preferiti:", error);// aggiungi staus
                localStorage.removeItem("favourites");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return; // se non ho ancora finito di leggere localStorage non fare niente
        localStorage.setItem("favourites", JSON.stringify(favourites)); 
        // qui quando cambia favourites viene aggiornata la chiave
        // quindi serve per tenere sincronizzati favourites nello state e in localstorage
        // ogni volta che favourites cambia prende l'array e lo salva nel browser

    }, [favourites, isLoaded]);

    const addToFavourites = (product) => {
        const alreadyExists = favourites.some(
            (item) => item.slug === product.slug
        );

        if (!alreadyExists) {
            setFavourites([...favourites, product]);
        }
    };

    const removeFromFavourites = (product) => {
        const updatedFavourites = favourites.filter(
            (item) => item.slug !== product.slug
        );

        setFavourites(updatedFavourites);
    };

    const isFavourite = (productSlug) => {
        return favourites.some((item) => item.slug === productSlug);
    };

    const toggleFavourite = (product) => {
        if (isFavourite(product.slug)) {
            removeFromFavourites(product);
        } else {
            addToFavourites(product);
        }
    };

    return (
        <FavouritesContext
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                isFavourite,
                toggleFavourite,
            }}
        >
            {children}
        </FavouritesContext>
    );
}

export {
    FavouritesContext,
    FavouritesProvider
};