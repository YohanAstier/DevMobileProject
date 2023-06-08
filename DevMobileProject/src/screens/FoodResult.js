import { useRoute } from '@react-navigation/native'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'

const MealPlanning = () => {
    const route = useRoute()
    const { foodResults } = route.params
    return (
        <ScrollView style={styles.container}>
            {foodResults.map((foodObject, index) => (
                <FoodItem
                    style={index % 2 ? styles.foodItemOdd : styles.foodItemEven}
                    key={index}
                    foodObject={foodObject}
                />
            ))}
        </ScrollView>
    )
}

const FoodItem = ({ foodObject, style }) => {
    return (
        <View style={[styles.foodItemContainer, style]}>
            <View style={styles.foodItemDesc}>
                <View>
                    {foodObject.food.image != null ? (
                        <Image
                            source={{ uri: foodObject.food.image }}
                            style={{ width: 100, height: 100 }}
                        />
                    ) : null}
                </View>
                <View style={styles.foodInfo}>
                    <Text style={{fontSize: 20}}>{foodObject.food.label}</Text>
                    <Text>KCAL : {foodObject.food.nutrients.ENERC_KCAL}</Text>
                    <Text>FAT : {foodObject.food.nutrients.FAT} g</Text>
                    <Text>Protein : {foodObject.food.nutrients.FAT} g</Text>
                    <Text>CHOCDF : {foodObject.food.nutrients.CHOCDF} g</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    foodItemContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    foodItemDesc: {
        flexDirection: 'row',
    },
    foodInfo: {
        marginLeft:10,
        flexDirection: 'column',
    },
    foodItemEven: {
        backgroundColor: '#D3D3D3',
    },
    foodItemOdd: {
        backgroundColor: '#fff',
    },
})

export default MealPlanning
