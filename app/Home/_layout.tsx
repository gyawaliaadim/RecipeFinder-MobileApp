import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: "white",

        },
        headerStyle: {

          backgroundColor: Colors.secondaryLight
        },
        contentStyle: {
          backgroundColor: Colors.secondaryDark
        },
        headerTintColor: "white",

      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home"
        }}

      />
      <Stack.Screen
        name="mealsOverview"

      />
      <Stack.Screen
        name="mealDetails"

      />


    </Stack>)
}