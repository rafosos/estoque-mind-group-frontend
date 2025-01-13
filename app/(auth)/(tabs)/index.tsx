import React from 'react';
import { useSession } from "@/app/ctx";
import { Produto } from "@/classes/produto";
import StyledText from "@/components/styled/StyledText";
import ProdutoService from "@/services/produto_service";
import { errorHandlerDebug } from "@/services/service_base";
import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, View } from "react-native";
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/Fonts';

export default function Index(){
    const {nome} = useSession();
    const [refreshing, setRefreshing] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const produtoService = ProdutoService();

    useEffect(() => {
        getProdutos()
    },[]);

    const getProdutos = () => {
        setRefreshing(true);
        produtoService.getAll()
            .then(res => setProdutos(res))
            .catch(err => errorHandlerDebug(err))
            .finally(() => setRefreshing(false));
    }

    const getImage = (imageBlob: Blob | undefined) => {
        // if (!imageBlob) return;
        // // const reader = new FileReader();
        // console.log()
        // // reader.readAsDataURL(imageBlob);
        // console.log("oiii2")
        return `data:image/jpeg;base64,` + arrayBufferToBase64(imageBlob.data);
    }

    const arrayBufferToBase64 = (buffer: Buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };
    
    return (    
        <FlatList 
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getProdutos}/>}
            data={produtos}
            numColumns={2}
            ListHeaderComponent={<>
                <StyledText style={styles.greetings}>Olá, {nome}</StyledText>
                <StyledText>Seus produtos:</StyledText>
            </>}
            renderItem={({item}) => 
                <View style={styles.cardProduto}>
                    <Image source={{uri: getImage(item.imagem)}} style={{resizeMode: 'cover', width: 100, height:100}}/>
                    <StyledText style={styles.nomeProduto}>{item.nome}</StyledText>
                    <StyledText style={styles.descricaoProduto}>{item.descricao}</StyledText>
                    <StyledText style={styles.qtdProduto}>Em estoque: {item.quantidade}</StyledText>
                </View>
            }
            // TODO:
            // ListEmptyComponent={<></>}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    greetings:{
        fontSize: 25
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