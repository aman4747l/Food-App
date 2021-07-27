import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem/MealsItem";
import MealsModel from "../model/meal";
const DUMMY_MEALS = [
  new MealsModel("m1", "Barbecue Sushi", "Finest fish and veggies", 22.99),
  new MealsModel("m2", "Barbecue Schnitzel", "A german specialty!", 16.5),
  new MealsModel("m3", "Barbecue Burger", "American, raw, meaty", 12.99),
  new MealsModel("m4", "Barbecue Green Bowl", "Healthy...and green...", 18.99)
];

const AvailableMeals:React.FC<{}> = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};
export default AvailableMeals;
