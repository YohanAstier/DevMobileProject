import React from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

const FoodDatabase = ({ navigation }) => {
    const [food, onChangeFood] = React.useState('');
    const onSubmit = () => {
        alert(food)
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.searchLabel}>
                    Choisissez l'aliment à rechercher
                </Text>
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Nourriture"
                    onChangeText={onChangeFood}
                />
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
    searchLabel: {
        fontSize: 18,
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 10,
    },
})

export default FoodDatabase
