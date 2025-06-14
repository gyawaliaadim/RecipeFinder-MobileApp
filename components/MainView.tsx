import Colors from '@/constants/Colors';
// import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
// import {  } from 'react-native-reanimated/lib/typescript/Animated';
interface MainViewProps {
    children: React.ReactNode;
}

const MainView: React.FC<MainViewProps> = ({ children }) => {
    return (

        <>
            <StatusBar
                backgroundColor={Colors.secondaryLight}
            />
            <View style={[styles.background, styles.bgColor]}>
                {children}
            </View>
        </>
    );
}

export default MainView

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: Colors.black
    },
    background: {
        flex: 1,
    }
})