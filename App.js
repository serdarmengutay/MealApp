import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import { Ionicons } from '@expo/vector-icons'
import MealDetail from "./screens/MealDetail";
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
import { Provider } from 'react-redux'
import { store }from './store/redux/store'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#351401" },
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle:  { backgroundColor: '#351401'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1'
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({color, size}) => (
            <Ionicons name="list" size={size} color={color}/>
          )
        }}
      />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} 
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="star" size={size} color={color}/>
          )
        }}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#351401'},
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f25',}
        }}>
          <Stack.Screen
            name="DrawerScreen"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetail}
            options={{
              title: "About the Meal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
