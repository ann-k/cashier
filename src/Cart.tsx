import React from 'react'

interface CustomProps {
  products: Product[],
  removeFromCart: (name: string) => void,
  checkOut: () => void,
}

const Cart: React.FC<CustomProps> = ({products, removeFromCart, checkOut}) => {
  const handleProductClick = (name: string): void => removeFromCart(name)
  const handleFinalPriceClick = (): void => checkOut()
  let finalPrice = 0

  return (
    <div className='Cart'>
      <h2>Чек</h2>
      {products.map((product: Product, index: number) => {
        finalPrice = finalPrice + product.inCart * product.price

        return (
          <div className='Product CartProduct' key={index} onClick={() => handleProductClick(product.name)}>
            <div>
              <h4>{product.name}</h4>
              <div>{product.inCart} x {product.price.toFixed(2)} ₽</div>
            </div>
            <h4>{(product.inCart * product.price).toFixed(2)} ₽</h4>
          </div>
        )
      })}

      <h3 className='FinalPrice' onClick={handleFinalPriceClick}>
        {finalPrice
          ? <span>
              <span role='img' aria-label='credit card'>💳 </span>
              Итого: {finalPrice.toFixed(2)}  ₽
            </span>
          : <span>Ваша корзина пуста</span>}
      </h3>
    </div>
  )
}

export default Cart
