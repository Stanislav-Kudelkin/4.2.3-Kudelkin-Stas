export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, displayQuantity: number) => void
  updateCart: (product: Product, newQuantity: number) => void
  removeFromCart: (productId: number) => void
  total: number
}
