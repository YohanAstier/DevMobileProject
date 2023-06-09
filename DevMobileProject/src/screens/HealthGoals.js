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
    const onSubmit = () => {
        alert('test ' + gender)
    }

    return (
        <View>
            <View style={styles.subContainer}>
                <TextInput
                    placeholder="Age"
                    onChangeText={(age) => onChangeAge(age)}
                    keyboardType="numeric"
                    leading={props => <Icon name="account" {...props} />}
                />
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                    }
                    style={styles.picker}
                >
                    <Picker.Item label="Homme" value="Homme" />
                    <Picker.Item label="Femme" value="Femme" />
                </Picker>
                <Flex style={styles.Box}>
                    <TextInput
                        placeholder="Height"
                        onChangeText={(height) => onChangeHeight(height)}
                        keyboardType="numeric"
                        leading={props => <Icon name="account" {...props} />}
                        styles={styles.input}
                    />
                    <TextInput
                        placeholder="Weight"
                        onChangeText={(weight) => onChangeWeight(weight)}
                        keyboardType="numeric"
                        leading={props => <Icon name="account" {...props} />}
                    />
                </Flex>
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
    input: {
        
    },
    picker: {
        borderColor: 'black',
    },
    Box: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
})

export default HealthGoals
