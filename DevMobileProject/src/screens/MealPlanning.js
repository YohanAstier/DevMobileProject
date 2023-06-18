import React from 'react'
import { View, Text } from 'react-native'

import { Context } from '../Context'

const MealPlanning = () => {
    const [days, setDays] = React.useState(
        Array.from(
            { length: 7 },
            (_, i) => new Date(Date.now() + i * 24 * 60 * 60 * 1000)
        )
    )
    return (
        <View>
            <Text>Meals for the next 7 days:</Text>
            {days.map((day, index) => (
                <Day day={day} key={index} />
            ))}
        </View>
    )
}

const Day = ({ day }) => {
    const { meals, setMeals } = React.useContext(Context)
    let totalCalories = 0

    return (
        <View>
            <Text>
                {new Intl.DateTimeFormat('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                }).format(day)}
            </Text>
            {meals.map((meal, index) =>
                meal.date.getDate() === day.getDate() &&
                meal.date.getMonth() === day.getMonth() &&
                meal.date.getYear() === day.getYear()
                    ? (() => {
                          totalCalories += parseInt(
                              meal.food.nutrients.ENERC_KCAL
                          ) * parseInt(
                              meal.amountFood
                          )
                        return <Food meal={meal} key={index} />
                      })()
                    : null
            )}
            <Text>Total calories of the day : {totalCalories} kcal</Text>
        </View>
    )
}

const Food = ({ meal }) => {
    return (
        <View>
            <Text>Time: {meal.meal}</Text>
            <Text>Meal: {meal.food.label}</Text>
            <Text>Quantity: {meal.amountFood}</Text>
        </View>
    )
}
export default MealPlanning
