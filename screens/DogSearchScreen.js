import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import LoadDogAnimation from "../Animation/LoadDogAnimation";
const dimensions = Dimensions.get("window");
class DogSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      filterBreeds: [],
      input: "",
      isAnimationTimeOut: false,
    };
  }

  componentDidMount = () => {
    fetch(
      `https://api.thedogapi.com/v1/breeds?api_key=28d63f2d-2529-4a36-9bca-af21c9266759`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("dddddddd");
        this.setState({
          breeds: res,
          filterBreeds: res,
        });
      });

    this.counterTimer = setTimeout(
      () =>
        this.setState({
          isAnimationTimeOut: true,
        }),
      2300
    );
  };

  // componentWillUnmount = () => {
  //     clearInterval(this.counterTimer);
  // }

  renderGridItem = (itemData) => {
    let dogImage = itemData.item.image
      ? itemData.item.image.url
      : "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg";
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() =>
          this.props.navigation.navigate("DogDetail", {
            breed: itemData.item.name,
            img: dogImage,
            breed_id: itemData.item.id,
          })
        }
      >
        <View style={styles.dogInfo}>
          {itemData.item.image ? (
            <Image
              style={styles.image}
              source={{
                uri: dogImage,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: dogImage,
              }}
            />
          )}
          <Text style={styles.text}>{itemData.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleSearch = () => {
    let { breeds, input } = this.state;

    let newBreeds = breeds.filter(function (e) {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      filterBreeds: newBreeds,
    });
  };

  render() {
    console.log(this.state.breeds);
    return (
      <View
        style={
          this.state.isAnimationTimeOut ? styles.screen : styles.animationScreen
        }
      >
        {this.state.isAnimationTimeOut ? (
          <View style={{flex: 1}}>
            <Image
              style={styles.searchImage}
              source={require("../assets/dogSearch.png")}
              resizeMode="contain"
            />
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={this.state.input}
                placeholder={"  🔍   Explore Breed (e.g. husky)       "}
                onChangeText={(e) =>
                  this.setState(
                    {
                      input: e,
                    },
                    this.handleSearch
                  )
                }
              />
              <Button
                style={{ marginTop: 100 }}
                title="Search Dog"
                onPress={this.handleSearch}
              />
            </View>
            <FlatList
              keyExtractor={(item, index) => index}
              data={this.state.filterBreeds}
              renderItem={this.renderGridItem}
              numColumns={2}
            />
          </View>
        ) : (
          <LoadDogAnimation />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // margin: 35,
  },
  animationScreen: {
    flex: 1,
    // margin: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    // paddingHorizontal: 2,
    // paddingVertical: 5,
    marginBottom: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#30475e",
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 200,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  searchImage: {
    width: dimensions.width,
    height: dimensions.height / 5,
    marginTop: "-5%",
    alignSelf: "flex-start",
  },
  dogInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
  },
});

export default DogSearchScreen;
