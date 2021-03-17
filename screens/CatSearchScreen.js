import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

class CatSearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breeds: [],
            input: ''
        }
    }

    componentDidMount = () => {
        fetch(`https://api.thecatapi.com/v1/breeds?api_key=28d63f2d-2529-4a36-9bca-af21c9266759`)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    breeds: res
                })
            })
    }


    searchCat = (breeds) => {

    }


    renderGridItem = (itemData) => {
        let catImage = itemData.item.image ? itemData.item.image.url :
            'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg'
        return (

            <TouchableOpacity
                style={styles.gridItem}
                onPress={() =>
                    this.props.navigation.navigate('CatDetail', {
                        breed: itemData.item.name,
                        img: catImage,
                        breed_id: itemData.item.id
                    }
                    )}>
                <View style={styles.catInfo}>
                    {itemData.item.image ?
                        <Image
                            style={styles.image}
                            source={{
                                uri: catImage
                            }}
                        /> :
                        <Image
                            style={styles.image}
                            source={{
                                uri: catImage
                            }} />
                    }
                    <Text style={styles.text}>{itemData.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.input}
                        onChange={(e) => this.setState(
                            {
                                input: e.target.value
                            })}
                    />
                    <Button title='Search Cat' />
                </View>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.breeds}
                    renderItem={this.renderGridItem}
                    numColumns={2} />
            </View>
        )
    }

}

CatSearchScreen.navigationOptions = {
    headerTitle: 'Cat',
    headerStyle: {
        backgroundColor: Colors.orange
    },
    headerTintColor: 'white'
}



const styles = StyleSheet.create({
    screen: {
        margin: 35
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#30475e'
    },
    formContainer: {
        width: '100%'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 200
    },
    image: {
        height: 160,
        width: 160,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0 , height: 2},
        shadowRadius: 10,
    },
    imageContainer: {
        
    },
    catInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans-bold'
    }
})

export default CatSearchScreen;