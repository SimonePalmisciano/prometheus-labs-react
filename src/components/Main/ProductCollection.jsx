import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import api from "../../services/api"

function ProductCollection() {

  // stato per i prodotti
  const [ultimiArrivi, setUltimiArrivi] = useState([])
  const [piuVenduti, setPiuVenduti] = useState([])

  useEffect(() => {
    // chiamata API per tutti i prodotti
    api.getProducts()
      .then(prodotti => {
        console.log('prodotti:', prodotti)
        // primi 3 prodotti come "ultimi arrivi"
        const ultimi = prodotti.slice(0, 3)

        // prodotti dal 4 al 6 come "più venduti"
        const venduti = prodotti.slice(8, 11)

        setUltimiArrivi(ultimi)
        setPiuVenduti(venduti)
      })
  }, [])

  return (
    <div className="container my-5">

      {/* Ultimi Arrivi */}
      <h2 className="mb-4">New In</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {ultimiArrivi.map(prodotto => (
          <ProductCard key={prodotto.id} prodotto={prodotto} />
        ))}
      </div>

      {/* Più Venduti */}
      <h2 className="mb-4">Clients' Favorites</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {piuVenduti.map(prodotto => (
          <ProductCard key={prodotto.id} prodotto={prodotto} />
        ))}
      </div>

    </div>
  )
}

export default ProductCollection;