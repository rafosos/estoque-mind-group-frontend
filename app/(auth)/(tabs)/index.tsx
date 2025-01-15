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
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

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

    const arrayBufferToBase64 = (buffer: any) => {
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
            columnWrapperStyle={styles.columnWrapper}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getProdutos}/>}
            data={produtos}
            numColumns={2}
            ListHeaderComponent={<>
                <StyledText style={styles.greetings}>Olá, {nome}</StyledText>
                <StyledText style={styles.seusProdutos}>Seus produtos:</StyledText>
            </>}
            ListHeaderComponentStyle={styles.containerHeader}
            renderItem={({item}) => 
                    <View style={styles.containerCardProduto}>

                <View style={styles.cardProduto}>
                    <Image 
                        source={item.imagem ?
                            {uri: 'data:image/jpeg;base64,' + arrayBufferToBase64(item.imagem.data)}
                            : require('@/assets/images/default-product-img.png')
                        } 
                        resizeMode="cover" 
                        style={styles.imagemCard}
                    />
                    <StyledText style={styles.nomeProduto}>{item.nome}</StyledText>
                    <StyledText style={styles.qtdProduto}>Em estoque: {item.quantidade}</StyledText>
                    <StyledText numberOfLines={2} style={styles.descricaoProduto}>{item.descricao}</StyledText>
                            </View>
                </View>
            }
            ListEmptyComponent={
                <View style={styles.listEmptyContainer}>
                    <Link href="/(auth)/(tabs)/add_produto" style={styles.txtListEmpty}>
                        Parece que você não tem produtos cadastrados ainda... Você pode cadastrar um agora clicando aqui!
                        {"\n\n"}<AntDesign name="plussquare" size={28} color={colors.cinza.escuro} />
                    </Link>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 10,
        flex: 1
    },
    containerHeader:{
    },
    columnWrapper:{
        // gap:20
    },
    greetings:{
        fontSize: 25,
        fontFamily: fonts.padrao.SemiBold600
    },
    seusProdutos:{
        marginTop:25,
        fontSize: 17,
        marginBottom:15
    },
    containerCardProduto:{
        paddingHorizontal: 5,
        maxWidth: '50%',
        flex: 1/2,
    },
    cardProduto:{
        borderWidth: 1,
        borderColor: colors.cinza.medio2,
        borderRadius: 15,
        padding: 5,
        height: 250,
        overflow: 'hidden'
    },
    imagemCard:{
        borderRadius: 15,
        width: '100%',
        height: '65%'
    },
    nomeProduto:{
        fontSize: 15,
        fontFamily: fonts.padrao.SemiBold600
    },
    descricaoProduto:{
        color: colors.cinza.medio2,
    },
    qtdProduto:{
        fontSize: 15
    },
    listEmptyContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 50
    },
    txtListEmpty:{
        textAlign: 'center',
    }
});