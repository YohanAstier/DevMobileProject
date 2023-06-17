import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Stack, TextInput, IconButton, Flex } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from '@react-native-picker/picker';



const HealthGoals = () => {
    const [age, onChangeAge] = React.useState('')
    const [gender, setSelectedGender] = React.useState('')
    const [height, onChangeHeight] = React.useState('')
    const [weight, onChangeWeight] = React.useState('')
    const [activity, setSelectedActivity] = React.useState('')
    const [goal, setSelectedGoal] = React.useState('')
    const onSubmit = () => {
        let alertMsg = verifyFields()
        if (alertMsg) {
            alertMsg += 'Please complete all fields correctly !'
            alert(alertMsg)
        }
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
                    style={styles.picker}
                >
                    <Picker.Item label="Select gender" value="" />
                    <Picker.Item label="Man" value="Man" />
                    <Picker.Item label="Woman" value="Woman" />
                </Picker>
                <TextInput
                    placeholder="Height"
                    onChangeText={(height) => onChangeHeight(height)}
                    keyboardType="numeric"
                    leading={(props) => <Icon name="account" {...props} />}
                    styles={styles.input}
                />
                <TextInput
                    placeholder="Weight"
                    onChangeText={(weight) => onChangeWeight(weight)}
                    keyboardType="numeric"
                    leading={(props) => <Icon name="account" {...props} />}
                />
                <Picker
                    selectedValue={activity}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedActivity(itemValue)
                    }
                    style={styles.picker}
                >
                    <Picker.Item label="Select your activity level" value="" />
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Light exercise" value="Light" />
                    <Picker.Item label="Moderate exercise" value="Moderate" />
                    <Picker.Item label="Heavy exercise" value="Heavy" />
                    <Picker.Item label="Extra exercise" value="Extra" />
                </Picker>
                <Picker
                    selectedValue={goal}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGoal(itemValue)
                    }
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
    picker: {
        borderColor: 'black',
    },
    Box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default HealthGoals
