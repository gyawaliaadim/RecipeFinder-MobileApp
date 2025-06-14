import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Details {
  categoryName: string;
  onCategoryPress: () => void;
  categoryColor: string;
}

const MealsCategory = ({ categoryName, onCategoryPress, categoryColor }: Details) => {
    const [pressed, setpressed] = useState(false)
    const onViewPress=()=>{
        setpressed(true)
        onCategoryPress()
    }
  return (
    <View style={[styles.rootContainer,  pressed?styles.pressed:null]}>
      <Pressable style={[styles.pressable,{ backgroundColor: categoryColor }]} onPressIn={onViewPress} onPressOut={()=>setpressed(false)}>
        <Text style={styles.textStyles}>{categoryName}</Text>
      </Pressable>
    </View>
  );
};

export default MealsCategory;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 20,
    margin: 16,
    width: 200,
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed:{

  },
  textStyles: {
    color:"black",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
