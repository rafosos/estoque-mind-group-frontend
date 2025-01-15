import React from 'react';
import StyledText from "@/components/styled/StyledText";
import ProdutoService from "@/services/produto_service";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { TipoMovimento } from "./(tabs)/movimento";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { AutocompleteDropdown, AutocompleteDropdownItem, IAutocompleteDropdownRef } from "react-native-autocomplete-dropdown";
import { useRef, useState } from "react";
import { ProdutoResultado } from "@/classes/produto";
import { errorHandlerDebug } from "@/services/service_base";
import StyledTextInput from "@/components/styled/StyledTextInput";
import { arrayBufferToBase64 } from '@/utils/arrayBufferToBase64';
import { useToast } from 'react-native-toast-notifications';

export default function AddMovimento() {
    const [resultados, setResultados] = useState<ProdutoResultado[]>([]);
    const [loading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState<ProdutoResultado[]>([]);

    const {tipo} = useLocalSearchParams();
    const produtoService = ProdutoService();
    const toast = useToast();
    const tipoNumber = Number(tipo);

    const dropdownController = useRef<IAutocompleteDropdownRef | null>(null);

    const onSelectItem = (item: AutocompleteDropdownItem) => {
        if(!item) return
        const p = resultados.splice(resultados.findIndex((r) => r.id.toString() == item.id),1);
        if(!p) return;
        setProdutos([...produtos, ...p]);
        setResultados([...resultados]);
        dropdownController.current?.clear();
    }
    
    const getProdutosDropdown = (txt: string) => {
        setLoading(true);

        produtoService.getProdutosFiltro(txt, produtos.map(p => p.id))
            .then(res => {
                const prods = res.map(p => {
                    p["movimentacao"] = 0;
                    return p;
                });
                setResultados(prods);
            })
            .catch(err => errorHandlerDebug(err))
            .finally(() => setLoading(false));
    }

    const submit = () => {
        setLoading(true);
        produtos.forEach(p => p.quantidade = p.quantidade + calcularMovimentacao(p))
        produtoService.addMovimentacao(produtos)
            .then(res => {
                toast.show("Estoque atualizado com sucesso.", {type: "success"});
                limparSair();
            })
            .catch(err => errorHandlerDebug(err))
            .finally(() => setLoading(false));
    }
    
    const calcularMovimentacao = (item: ProdutoResultado) => 
        tipoNumber == TipoMovimento.entrada ? 
        item.movimentacao
    : item.movimentacao * -1

    const limparSair = () => {
        setProdutos([]);
        router.back();
    }

    const removerItem = (index: number) => {
        const prodCopy = JSON.parse(JSON.stringify(produtos));
        prodCopy.splice(index, 1);
        setProdutos(prodCopy);
    }

    const updateQtdMenos = (index: number) =>{
        const prodNovo = JSON.parse(JSON.stringify(produtos)); //deep copy
        const item = prodNovo[index];

        item.movimentacao -= 1;
        
        setProdutos(prodNovo);
    }

    const updateQtdMais = (index: number) =>{
        const prodNovo = JSON.parse(JSON.stringify(produtos)); //deep copy
        const item = prodNovo[index];  
        item.movimentacao += 1;
        setProdutos(prodNovo);
    }
    
    const setQuantidade = (valor: string, index: number) => {
        const prodNovo = JSON.parse(JSON.stringify(produtos)); //deep copy
        const item = prodNovo[index];
        item.movimentacao = Number(valor);
        if (item.movimentacao < item.quantidade)
            item.movimentacao = item.quantidade
        setProdutos(prodNovo);
    }
    
    return (
        <FlatList
            contentContainerStyle={styles.container}
            ListHeaderComponent={<>
                <View style={styles.header}>
                    <Ionicons 
                        name="arrow-back" 
                        size={28} 
                        color={colors.preto.padrao}
                        onPress={() => router.back()} 
                        />
                    <StyledText style={styles.txtHeader}>Adicionar {tipoNumber == TipoMovimento.entrada ? "entrada" : "saída"}</StyledText>
                </View>

                <AutocompleteDropdown
                    controller={controller => {
                        dropdownController.current = controller
                    }}
                    direction={"down"}
                    dataSet={resultados ? resultados.map(res => {return {...res, id: res.id.toString(), title: res.nome}}) : []}
                    onSelectItem={(item) => item && onSelectItem(item)}
                    debounce={600}
                    suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                    loading={loading}
                    useFilter={false}
                    onChangeText={(txt) => getProdutosDropdown(txt)}
                    textInputProps={{
                        placeholder: 'Pesquisar produto',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {color: colors.preto.padrao},
                    }}
                    InputComponent={StyledTextInput}
                    inputContainerStyle={styles.inputAutocomplete}
                    suggestionsListTextStyle={styles.txtSuggestionList}
                    suggestionsListContainerStyle={styles.containerSuggestionList}
                    ClearIconComponent={<Feather name="x-circle" size={18} color={colors.preto.padrao} />}
                    closeOnBlur={true}
                    showChevron={false}
                    clearOnFocus={false}
                    closeOnSubmit
                    EmptyResultComponent={<></>}
                />
            </>}
            data={produtos}
            renderItem={({item, index}) => 
                <View style={styles.card}>
                    <Image 
                        source={item.imagem ?
                            {uri: arrayBufferToBase64(item.imagem.data)}
                            : require('@/assets/images/default-product-img.png')
                        }
                        style={styles.imagem}
                    />

                    <View style={styles.containerTxt}>
                        <StyledText style={styles.nome}>{item.nome}</StyledText>
                        <StyledText>Em estoque: {item.quantidade}</StyledText>
                        <StyledText>Quantidade após {TipoMovimento[tipoNumber]}: 
                            {item.quantidade + calcularMovimentacao(item)}</StyledText>
                    </View>

                    <View style={styles.containerQuantidade}>
                        <TouchableOpacity style={styles.botaoQuantidade} onPress={() => updateQtdMenos(index)}>
                            <StyledText style={styles.txtBotaoQuantidade}>-</StyledText>
                        </TouchableOpacity>
                        <StyledTextInput 
                            style={styles.txtInputQtd}
                            value={item.movimentacao.toString()}
                            keyboardType="numeric"
                            onChangeText={(txt) => setQuantidade(txt, index)}
                        />
                        <TouchableOpacity style={styles.botaoQuantidade} onPress={() => updateQtdMais(index)}>
                            <StyledText style={styles.txtBotaoQuantidade}>+</StyledText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerRemover}>
                        <AntDesign 
                            name="close" 
                            onPress={() => removerItem(index)} 
                            style={styles.remover} 
                        />
                    </View>
                                
                </View>
            }
            ListFooterComponent={<>
                <TouchableOpacity onPress={submit} disabled={!produtos.length} style={[styles.botao, styles.botaoSubmit]}>
                    <StyledText style={[styles.txtBotao, styles.txtBotaoSubmit]}>SALVAR</StyledText>
                </TouchableOpacity>
                <TouchableOpacity onPress={limparSair} disabled={loading} style={styles.botao}>
                    <StyledText style={styles.txtBotao}>CANCELAR</StyledText>
                </TouchableOpacity>
            </>
            }
            ListEmptyComponent={<View style={styles.listEmptyContainer}>
                <StyledText style={styles.txtEmptyList}>Pesquise um produto na barra de pesquisa.</StyledText>
            </View>}
        />
    )    
}

