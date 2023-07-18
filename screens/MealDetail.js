import React, {  useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetailsComp from "../components/MealDetailsComp";
import Subtitle from "../components/mealDetail/Subtitle";
import List from "../components/mealDetail/List";

import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from "../store/redux/favorites";

import IconButton from "../components/IconButton";
// import { FavoritesContext } from '../store/context/favorites-context'
function MealDetail({ route, navigation }) {

  // const favoriteMealCtx = useContext(FavoritesContext)
   const favoriteMealIds =  useSelector((state) => state.favoriteMeals.IDs);
    const dispatch = useDispatch()

  const mealId = route.params.mealId;

  const selectedMeals = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId)

  function changeFavoriteStatusHandler() {
    if ( mealIsFavorite) {
      // favoriteMealCtx.removeFavorite(mealId)
      dispatch(removeFavorite({ id: mealId }))
    } else {
      // favoriteMealCtx.addFavorite(mealId)
      dispatch(addFavorite({ id: mealId }))

    } 
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
          />
        );
      },
    });
  }, [changeFavoriteStatusHandler, navigation]);

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
    marginBottom: 32,
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
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
export default MealDetail;
