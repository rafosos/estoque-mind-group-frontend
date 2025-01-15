import StyledText from "@/components/styled/StyledText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { router } from "expo-router";
import { Fontisto } from "@expo/vector-icons";

export enum TipoMovimento{
    entrada, saida
}

export default function Movimento(){

    const abrirAddMovimento = (tipo: TipoMovimento) => {
        router.push(`/(auth)/addMovimento?tipo=${tipo}`);
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => abrirAddMovimento(TipoMovimento.entrada)} style={styles.botaoSalvar}>
                <StyledText style={styles.txtBotaoSalvar}>Adicionar entrada</StyledText>
                <Fontisto name="arrow-up-l" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => abrirAddMovimento(TipoMovimento.saida)} style={styles.botaoSalvar}>
                <StyledText style={styles.txtBotaoSalvar}>Adicionar saída</StyledText>
                <Fontisto name="arrow-down-l" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 50,
        paddingVertical: 25,
        flex: 1,
        flexDirection: 'column',
        gap: 50
    },
    botaoSalvar:{
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.cinza.escuro,
        shadowColor: colors.preto.padrao,
        shadowOpacity: 1,
        elevation: 20,
        shadowRadius: 20,
        shadowOffset: {height: 10, width: 0},
        backgroundColor: colors.branco.padrao,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25
    },
    txtBotaoSalvar:{
        textAlign: 'center',
        fontFamily: fonts.padrao.Medium500,
        fontSize: 20
    }
})