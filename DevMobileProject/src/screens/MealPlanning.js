import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { Context } from '../Context'
import { Button } from '@react-native-material/core'

const MealPlanning = () => {
    const [days, setDays] = React.useState(
        Array.from(
            { length: 7 },
            (_, i) => new Date(Date.now() + i * 24 * 60 * 60 * 1000)
        )
    )
    return (
        <ScrollView>
            <Text>Meals for the next 7 days:</Text>
            {days.map((day, index) => (
                <Day day={day} index={index} />
            ))}
        </ScrollView>
    )
}

const Day = ({ day, index }) => {
    const { meals, setMeals } = React.useContext(Context)
    let totalCalories = 0
    return (
        <View style={ [index % 2 ? styles.foodItemOdd : styles.foodItemEven, styles.subContainer] }>
            <Text style={ styles.Text }>
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
            <Text style={ styles.mt }>Total calories of the day : {totalCalories} kcal</Text>
        </View>
    )
}

const Food = ({ meal }) => {
    return (
        <View style={ styles.Food }>
            <Text>{meal.amountFood} { meal.food.label } for { meal.meal }</Text>
            <View style={ styles.buttons}>
                <Button title="+" style={ styles.addBtn }/>
                <Button title="-" style={ styles.removeBtn }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    Food: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mt: {
        marginTop: 10,
    },
    subContainer: {
        rowGap: 6,
        padding: 15,
    },
    foodItemEven: {
        backgroundColor: '#D3D3D3',
    },
    foodItemOdd: {
        backgroundColor: '#fff',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    addBtn: {
        backgroundColor: 'green',
        marginRight: 5
    },
    removeBtn: {
        backgroundColor: 'red',
    },
})
export default MealPlanning
