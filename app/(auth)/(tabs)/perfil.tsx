import React from 'react';
import { useSession } from "@/app/ctx";
import StyledText from "@/components/styled/StyledText";
import { errorHandler } from "@/services/service_base";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/Fonts';
import UserService from '@/services/user_service';
import { User } from '@/classes/user';
import { useToast } from 'react-native-toast-notifications';
import ModalConfirmacao from '@/components/ModalConfirmacao';

export default function perfil(){
    const {nome, signOut} = useSession();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [modalSair, setModalSair] = useState(false);

    const userService = UserService();

    const toast = useToast();

    useEffect(() => {
        getUsuario();
    },[]);

    const getUsuario = () => {
        setLoading(true);
        userService.getUser()
            .then(res => setUser(res))
            .catch(err => errorHandler(err))
            .finally(() => setLoading(false));
    }

    const sair = () => {
        signOut();
        toast.show("Até mais!", {type: 'normal'});
    }
    
    return (    
        <View style={styles.container}>
            <ModalConfirmacao 
                titulo='Deseja mesmo sair?'
                mensagem='Seus produtos vão sentir saudades!'
                show={modalSair}
                onCancel={() => setModalSair(false)}
                onConfirm={sair}
            />
            <StyledText style={styles.nome}>{user?.nome ?? nome}</StyledText>

            <View style={styles.containerCards}>
                <View style={styles.card}>
                    <StyledText style={styles.tituloCard}>Produtos cadastrados</StyledText>
                    <StyledText style={styles.valorCard}>{user?.qtdProdutos || 0}</StyledText>
                    <StyledText style={styles.legendaValorCard}>produtos</StyledText>
                </View>
                <View style={styles.card}>
                    <StyledText style={styles.tituloCard}>Unidades em estoque</StyledText>
                    <StyledText style={styles.valorCard}>{user?.somaProdutos || 0}</StyledText>
                    <StyledText style={styles.legendaValorCard}>unidades</StyledText>
                </View>
            </View>
        
            <View style={styles.containerInfo}>
                <StyledText style={styles.tituloInfo}>Email</StyledText>
                <StyledText style={styles.info}>{user?.email}</StyledText>
            </View>

            <View style={styles.containerInfo}>
                <StyledText style={styles.tituloInfo}>Senha</StyledText>
                <StyledText style={styles.info}>*********</StyledText>
            </View>

            <TouchableOpacity style={styles.botaoSair} onPress={() => setModalSair(true)}>
                <StyledText style={styles.txtBotaoSair}>SAIR</StyledText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    containerCards:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    card:{
        borderWidth: 1,
        borderColor: colors.cinza.escuro,
        borderRadius: 15,
        alignContent: 'center',
        padding: 10
    },
    tituloCard:{
        textAlign: 'center'
    },
    valorCard:{
        textAlign: 'center',
        fontSize: 20
    },
    legendaValorCard:{
        textAlign: 'center'
    },
    nome:{
        textAlign: 'center',
        fontSize: 30
    },
    containerInfo:{
        width: '100%',
    },
    tituloInfo:{
        fontSize: 20
    },
    info:{
        fontSize: 16,
        borderBottomColor: colors.cinza.escuro,
        borderBottomWidth: 1,
        color: colors.cinza.medio2,
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    cardProduto:{
        borderWidth: 1,
        borderColor: colors.cinza.escuro,
        borderRadius: 15,
        padding: 5,
        margin: 3
    },
    nomeProduto:{
        fontSize: 15,
        fontFamily: fonts.padrao.SemiBold600
    },
    descricaoProduto:{

    },
    qtdProduto:{
        textAlign: 'center',
        fontSize: 15
    },
    botaoSair:{
        backgroundColor: colors.vermelho.padrao,
        paddingVertical: 7,
        width: "100%",
        borderRadius: 25
    },
    txtBotaoSair:{
        color: colors.branco.padrao,
        textAlign: 'center',
        fontSize: 15
    }
});