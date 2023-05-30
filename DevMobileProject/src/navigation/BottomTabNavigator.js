import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import FoodDatabase from '../screens/FoodDatabase'
import HealthGoals from '../screens/HealthGoals'
import MealPlanning from '../screens/MealPlanning'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
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
                          <MaterialCommunityIcons name="food-apple" size={24} color={color} />
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
        </NavigationContainer>
    )
}

export default AppNavigator
