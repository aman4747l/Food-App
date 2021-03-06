import { useState , useRef, FormEvent} from "react";
import Input from "../../UI/Input";
import classes from "./MealsItemForm.module.css";

const MealsItemForm:React.FC<{id: string; onAddToCart: (enteredAmountNumber: number) => void}> = (props) => {
    const[amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef<HTMLInputElement>(null)
  const submitHandler = (event:FormEvent) => {
    event.preventDefault();
    
    const enteredAmount = amountInputRef.current!.value
    const enteredAmountNumber = +enteredAmount
    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
        setAmountIsValid(false)
        return;
    }
    props.onAddToCart(enteredAmountNumber)
  };

  const onAdd= () => {

  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount" 
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={onAdd}>+ Add</button>
      {!amountIsValid && <p>Enter the valid amount (1-5)</p>}
    </form>
  );
};
export default MealsItemForm;
