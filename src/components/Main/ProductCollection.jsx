import { useState, useEffect } from "react"
import ProductGrid from "./ProductGrid.jsx"
import api from "../../services/api.js"
import { Link } from "react-router";

import DailysupBanner from "./DailysupBanner.jsx";

function ProductCollection() {

  // stato per i prodotti
  const [latest, setLatest] = useState([]);
  const [latestLast, setLatestLast] = useState(null);
  const [bestsellers, setBestsellers] = useState([]);
  const [bestsellersLast, setBestsellersLast] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [latestProducts, bestsellerProducts] = await Promise.all([
          api.getLatestProducts(),
          api.getBestsellerProducts()
        ]);
        
        const slicedLatest = latestProducts.slice(0, 3);
        const slicedLatestLast = latestProducts[3];

        setLatest(slicedLatest);
        setLatestLast(slicedLatestLast);
        // la total quanity è il numero totale di unità vendute
        // per il dato prodotto recuperata da orders
        const sortedBestsellers = [...bestsellerProducts].sort((a, b) => {
          return b.total_quantity - a.total_quantity; 
        });


        const slicedBestsellers = sortedBestsellers.slice(0, 3);
        const slicedBestsellersLast = sortedBestsellers[3];


        setBestsellers(slicedBestsellers);
        setBestsellersLast(slicedBestsellersLast);
        

      } catch (error) {
        console.error('Error when loading data')
      }

    }

      fetchData();

  }, [])


  return <>
    <div className="">
      <ProductGrid title="Clients'Favorites" products={bestsellers} lastProduct={bestsellersLast} />
      <Link to="/products?category=dailysuper"> <DailysupBanner /> </Link>
      <ProductGrid title="New In" products={latest} lastProduct={latestLast} />
    </div>
  </>
}

export default ProductCollection;