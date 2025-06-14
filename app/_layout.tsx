import MainView from '@/components/MainView';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, Tabs } from 'expo-router';
export default function RootLayout() {
  return (
    <>
    
      <Redirect href="/Home" />
      <MainView>
        <Tabs

          screenOptions={{
            tabBarActiveTintColor: Colors.primaryLight,
            tabBarStyle: {
              backgroundColor: Colors.secondaryLight
            },
            headerTitleStyle: {
              color: "white"
            },
            headerStyle: {
              backgroundColor: Colors.secondaryLight
            },
            headerTintColor: "white"
          }}
        >
          <Tabs.Screen
            name="Home"

            options={{

              headerShown: false,
              tabBarIcon: ({ focused, color, size }) =>
                focused ? <Ionicons name="home" size={size} color={color} /> : <Ionicons name="home-outline" size={size} color={color} />,
              tabBarShowLabel: false,


            }}
          />



          <Tabs.Screen
            name="Favorites"
            options={{
              title: "Favorites",

              tabBarIcon: ({ focused, color, size }) =>
                focused ? <MaterialIcons name="favorite" size={size} color={color} /> : <MaterialIcons name="favorite-border" size={size} color={color} />,
              tabBarShowLabel: false
            }}
          />

        </Tabs>
      </MainView>

    </>
  );
}