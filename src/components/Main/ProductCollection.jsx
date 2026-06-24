import { useState, useEffect } from "react"
import ProductGrid from "./ProductGrid.jsx"
import api from "../../services/api.js"

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

        // mi creo le mie rotte da 5 prodotti
        const slicedLatest = latestProducts.slice(0, 3);
        const slicedLatestLast = latestProducts[3];

        setLatest(slicedLatest);
        setLatestLast(slicedLatestLast);

        const slicedBestsellers = bestsellerProducts.slice(0, 3);
        const slicedBestsellersLast = bestsellerProducts[3];

        setBestsellers(slicedBestsellers);
        setBestsellersLast(slicedBestsellersLast);
        

      } catch (error) {
        console.error('Error when loading data')
      }

    }

      fetchData();

  }, [])


  return <>
    <div className="container my-5">
      <ProductGrid title="Clients'Favorites" products={bestsellers} lastProduct={bestsellersLast} />
      <ProductGrid title="New In" products={latest} lastProduct={latestLast} />
      
    </div>
  </>
}

export default ProductCollection;