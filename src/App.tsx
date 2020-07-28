import React, { useState, useEffect } from 'react'
import './App.css'
import Search from './Search'
import Cart from './Cart'
import productsData from './products_data'

function App() {
  // Sort products alphabetically
  const sortByName = (a: Product, b: Product): number => {
    if (a.name < b.name) { return -1 }
    if (a.name > b.name) { return 1 }
    return 0
  }

  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const [storeProducts, setStoreProducts] = useState<Product[]>([])

  // Set initial products, all with 0 in cart
  useEffect(() => {
    setStoreProducts(productsData.map((data): Product => {
        const storeProduct = Object.assign(data, {inCart: 0})
        return storeProduct
      }).sort(sortByName)
    )
  }, [])

  const addToCart = (name: string): void => {
    const chosenProduct: Product = storeProducts.filter((product: Product): boolean => product.name === name)[0]

    // Remove from store
    if (chosenProduct.inStore > 1) {
      setStoreProducts(storeProducts.map((product: Product): Product => {
        if (chosenProduct === product) { product.inStore-- }
        return product
      }).sort(sortByName))
    } else {
      setStoreProducts(storeProducts.filter((product: Product): boolean => chosenProduct !== product)
      .sort(sortByName))
    }

    // Add to cart
    if (cartProducts.every((cartProduct: Product): boolean => cartProduct !== chosenProduct)) {
        chosenProduct.inCart = 1
        setCartProducts([...cartProducts, chosenProduct].sort(sortByName))
    } else {
      setCartProducts(cartProducts.map((cartProduct: Product): Product => {
        if (cartProduct === chosenProduct) { cartProduct.inCart++ }
        return cartProduct
      }).sort(sortByName))
    }
  }

  const removeFromCart = (name: string): void => {
    const chosenProduct = cartProducts.filter(product => product.name === name)[0]

    // Remove from cart
    setCartProducts(cartProducts.filter(product => product !== chosenProduct).sort(sortByName))

    // Add to store
    if (storeProducts.includes(chosenProduct)) {
      chosenProduct.inStore += chosenProduct.inCart
    } else {
      chosenProduct.inStore = chosenProduct.inCart
      setStoreProducts([...storeProducts, chosenProduct].sort(sortByName))
    }
  }

  const checkOut = (): void => setCartProducts([])

  return (
    <div className='App'>
      <Search products={storeProducts}
              addToCart={addToCart} />
      <Cart products={cartProducts}
            removeFromCart={removeFromCart}
            checkOut={checkOut} />
    </div>
  )
}

export default App