const styles = StyleSheet.create({
    container:{
        margin: 10,
        flex:1,
        gap: 15
    },
    header:{
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    txtHeader:{
        marginLeft: 15,
        fontSize: 25,
        fontFamily: fonts.padrao.SemiBold600
    },
    inputAutocomplete:{
        backgroundColor: colors.branco.padrao,
        borderWidth: 1,
        borderColor: colors.cinza.escuro
    },
    txtSuggestionList:{
        color:colors.preto.padrao
    },
    containerSuggestionList:{
        backgroundColor: colors.branco.padrao,
    },
    card:{
        borderWidth: 1,
        borderColor: colors.cinza.escuro,
        borderRadius: 15,
        padding: 7,
        flexDirection: 'row',
    },
    imagem:{
        borderRadius: 15,
        maxHeight: 100,
        height: '100%',
        aspectRatio: '1/1',
        flex:2
    },
    containerTxt:{
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 10,
        flex:3
    },
    nome:{
        fontFamily: fonts.padrao.Bold700,
        fontSize: 18,
    },
    containerQuantidade:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    botaoQuantidade:{
        flex: 2,
        justifyContent: 'center'
    },
    txtBotaoQuantidade:{
        textAlign: 'center',
        fontSize: 25,
    },
    txtInputQtd:{
        flex: 3,
        textAlign: 'center',
        fontSize: 16,
        borderBottomColor: colors.cinza.escuro,
        borderBottomWidth: 1,
        color: colors.cinza.medio2,
        paddingHorizontal: 5,
        marginBottom: 5
    },
    containerRemover:{
        flex: 1,
    },
    remover:{
        fontSize: 18,
        color: colors.preto.padrao,
        textAlign: 'right',
    },
    botao:{
        alignItems: 'center',
        padding: 7
    },
    botaoSubmit:{
        backgroundColor: colors.cinza.escuro,
        borderRadius: 15,
    },
    txtBotao:{
        color: colors.cinza.escuro,
        fontSize: 15,
        fontFamily: fonts.padrao.SemiBold600
    },
    txtBotaoSubmit:{
        color: colors.branco.padrao
    },
    listEmptyContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtEmptyList:{
        textAlign: 'center',
    }
})