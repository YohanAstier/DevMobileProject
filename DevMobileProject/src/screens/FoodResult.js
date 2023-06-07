import { useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'

const MealPlanning = () => {
    const route = useRoute()
    const { foodResults } = route.params.foodResults
    return (
        <View>
            <Text>
                Your Results
            </Text>
        </View>
    )
}

export default MealPlanning
