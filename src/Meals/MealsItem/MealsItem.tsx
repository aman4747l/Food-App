import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import classes from './MealsItem.module.css'
import MealsItemForm from './MealsItemForm'
const MealsItem: React.FC<{id: string; name: string; price: number; description: string;}> = props => {
    const cartCtx = useContext(CartContext)
    
    const addToCartHandler = () => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price
        })
    }

    const price =`$${props.price.toFixed(2)}`
    return (
        <li className={classes.meal}>
            <div >
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div> <MealsItemForm id={props.id} onAddToCart={addToCartHandler}/> </div>
        </li>
    )
}

export default MealsItem