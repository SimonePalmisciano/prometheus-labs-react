import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import api from "../../services/api"

function ProductCollection() {

  // stato per i products
  const [ultimiArrivi, setUltimiArrivi] = useState([])
  const [piuVenduti, setPiuVenduti] = useState([])

  useEffect(() => {
    // chiamata API per tutti i products
    api.getProducts()
      .then(products => {
        console.log('products:', products)
        // primi 3 products come "ultimi arrivi"
        const ultimi = products.slice(0, 3)

        // products dal 4 al 6 come "più venduti"
        const venduti = products.slice(8, 11)

        setUltimiArrivi(ultimi)
        setPiuVenduti(venduti)
      })
  }, [])

  return (
    <div className="container my-5">

      {/* Ultimi Arrivi */}
      <h2 className="mb-4">New In</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {ultimiArrivi.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Più Venduti */}
      <h2 className="mb-4">Clients' Favorites</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {piuVenduti.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  )
}

export default ProductCollection;