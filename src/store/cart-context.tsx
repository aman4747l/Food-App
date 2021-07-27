import React from 'react'
import MealsModel from '../model/meal'

const CartContext = React.createContext<{
    items: MealsModel[];
    totalAmount: number;
    addItem: (item: MealsModel) => void;
    removeItem: (id: string) => void

}>({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default CartContext