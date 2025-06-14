import MealsCategory from '@/components/MealsCategory';
import { CATEGORIES } from "@/data/dummy-data";
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {

  const onPress = (item: { id:string, title: string; color: string }) => {
  
    router.push({
      pathname: '/Home/mealsOverview',
      params: { mealsOverview: item.id }
    });

  }
  return (
    // <MainView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {CATEGORIES.map((item,index) => (
            <MealsCategory
              key={index}
              categoryName={item.title}
              categoryColor={item.color}
              onCategoryPress={()=>onPress(item)}
            />
          ))}
        </View>
      </ScrollView>
    // </MainView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
      // flex:1
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
