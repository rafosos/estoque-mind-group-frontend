import { colors } from "@/constants/Colors";
import { AntDesign, FontAwesome5, Fontisto } from "@expo/vector-icons";
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
                name="add_produto"
                options={{
                    tabBarIcon: ({focused}) => <AntDesign name="plussquare" size={28} color={focused ? colors.preto.padrao : colors.cinza.claro} />
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