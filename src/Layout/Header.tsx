import { Fragment } from "react";
import mealImage from '../../src/assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
const Header:React.FC<{onShowCart: () => void}> = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Barbecue Delight</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>

      <div className={classes['main-image']}>
        <img src={mealImage} alt="A table full of delicious food!"/>
      </div>
    </Fragment>
  );
};
export default Header