import Colors from '@/constants/Colors';
import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type MealItemProps = {
  item: {
    title: string;
    imageUrl: string;
    duration: number;
    complexity: string;
    affordability: string;
    id: string;
  };
  onClick: (id: string) => void;
};

const MealItem: React.FC<MealItemProps> = ({ item, onClick }) => {
  const convertToTitle = (text: string) => text[0].toUpperCase() + text.slice(1);

  return (
    <Pressable
      style={({ pressed }) => [styles.outerContainer, pressed ? styles.pressed : null]}
      onPress={() => onClick(item.id)}
      android_ripple={{ color: Colors.secondaryLight }}
    >
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.textInfo}>{item.duration}m</Text>
            <Text style={styles.textInfo}>{convertToTitle(item.complexity)}</Text>
            <Text style={styles.textInfo}>{convertToTitle(item.affordability)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: Platform.OS !== "android" ? 0.9 : 1,
  },
  outerContainer: {
    width: '95%',
    height: 300,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    outlineColor: "grey",
    outlineWidth: 3,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    height: '75%',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  detailsContainer: {
    height: '25%',
    padding: 8,
    justifyContent: 'space-around',
  },
  textInfo: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'grey',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "black",
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingHorizontal: 8,
  },
});
