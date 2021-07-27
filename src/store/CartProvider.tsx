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
 | {type: 'ADD', item: MealsModel }
 | { type: 'REMOVE', id: string}  
 

const cartReducer = (state: cart, action: Action) => {

    if(action.type === 'ADD') {
       let updatedItems : MealsModel[]
       let updatedItem : MealsModel
        const updatedTotalAmount = state.totalAmount + action.item.price
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        if(existingCartItem)
        {
             updatedItem = {
                ...existingCartItem,
                
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
        let updatedItems: MealsModel[]
        let updatedItem: MealsModel
        let updatedTotalAmount
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        updatedTotalAmount = state.totalAmount - existingCartItem.price
   
            updatedItem = {...existingCartItem}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
            
        
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

const removeItemFromCartHandler = (id: string) => {
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