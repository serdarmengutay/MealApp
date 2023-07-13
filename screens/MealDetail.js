import React, {useEffect, useLayoutEffect} from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetailsComp from "../components/MealDetailsComp";
import Subtitle from "../components/mealDetail/Subtitle";
import List from "../components/mealDetail/List";
import IconButton from "../components/IconButton";

function MealDetail({ route, navigation }) {
  const mealId = route.params.mealId;

  const selectedMeals = MEALS.find((meal) => meal.id === mealId);


    function headerButtonPressHandler(){
        console.log('Pressed!')
    }

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => {
            return (
                <IconButton onPress={headerButtonPressHandler} icon="star" color="white"/>
            )
        }
    
    })
  }, [headerButtonPressHandler, navigation])

  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeals.imageUrl }} />
      <Text style={styles.title}>{selectedMeals.title}</Text>
      <MealDetailsComp
        duration={selectedMeals.duration}
        affordability={selectedMeals.affordability}
        complexity={selectedMeals.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
      <View style={styles.listContainer}>
      <Subtitle>Ingredients</Subtitle>
      <List data={selectedMeals.ingredients} />

      <Subtitle>Steps</Subtitle>
      <List data={selectedMeals.steps} />
      </View>
      </View>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    root: {
        marginBottom: 32
    },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: 'center'
  },
  listContainer: {
    width: '80%',
  }
});
export default MealDetail;
