import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import AppNavigator from './src/navigation/BottomTabNavigator'

const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}
export default App
