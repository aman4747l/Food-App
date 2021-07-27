import { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../store/cart-context'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton:React.FC<{onClick: () => void}> = props => {

    const [btnIsHightlighted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx
    const btnClasses = `${classes.button} ${btnIsHightlighted ? classes.bump : ''}`
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber 
        
    }, 0);

    useEffect(()=> {
        if(items.length === 0) {
            return 
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(()=> {
            setBtnIsHighlighted(false)
           
        },300)

        return () => {
           clearTimeout(timer)
        }
    },[numberOfCartItems])
   
    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    
    </button>
    )
}
export default HeaderCartButton
