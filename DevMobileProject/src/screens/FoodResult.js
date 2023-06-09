import { useRoute } from '@react-navigation/native'
import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Button,
    Modal,
    TouchableOpacity,
} from 'react-native'

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
    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <View style={[styles.foodItemContainer, style]}>
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        setModalVisible(false)
                    }}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalForm}>
                            <Text style={styles.modalText}>Hello World!</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
                    <Text style={{ fontSize: 20 }}>
                        {foodObject.food.label}
                    </Text>
                    <Text>
                        KCAL :{' '}
                        {parseFloat(
                            foodObject.food.nutrients.ENERC_KCAL
                        ).toFixed(2)}
                    </Text>
                    <Text>
                        FAT :{' '}
                        {parseFloat(foodObject.food.nutrients.FAT).toFixed(2)} g
                    </Text>
                    <Text>
                        Protein :{' '}
                        {parseFloat(foodObject.food.nutrients.FAT).toFixed(2)} g
                    </Text>
                    <Text>
                        CHOCDF :{' '}
                        {parseFloat(foodObject.food.nutrients.CHOCDF).toFixed(
                            2
                        )}{' '}
                        g
                    </Text>
                </View>
                <View style={styles.btnItem}>
                    <Button
                        title="Add"
                        onPress={() => setModalVisible(!modalVisible)}
                    />
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
        justifyContent: 'space-between',
    },
    foodInfo: {
        flex: 2,
        marginLeft: 10,
        flexDirection: 'column',
    },
    foodItemEven: {
        backgroundColor: '#D3D3D3',
    },
    foodItemOdd: {
        backgroundColor: '#fff',
    },
    btnItem: {
        alignSelf: 'center',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalForm: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 50,
    },
})

export default MealPlanning
