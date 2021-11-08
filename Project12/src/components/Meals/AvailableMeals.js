import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const url = 'https://react-http-2cdd5-default-rtdb.firebaseio.com/meals.json';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    setIsLoading(true);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    console.log('data ', data);
    const loadedMeals = [];

    for (const meal in data) {
      loadedMeals.push({
        id: meal,
        ...data[meal]
      });
    }

    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{isLoading 
          ? <p>Loading...</p>
          :mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
