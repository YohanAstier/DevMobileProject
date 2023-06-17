import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { Context } from '../Context'
import FoodDatabase from '../screens/FoodDatabase'
import FoodResult from '../screens/FoodResult'
import HealthGoals from '../screens/HealthGoals'
import MealPlanning from '../screens/MealPlanning'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AppNavigator = () => {
    const [meals, setMeals] = React.useState([])
    return (
        <Context.Provider value={{ meals, setMeals }}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="FoodResult" component={FoodResult} />
            </Stack.Navigator>
        </Context.Provider>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Health goals"
                component={HealthGoals}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Food database"
                component={FoodDatabase}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="food-apple"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Meal planning"
                component={MealPlanning}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calendar" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator
