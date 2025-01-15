import React from 'react';
import { useSession } from "@/app/ctx";
import { Produto } from "@/classes/produto";
import StyledText from "@/components/styled/StyledText";
import ProdutoService from "@/services/produto_service";
import { errorHandlerDebug } from "@/services/service_base";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/Fonts';
import { Link, router, useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { arrayBufferToBase64 } from '@/utils/arrayBufferToBase64';

export default function Index(){
    const {nome} = useSession();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const navigation = useNavigation();

    const produtoService = ProdutoService();

    useEffect(() => {
        setLoading(true);
        getProdutos()
            .finally(() => setLoading(false));
    },[]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          refresh();
        });
    
        return unsubscribe;
      }, [navigation]);

    const refresh = () => {
        setRefreshing(true);
        getProdutos();
    }

    const getProdutos = async () => {
        return await produtoService.getAll()
            .then(res => setProdutos(res))
            .catch(err => errorHandlerDebug(err))
            .finally(() => setRefreshing(false));
    }
    
    return (    
        <FlatList 
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}
            data={produtos}
            numColumns={2}
            ListHeaderComponent={<>
                <View style={styles.header}>
                    <StyledText style={styles.greetings}>Olá, {nome}</StyledText> 
                    <AntDesign 
                        onPress={() => router.push('/(auth)/addEditProduto')} 
                        name="plussquare" 
                        size={25} 
                        color={colors.cinza.escuro} 
                    />
                </View>
                <StyledText style={styles.seusProdutos}>Seus produtos:</StyledText>
            </>}
            renderItem={({item}) => 
                <TouchableOpacity onPress={() => router.push(`/(auth)/addEditProduto?id=${item.id}`)} style={styles.containerCardProduto}>
                    <View style={styles.cardProduto}>
                        <Image 
                            source={item.imagem ?
                                {uri: arrayBufferToBase64(item.imagem.data)}
                                : require('@/assets/images/default-product-img.png')
                            } 
                            resizeMode="cover" 
                            style={styles.imagemCard}
                        />
                        <StyledText style={styles.nomeProduto}>{item.nome}</StyledText>
                        <StyledText style={styles.qtdProduto}>Em estoque: {item.quantidade}</StyledText>
                        <StyledText numberOfLines={2} style={styles.descricaoProduto}>{item.descricao}</StyledText>
                    </View>
                </TouchableOpacity>
            }
            ListEmptyComponent={loading ? 
                <ActivityIndicator size={"large"} color={colors.cinza.escuro}/>
                :
                <View style={styles.listEmptyContainer}>
                    <TouchableOpacity onPress={() => router.push("/(auth)/addEditProduto")}>
                        <StyledText style={styles.txtListEmpty}>
                        Parece que você não tem produtos cadastrados ainda... Você pode cadastrar um agora clicando aqui!
                        {"\n\n"}<AntDesign name="plussquare" size={28} color={colors.cinza.escuro} />
                        </StyledText>
                    </TouchableOpacity>
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
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    greetings:{
        fontSize: 25,
        flex:1,
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