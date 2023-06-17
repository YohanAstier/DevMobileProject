import React from 'react'
import { View, Text } from 'react-native'
import { Context } from '../Context'

const MealPlanning = () => {
    const [ days, setDays ] = React.useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"])
    const { meals, setMeals } = React.useContext(Context)

    return (
        <View>
            {days.map((day, index) => (
                <Text key={index}>{day}</Text>
            ))}
        </View>
    )
}

export default MealPlanning
