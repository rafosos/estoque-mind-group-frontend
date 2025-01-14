import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "./styled/StyledText";
import { fonts } from "@/constants/Fonts";
import { colors } from "@/constants/Colors";

interface Props{
    show: boolean;
    titulo: string;
    mensagem: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ModalConfirmacao({show, titulo, mensagem, onCancel, onConfirm}: Props){
    return(
        <Modal
            visible={show}
            transparent
            animationType='slide'
        >
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.retangulo} activeOpacity={1} onPress={onCancel}></TouchableOpacity>

                <View>
                    <StyledText style={styles.titulo}>{titulo}</StyledText>
                    <StyledText style={styles.mensagem}>{mensagem}</StyledText>
                </View>

                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={[styles.botao, styles.botaoCancelar]} onPress={onCancel}>
                        <StyledText style={styles.txtBotao}>CANCELAR</StyledText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.botao, styles.botaoConfirmar]} onPress={onConfirm}>
                        <StyledText style={[styles.txtBotao, styles.txtBotaoConfirmar]}>CONFIRMAR</StyledText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent:{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '25%',
        width: '100%',
        backgroundColor: colors.branco.padrao,
        shadowColor: colors.preto.padrao,
        shadowOpacity: 1,
        elevation: 20,
        shadowRadius: 20,
        shadowOffset: {height: 10, width: 0},
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    retangulo:{
        backgroundColor: colors.cinza.escuro,
        width: 50,
        height: 5,
        position: 'absolute',
        top: 15
    } ,
    titulo:{
        fontFamily: fonts.padrao.Bold700,
        textAlign: 'center',
        fontSize: 23,
    },
    mensagem:{
        textAlign: 'center',
        fontSize: 17
    },
    containerBotoes:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    botao:{
        flex:1,
        paddingVertical: 7,
        alignItems: 'center',
        borderColor: colors.cinza.medio,
        borderRadius: 25
    },
    txtBotao:{
    },
    botaoCancelar:{
    },
    botaoConfirmar:{
        backgroundColor: colors.cinza.escuro
    },
    txtBotaoConfirmar:{
        color: colors.branco.padrao
    }
})