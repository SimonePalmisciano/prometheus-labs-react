// Componente card singolo prodotto
function ProductCard({ prodotto }) {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={`http://localhost:3000${prodotto.imgMain}`}
          className="card-img-top"
          alt={prodotto.name}
        />
        <div className="card-body">
          <h5 className="card-title">{prodotto.name}</h5>
          <p className="card-text">{prodotto.shortDescription}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="fw-bold">€ {prodotto.price}</span>
          <button className="btn btn-primary">Aggiungi al carrello</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard