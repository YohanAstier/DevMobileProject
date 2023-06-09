import AsyncStorage from '@react-native-async-storage/async-storage'
import RNDateTimePicker from '@react-native-community/datetimepicker'
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
    TextInput,
    ToastAndroid,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { Context } from '../Context'

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
    const [dropDownOpen, dropDownSetOpen] = React.useState(false)
    const [amount, setAmount] = React.useState(0)
    const { meals, setMeals } = React.useContext(Context)
    const [mealsLabel, setMealsLabel] = React.useState([
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Snack', value: 'snack' },
        { label: 'Dinner', value: 'dinner' },
    ])
    const [dateFood, changeDate] = React.useState(new Date())
    const [showInput, setShowInput] = React.useState(false)

    const [selectedMeal, setSelectedMeal] = React.useState(null)
    const [selectedFood, setSelectedFood] = React.useState(null)
    const eventChange = (DateTimePickerEvent, Date) => {
        changeDate(Date)
        setShowInput(!showInput)
    }
    const submitForm = () => {
        let alertMsg = verifyFields()
        if (alertMsg) {
            alertMsg += 'Please complete all fields correctly !'
            alert(alertMsg)
            return
        }
        setModalVisible(false)
        meals.push({
            date: dateFood,
            meal: selectedMeal,
            food: selectedFood,
            amountFood: amount,
        })
        ToastAndroid.show('Meal added successfully!', ToastAndroid.SHORT);
    }
    function verifyFields() {
        let alertMsg = ''
        if (!selectedFood) {
            alertMsg += 'An error occured !\n'
            return alertMsg
        }
        if (!dateFood) {
            alertMsg += 'Select a date !\n'
        }
        if (!selectedMeal) {
            alertMsg += 'Select your meal !\n'
        }
        if (!amount) {
            alertMsg += 'Select the amount of food!\n'
        } else if (amount <= 0) {
            alertMsg += ('Wrong amount of food!\n')
        }
        return alertMsg
    }
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
                <View style={styles.modalContent}>
                    <View style={styles.modalForm}>
                        <View style={styles.mealPicker}>
                            <DropDownPicker
                                open={dropDownOpen}
                                value={selectedMeal}
                                items={mealsLabel}
                                setOpen={dropDownSetOpen}
                                setValue={setSelectedMeal}
                                setItems={setMealsLabel}
                            />
                        </View>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Amount..."
                            onChangeText={setAmount}
                            keyboardType="numeric"
                        />
                        <View>
                            <Button
                                color="#CC9966"
                                onPress={() => setShowInput(!showInput)}
                                title={'Date :\n' + dateFood.toDateString()}
                            />
                            {showInput && (
                                <RNDateTimePicker
                                    value={dateFood}
                                    mode="date"
                                    onChange={eventChange}
                                />
                            )}
                        </View>
                        <View style={styles.formRow}>
                            <Button
                                color="red"
                                title="Cancel"
                                onPress={() => {
                                    setModalVisible(false)
                                }}
                            />
                            <Button title="Confirm" onPress={submitForm} />
                        </View>
                    </View>
                </View>
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
                        onPress={() => {
                            setModalVisible(!modalVisible)
                            setSelectedFood(foodObject.food)
                        }}
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
        flex: 1,
        padding: 35,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-around',
        elevation: 50,
    },
    mealPicker: {
        width: '80%',
        padding: 20,
        zIndex: 1,
    },
    formRow: {
        padding: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
        padding: 10,
    },
})

export default MealPlanning
