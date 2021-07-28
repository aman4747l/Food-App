import { useContext, useState } from "react";
import MealsModel from "../model/meal";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart:React.FC<{onClose: () => void }> = (props) => {
  const [hasOrder, setHasOrder] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  let hasItems = cartCtx.items.length > 0;
  const onItemRemoveHandler = (id: string) => {
      cartCtx.removeItem(id)
  };
  const onItemAddHandler = (item: MealsModel) => {
      cartCtx.addItem(item)
  };
  const orderHandler = () => {
    hasItems = false;
    setHasOrder(true);
    console.log(hasItems);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          onRemove={onItemRemoveHandler.bind(null, item.id)}
          onAdd={onItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modal = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {hasOrder && <Checkout onCancel={props.onClose} />}
      {!hasOrder && modal}
    </Modal>
  );
};

export default Cart;
