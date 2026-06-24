import { useState, useEffect } from "react"
import ProductGrid from "./ProductGrid.jsx"
import api from "../../services/api.js"

function ProductCollection() {

  // stato per i prodotti
  const [latest, setLatest] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [latestProducts, bestsellerProducts] = await Promise.all([
          api.getLatestProducts(),
          api.getBestsellerProducts()
        ]);

        // mi creo le mie rotte da 5 prodotti
        const slicedLatest = latestProducts.slice(0, 4);
        setLatest(slicedLatest);

        const slicedBestsellers = bestsellerProducts.slice(0, 4);
        setBestsellers(slicedBestsellers);
        

      } catch (error) {
        console.error('Error when loading data')
      }

    }

      fetchData();

  }, [])


  return <>
    <div className="container my-5">
      <ProductGrid title="Clients'Favorites" products={bestsellers} />
      <ProductGrid title="New In" products={latest} />
      
    </div>
  </>
}

export default ProductCollection;