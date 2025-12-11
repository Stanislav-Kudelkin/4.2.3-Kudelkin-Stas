import type { CartContextType } from '@/modules'
import { createContext } from 'react'

export const CartContext = createContext<CartContextType | null>(null)
