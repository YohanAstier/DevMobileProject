import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { TextInput } from '@react-native-material/core'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const HealthGoals = () => {
    const [age, onChangeAge] = React.useState('')
    const [gender, setSelectedGender] = React.useState('')
    const [height, onChangeHeight] = React.useState('')
    const [weight, onChangeWeight] = React.useState('')
    const [activity, setSelectedActivity] = React.useState('')
    const [goal, setSelectedGoal] = React.useState('')
    const [caloricIntakes, setCaloricIntakes] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const onSubmit = () => {
        let alertMsg = verifyFields()
        if (alertMsg) {
            alertMsg += 'Please complete all fields correctly !'
            alert(alertMsg)
            setShowResult(false)
            return
        }
        const bmr = calculateBMR().toFixed(2)
        setCaloricIntakes(adjustCaloricIntakes(bmr).toFixed(2))
        setShowResult(true)
    }

    function verifyFields() {
        let alertMsg = ''
        if (age) {
            if (age > 120 || age < 0) {
                alertMsg += 'Wrong age !\n'
            }
        } else {
            alertMsg += 'Wrong age !\n'
        }
        if (!gender) {
            alertMsg += 'Gender not selected !\n'
        }
        if (height) {
            if (height < 0) {
                alertMsg += 'Wrong height !\n'
            }
        } else {
            alertMsg += 'Wrong height !\n'
        }
        if (weight) {
            if (weight < 0) {
                alertMsg += 'Wrong weight !\n'
            }
        } else {
            alertMsg += 'Wrong weight !\n'
        }
        if (!activity) {
            alertMsg += 'Activity level not selected !\n'
        }
        if (!goal) {
            alertMsg += 'Health goal not selected !\n'
        }
        return alertMsg
    }
    function calculateBMR() {
        let bmr = 0
        if (gender === 'Man') {
            bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        } else {
            bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
        }
        return bmr
    }
    function adjustCaloricIntakes(bmr) {
        if (goal === 'loss') {
            bmr *= 0.9
        } else if (goal === 'gain') {
            bmr *= 1.1
        }
        return bmr
    }

    return (
        <View>
            <View style={styles.subContainer}>
                <TextInput
                    placeholder="Age"
                    onChangeText={(age) => onChangeAge(age)}
                    keyboardType="numeric"
                    leading={(props) => <Icon name="account" {...props} />}
                />
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                    }
                    prompt="Select gender"
                    style={styles.picker}
                >
                    <Picker.Item label="Select gender" value="" />
                    <Picker.Item label="Man" value="Man" />
                    <Picker.Item label="Woman" value="Woman" />
                </Picker>
                <TextInput
                    placeholder="Height in cm"
                    onChangeText={(height) => onChangeHeight(height)}
                    keyboardType="numeric"
                    leading={(props) => (
                        <Icon name="human-male-height" {...props} />
                    )}
                    styles={styles.input}
                />
                <TextInput
                    placeholder="Weight in kg"
                    onChangeText={(weight) => onChangeWeight(weight)}
                    keyboardType="numeric"
                    leading={(props) => (
                        <Icon name="weight-kilogram" {...props} />
                    )}
                />
                <Picker
                    selectedValue={activity}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedActivity(itemValue)
                    }
                    prompt="Select your activity level"
                    style={styles.picker}
                >
                    <Picker.Item label="Select your activity level" value="" />
                    <Picker.Item label="Sedentary" value="1.2" />
                    <Picker.Item label="Light exercise" value="1.375" />
                    <Picker.Item label="Moderate exercise" value="1.55" />
                    <Picker.Item label="Heavy exercise" value="1.725" />
                    <Picker.Item label="Extra exercise" value="1.9" />
                </Picker>
                <Picker
                    selectedValue={goal}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGoal(itemValue)
                    }
                    prompt="Select your health goal"
                    style={styles.picker}
                >
                    <Picker.Item label="Select your health goal" value="" />
                    <Picker.Item label="Weight loss" value="loss" />
                    <Picker.Item
                        label="Weight maintenance"
                        value="maintenance"
                    />
                    <Picker.Item label="Weight gain" value="gain" />
                </Picker>
                <Button title="Envoyer" onPress={onSubmit} />
            </View>
            {showResult && (
                <View style={styles.subContainer}>
                    <Text style={styles.Text}>Caloric intakes you need:</Text>
                    <Text style={styles.caloryText}>
                        {caloricIntakes} calories
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    subContainer: {
        rowGap: 10,
        padding: 20,
    },
    Box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Text: {
        fontSize: 25,
    },
    caloryText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
})

export default HealthGoals
