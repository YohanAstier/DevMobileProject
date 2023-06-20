import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { AppState } from 'react-native'


import { Context } from '../Context'
import FoodDatabase from '../screens/FoodDatabase'
import FoodResult from '../screens/FoodResult'
import HealthGoals from '../screens/HealthGoals'
import MealPlanning from '../screens/MealPlanning'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AppNavigator = () => {
    const [meals, setMeals] = React.useState([])

    /*const retrieveArray = async () => {
        try {
            const serializedData = await AsyncStorage.getItem('meals')
            if (serializedData !== null) {
                const arrayData = JSON.parse(serializedData)
                arrayData.forEach((item) => {
                    debugger

                    console.log('rtriev ', item)
                    meals.push(item)
                })
            }
        } catch (error) {
            console.log('Error retrieving array:', error)
        }
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('meals', JSON.stringify(meals))
            console.log('Data stored successfully!');
        } catch (error) {
            console.log('Error storing data:', error);
        }
    };

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                retrieveArray()
            } else{
                storeData()
            }
        }

        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [])*/

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
