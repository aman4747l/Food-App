import classes from './Checkout.module.css'
const Checkout:React.FC<{onCancel: () => void}> = props => {

   const submitHandler = (event:React.FormEvent) => {
      event.preventDefault()
   }

    return <form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' />
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' />
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' />
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' />
        </div>
        <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button onClick={submitHandler}>Confirm</button>
        </div>
    </form>
}

export default Checkout