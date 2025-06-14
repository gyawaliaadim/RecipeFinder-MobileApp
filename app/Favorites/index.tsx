import MealItem from '@/components/MealItem';
import Colors from '@/constants/Colors';
import { MEALS } from '@/data/dummy-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
type MealItemType = {
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  id: string;
};

const index = () => {
  const [meals, setMeals] = useState<MealItemType[]>([]);


  useFocusEffect(
    React.useCallback(() => {
      const getMeals = async () => {
        const favorites = await AsyncStorage.getItem('favorites');
        const mealFind = MEALS.filter((meal) => favorites?.includes(meal.id));
        setMeals(mealFind);
      };
      getMeals();
    }, [])
  );

  // console.log(category)

  const handleClick = (mealDetails: string) => {
    router.push({
      pathname: '/Home/mealDetails',
      params: { mealDetails: mealDetails }
    });
  };

  const renderMealItem = (item: MealItemType) => {
    return (
      <MealItem
        item={item}
        onClick={(id: string) => handleClick(id)}
      />
    );
  };
  console.log("Displayed meals:", meals);
  return (
    <>
      {/* You may want to set a header title here, adjust as needed */}
      <View style={styles.container}>
        {
          meals.length === 0 && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{color:Colors.primaryLight, fontWeight:"bold", fontSize:24}}>Find your favorite meals here.</Text>
              <Text style={{color:Colors.primaryLight, fontWeight:"bold", fontSize:24}}>Go add some!</Text>
            </View>
          )
        }
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderMealItem(item)}
        />
      </View>
    </>
  );
}
export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
