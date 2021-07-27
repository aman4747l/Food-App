import React, { useReducer } from 'react'
import MealsModel from '../model/meal'
import CartContext from './cart-context'

type cart={ items:MealsModel[],
    totalAmount: number}

const defaultCartState:cart = {
    items:[],
    totalAmount: 0
}
type Action =
 | { type: 'ADD', results:{ item:MealsModel,
    totalAmount: number} }
 | { type: 'REMOVE', results:{ item:MealsModel,
    totalAmount: number}  }
 

const cartReducer = (state: cart, action: Action) => {

    if(action.type === 'ADD') {
       let updatedItems
       let updatedItem 
        const updatedTotalAmount = state.totalAmount + action.item.price
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        if(existingCartItem)
        {
             updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            }
            updatedItems = state.items
            updatedItems[existingCartItemIndex]=updatedItem
        }
        else {
           updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE') {
        let updatedItems
        let updatedItem
        let updatedTotalAmount
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        updatedTotalAmount = state.totalAmount - existingCartItem.price
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
            
        }
        else {
            updatedItem = {...existingCartItem, amount: existingCartItem.amount -1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
            
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider: React.FC = props => {

    const [cartState, dispatchCartActions] = useReducer(cartReducer, defaultCartState)

const addItemToCartHandler = (item: MealsModel) => {
    dispatchCartActions({type: 'ADD', item: item})
}

const removeItemFromCartHandler = (id: String) => {
    dispatchCartActions({type: 'REMOVE', id: id})
} 

const cartContext:{
    items: MealsModel[];
    totalAmount: number;
    addItem: (item: MealsModel) => void;
    removeItem: (id: string) => void

} = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
}


    return(
         <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    )
}

export default CartProvider