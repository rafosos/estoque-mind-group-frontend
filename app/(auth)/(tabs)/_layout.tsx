import { colors } from "@/constants/Colors";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout(){
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    tabBarIcon: ({focused}) => <FontAwesome5 name="boxes" size={28} color={focused ? colors.preto.padrao : colors.cinza.claro} />
                }}  
            />
            <Tabs.Screen
                name="movimento"
                options={{
                    tabBarIcon: ({focused}) => <Fontisto name="arrow-swap" style={{transform: [{rotateY: '180deg'}]}} size={28} color={focused ? colors.preto.padrao : colors.cinza.claro} />
                }} 
            />
            <Tabs.Screen 
                name="perfil"
                options={{
                    tabBarIcon: ({focused}) => <Fontisto name="person" size={28} color={focused ? colors.preto.padrao : colors.cinza.claro} /> 
                }}  
            />
        </Tabs>
    )
}