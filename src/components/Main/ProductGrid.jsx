import ProductCard from "../Cards/ProductCard.jsx";
import styles from "../Cards/ProductCard.module.css";


function ProductGrid({ title, products, lastProduct }) {
    return <>
        <div className="mb-5  row-gap-3">
            <div className={`${styles.sectTitleBox}`}>
                <h2 className={`${styles.sectionTitle}`}>{title}</h2>
            </div>
            <div className="mx-lg-5 mx-3 mt-5">
                <div className="row row-cols-md-3 g-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} className={`${styles.productCard} ${styles.productMain}`} />
                    ))}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {lastProduct && <ProductCard key={lastProduct.id} product={lastProduct} className={`${styles.productCard} ${styles.productLast}`} />}
                </div>
            </div>
        </div>
    </>

}
export default ProductGrid;