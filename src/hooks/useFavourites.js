import { useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext.jsx";

function useFavourites() {
    const favouriteValues = useContext(FavouritesContext);

    if (!favouriteValues) {
        throw new Error("Hey Johnny... you forgot to set FavouritesProvider!");
    }

    return favouriteValues;
}

export default useFavourites;