import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GestureResponderEvent, TouchableOpacity, View, useColorScheme } from 'react-native';

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '../../assets';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


interface CustomTabBarButtonProps {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}


const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ children, onPress = () => { } }) => {
  return <TouchableOpacity style={{
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  }}
    onPress={onPress}
  >
    <View style={{
      paddingTop: 21,
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: COLORS.primary
    }}>
      {children}
    </View>
  </TouchableOpacity>
}

export default function TabLayout() {

  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Tab One',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //       headerRight: () => (
    //         <Link href="/modal" asChild>
    //           <Pressable>
    //             {({ pressed }) => (
    //               <FontAwesome
    //                 name="info-circle"
    //                 size={25}
    //                 color={Colors[colorScheme ?? 'light'].text}
    //                 style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
    //               />
    //             )}
    //           </Pressable>
    //         </Link>
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="two"
    //     options={{
    //       title: 'Tab Two',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //     }}
    //   />
    // </Tabs>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          height: 70,
          borderColor: COLORS.primary,
          borderTopColor: COLORS.primary,
        },
        tabBarLabelStyle: {
          fontFamily: 'mon-b',
          fontSize: 12,
          marginBottom: 10,
          borderTopColor: COLORS.primary
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Yêu thích",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrove"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="skin" size={24} color="white" />
          ),
          tabBarButton: (props) => {
            return <CustomTabBarButton {...props} />
          }
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Đơn hàng",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
