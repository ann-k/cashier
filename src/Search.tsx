import React, { useState, useEffect } from 'react'

interface CustomProps {
  products: Product[],
  addToCart: (name: string) => void,
}

const Search: React.FC<CustomProps> = ({products, addToCart}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [query, setQuery] = useState<string>('')

  const handleClick = (name: string): void => addToCart(name)

  // Filter products if search query or props change
  useEffect(() => {
    setFilteredProducts(products.filter((product: Product): boolean => product.name
      .toLowerCase()
      .search(query.toLowerCase()) !== -1))
  }, [query, products])

  return (
    <div className='Search'>
      <div className='SearchHeader'>
        <h2>На складе</h2>
        <input type='search'
               placeholder='Поиск по названию продукта'
               className='SearchInput'
               onChange={(event) => setQuery(event.target.value)} />
      </div>

      {filteredProducts.map((product: Product, index: number) => {
        return (
          <div className='Product StoreProduct'
               key={index}
               onClick={() => handleClick(product.name)} >
            <div>
              <h3>{product.name}</h3>
              <div><span role='img' aria-label='box'>📦</span> Осталось на складе: {product.inStore}</div>
            </div>

            <h3>{product.price.toFixed(2)} ₽</h3>
          </div>
        )
      })}
    </div>
  )
}

export default Search
