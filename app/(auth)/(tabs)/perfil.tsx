import React from 'react';
import { useSession } from "@/app/ctx";
import { Produto } from "@/classes/produto";
import StyledText from "@/components/styled/StyledText";
import ProdutoService from "@/services/produto_service";
import { errorHandlerDebug } from "@/services/service_base";
import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/Fonts';
import UserService from '@/services/user_service';
import { User } from '@/classes/user';
import { useToast } from 'react-native-toast-notifications';

export default function perfil(){
    const {nome, signOut} = useSession();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();

    const userService = UserService();

    const toast = useToast();

    useEffect(() => {
        getUsuario();
    },[]);

    const getUsuario = () => {
        setLoading(true);
        userService.getUser()
            .then(res => setUser(res))
            .catch(err => errorHandlerDebug(err))
            .finally(() => setLoading(false));
    }

    const sair = () => {
        signOut();
        toast.show("Até mais!", {type: 'normal'});
    }
    
    return (    
        <View style={styles.container}>
            <StyledText style={styles.nome}>{user?.nome ?? nome}</StyledText>
        
            <TouchableOpacity onPress={sair}>
                <StyledText>Sair</StyledText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    nome:{
        textAlign: 'center',
        fontSize: 30
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
    }
});