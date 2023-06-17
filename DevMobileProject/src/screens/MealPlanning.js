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
            {days.map((day, index) => (
                <Day day={day} key={index} />
            ))}
        </View>
    )
}

const Day = ({ day }) => {
    const { meals, setMeals } = React.useContext(Context)

    return (
        <View>
            <Text>{day.getDate()}</Text>
            {meals.map((meal, index) => (
                meal.date === day ? (<Text>{meal.food.food.label}</Text>) : <Text>{meal.date.getDate() }</Text>
            ))}
        </View>
    )
}

export default MealPlanning
