import { FOOD_APP_API_KEY, FOOD_APP_ID } from '@env'
import React from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

const FoodDatabase = ({ navigation }) => {
    const [food, onChangeFood] = React.useState('')
    let test = ''
    function getFood(food) {
        const url =
            'https://api.edamam.com/api/food-database/v2/parser?app_id=' +
            FOOD_APP_ID +
            '&app_key=' +
            FOOD_APP_API_KEY +
            '&ingr=' +
            food
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const onSubmit = () => {
        getFood(food)
            .then((r) => {
                test = r
            })
            .catch(error => alert("Une erreur a eu lieu lors de votre recherche!")
            )
        alert(test)
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
