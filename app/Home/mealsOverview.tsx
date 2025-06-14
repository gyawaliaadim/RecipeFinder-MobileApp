import MealItem from '@/components/MealItem';
import { CATEGORIES, MEALS } from '@/data/dummy-data';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

type MealItemType = {
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  id: string;
};

const index = () => {
  const [category, setCategory] = useState({ id: "", color: "", title: "" });
  const { mealsOverview } = useLocalSearchParams<{ mealsOverview: string }>();

  useEffect(() => {
    const categoryFind = CATEGORIES.find((category) => category.id === mealsOverview);
    if (categoryFind) {
      setCategory(categoryFind);
    }
    // console.log("Category found:", categoryFind);
  }, []);

  // console.log(category)
  const displayedMeals = MEALS.filter((meal) => meal.categoryIds.includes(category.id));

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
  console.log("Displayed meals:", displayedMeals);
  return (
    <>
      <Stack.Screen options={{ headerTitle: category.title }} />
      <View style={styles.container}>
        <FlatList
          data={displayedMeals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderMealItem(item)}
        />
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
