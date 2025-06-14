import Colors from '@/constants/Colors';
import { MEALS } from '@/data/dummy-data';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
const index = () => {
  const { mealDetails } = useLocalSearchParams<{ mealDetails: string }>();
    const [favorite, setFavorite] = useState<boolean>(false);
  const meal = MEALS.find((meal) => meal.id === mealDetails);
  const convertToTitle = (text: string) => text[0].toUpperCase() + text.slice(1);

  useEffect(() => {
    if (!meal) {
      router.push('/Home');
    }
    const getData = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites !== null) {
          // value previously stored
        }
        if (favorites && JSON.parse(favorites).includes(mealDetails)) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
      catch (e) {
        let value = {}
        // error reading value
      }
    };
    getData();
  }, [meal]);




  // console.log(meal);
  const favoriteButton = () => {
    return(
      <Pressable
        onPress={async () => {
          try {
            const favorites = await AsyncStorage.getItem('favorites');
            let updatedFavorites: string[] = favorites ? JSON.parse(favorites) : [];
            if (favorite) {
              updatedFavorites = updatedFavorites.filter((id) => id !== mealDetails);
              setFavorite(false);
            } else {
              updatedFavorites.push(mealDetails);
              setFavorite(true);
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          
          }
          catch (e) {
            console.error("Error updating favorites:", e);
          }
        }
      }
      >
    {favorite?
      <MaterialIcons name="favorite" size={24} color={Colors.primaryLight} />
      :
      <MaterialIcons name="favorite-border" size={24} color={Colors.primaryLight} />
    }
    </Pressable>
    )
    
  }


  return (<>
    <Stack.Screen options={{
      headerTitle: meal?.title
      ,
      headerRight: favoriteButton
    }}
    />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: meal?.imageUrl }}
          style={styles.image}
          resizeMode='cover'
        />
        <Text style={styles.titleText}>{meal?.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.textDetails}>{meal?.duration}m</Text>
          <Text style={styles.textDetails}>{convertToTitle(meal?.complexity)}</Text>
          <Text style={styles.textDetails}>{convertToTitle(meal?.affordability)}</Text>


        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
          {meal?.ingredients.map((ingredient: string, index: number) => (
            <Text key={index} style={styles.infoContainer}>{ingredient}</Text>
          ))}
        </View>
        <View style={styles.stepsContainer}>
          <Text style={styles.subtitle}>Steps</Text>
          {meal?.steps.map((step: string, index: number) => (
            <Text key={index} style={styles.infoContainer}>{step}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  </>
  )
}

export default index

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    // flex:1
  },
  titleText: {
    color: Colors.secondaryLight,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    minWidth: '80%',
  },
  text: {
    color: "white"
  },
  textDetails: {
    color: Colors.primaryLight,
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 3,

  },
  image: {
    height: 500,
    width: '100%',
  },
  ingredientsContainer: {
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.primaryLight,
    borderBottomWidth: 1,

  },
  stepsContainer: {
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.primaryLight,
    borderBottomWidth: 1,
  },
  subtitle: {
    color: Colors.primaryLight,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomColor: Colors.primaryLight,
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
  },
  infoContainer: {
    color: Colors.secondaryLight,
    backgroundColor: Colors.primaryLight,
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
    padding: 5,
    width: '90%',
    borderRadius: 8,
  },

})