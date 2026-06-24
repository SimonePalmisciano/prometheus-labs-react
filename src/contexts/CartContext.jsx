import { useState, createContext, useContext, useEffect, useMemo } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "cart_items";

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            }
        } catch (error) {
            console.error("An error occured while loading cart:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("An error occured while saving cart:", error);
        }
    }, [cartItems, isLoaded]);

    function addToCart(product) {
        if (!product || !product.slug) return;
        const existingItem = cartItems.find((item) => item.slug === product.slug);
        let updatedCart = [];
        if (existingItem) {
            updatedCart = cartItems.map((item) => {
                if (item.slug === product.slug) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
        } else {
            console.log("PRODUCT IN ADDTOCART:", product);
            const newItem = {
                slug: product.slug,
                name: product.name,
                price: Number(product.price),
                image: product.image,
                quantity: 1,
            };
            updatedCart = [...cartItems, newItem];
        }
        setCartItems(updatedCart);
    }

    function removeFromCart(productSlug) {
        const updatedCart = cartItems.filter((item) => item.slug !== productSlug);
        setCartItems(updatedCart);
    }

    function increaseQuantity(productSlug) {
        const updatedCart = cartItems.map((item) => {
            if (item.slug === productSlug) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });

        setCartItems(updatedCart);
    }

    function decreaseQuantity(productSlug) {
        const updatedCart = cartItems.map((item) => {
            if (item.slug === productSlug) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;

        }).filter((item) => item.quantity > 0);
        setCartItems(updatedCart);
    }

    function updateQuantity(productSlug, newQuantity) {
        const quantity = Number(newQuantity);
        if (isNaN(quantity)) return;
        let updatedCart = [];
        if (quantity <= 0) {
            updatedCart = cartItems.filter((item) => item.slug !== productSlug);
        } else {
            updatedCart = cartItems.map((item) => {
                if (item.slug === productSlug) {
                    return {
                        ...item,
                        quantity: quantity,
                    };
                }
                return item;
            });
        }
        setCartItems(updatedCart);
    }

    function clearCart() {
        setCartItems([]);
    }

    function isInCart(productSlug) {
        return cartItems.some((item) => item.slug === productSlug);
    }

    function getItemQuantity(productSlug) {
        const foundItem = cartItems.find((item) => item.slug === productSlug);
        return foundItem ? foundItem.quantity : 0;
    }

    function getCheckoutPayload() {
        return cartItems.map((item) => {
            return {
                productSlug: item.slug,
                quantity: item.quantity,
            };
        });
    }

    const cartCount = useMemo(() => { // calcola il numero totoale di articoli nel carrello
        return cartItems.reduce((total, item) => total + item.quantity, 0); // reduce serve a sommare i valori
    }, [cartItems]);

    const cartTotal = useMemo(() => { // calcola il totale del prezzo del carrello
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        getCheckoutPayload,
        cartCount,
        cartTotal,
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

function useCart() {
    return useContext(CartContext);
}
export { CartProvider, useCart };