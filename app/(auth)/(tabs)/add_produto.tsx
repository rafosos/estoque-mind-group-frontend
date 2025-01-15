import StyledText from "@/components/styled/StyledText";
import { useRef, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import StyledTextInput from "@/components/styled/StyledTextInput";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import ProdutoService from "@/services/produto_service";
import { useToast } from "react-native-toast-notifications";
import { errorHandlerDebug } from "@/services/service_base";
import ErroInput from "@/components/ErroInput";

export default function AddProduto(){
    const [imagem, setImagem] = useState<string>();
    const [nome, setNome] = useState<string>();
    const [descricao, setDescricao] = useState<string>();
    const [valor, setValor] = useState<string>("0");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [erros, setErros] = useState<any>({});

    const produtoService = ProdutoService();
    const toast = useToast();

    const descricaoRef = useRef<TextInput>(null);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        
        if (!result.canceled) {            
            setImagem(result.assets[0].uri);
        }
    };

    const limparState = () => {
        setImagem(undefined);
        setNome(undefined);
        setDescricao(undefined);
        setValor("0");
        setQuantidade(0);
        setLoading(false);
    }

    const adicionarProduto = () => {
        setLoading(true);


        if (!nome){
            setErros({nome: true});
            return
        }
            
        produtoService.adicionarProduto(nome, descricao, Number(valor.replace(",", ".")), quantidade, imagem)
            .then(res => {
                toast.show("Produto adicionado com sucesso.", {type: 'success'});
                limparState();
            })
            .catch(err => errorHandlerDebug(err))
            .finally(() => setLoading(false));
    }

    const botaoAdicionarDisabled = () =>
        !nome || quantidade < 0 || loading;

    const updateQtdMenos = () =>
        setQuantidade((prev) => prev && prev > 0 ? prev - 1 : 0);

    const updateQtdMais = () =>
        setQuantidade((prev) => prev && prev > 0 ? prev + 1 : 1);

    const setCurrencyInput = (txt: string) => {
        txt = txt.replace(".", ",");
        if (txt[0] == "0" && txt[1] != ",")
            setValor(Number(txt).toString()) //Remove o 0 na esquerda
        else if (!txt)
            setValor("0");
        else setValor(txt);
    }

    return(
        <View style={styles.container}>
            <StyledText style={styles.header}>Novo produto</StyledText>

            <TouchableOpacity style={styles.moldura} onPress={pickImage}>
                {imagem ? <ImageBackground source={{uri: imagem}} resizeMode={'cover'} style={styles.imagem}/>
                : <StyledText style={styles.txtFoto}>Clique para adicionar foto</StyledText>
                }
            </TouchableOpacity>

            <View style={styles.containerInfo}>
                <StyledText style={styles.tituloInfo}>Nome*</StyledText>
                <StyledTextInput 
                    style={styles.info}
                    value={nome}
                    onChangeText={(txt) => setNome(txt)}
                    enterKeyHint="next"
                    onSubmitEditing={() => descricaoRef.current && descricaoRef.current.focus()}
                    onBlur={() => setErros({nome: !nome})}
                />
                <ErroInput
                    texto="O nome é obrigatório."
                    show={erros.nome}
                />
            </View>

            <View style={styles.containerInfo}>
                <StyledText style={styles.tituloInfo}>Descrição</StyledText>
                <StyledTextInput 
                    style={styles.info}
                    value={descricao}
                    multiline
                    ref={descricaoRef}
                    onChangeText={(txt) => setDescricao(txt)}
                />
            </View>

            <View style={styles.containerNumericos}>
                <View style={styles.containerInfoNumericos}>
                    <StyledText style={[styles.tituloInfo, styles.tituloNumericos]}>Valor</StyledText>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <StyledText>R$</StyledText>
                        <StyledTextInput 
                            style={[styles.info, styles.txtInputValor]}
                            value={valor.toString()}
                            keyboardType="decimal-pad"
                            onChangeText={setCurrencyInput}
                        />
                    </View>
                </View>

                <View style={styles.containerInfoNumericos}>
                    <StyledText style={[styles.tituloInfo, styles.tituloNumericos]}>Quantidade</StyledText>
                    <View style={styles.containerQuantidade}>
                        <TouchableOpacity style={styles.botaoQuantidade} onPress={updateQtdMenos}>
                            <StyledText style={styles.txtBotaoQuantidade}>-</StyledText>
                        </TouchableOpacity>
                        <StyledTextInput 
                            style={[styles.info, styles.txtInputQtd]}
                            value={quantidade?.toString()}
                            keyboardType="numeric"
                            onChangeText={(txt) => setQuantidade(Number(txt))}
                        />
                        <TouchableOpacity style={styles.botaoQuantidade} onPress={updateQtdMais}>
                            <StyledText style={styles.txtBotaoQuantidade}>+</StyledText>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>

            <TouchableOpacity onPress={adicionarProduto} disabled={botaoAdicionarDisabled()} style={[styles.botaoSalvar, botaoAdicionarDisabled() && {backgroundColor: colors.cinza.medio2}]}>
                {loading?
                <ActivityIndicator size={'small'} color={colors.cinza.escuro}/> :
                <StyledText style={styles.txtBotaoSalvar}>ADICIONAR</StyledText>
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={limparState} disabled={loading} style={styles.botaoLimpar}>
                <StyledText style={styles.txtBotaoLimpar}>LIMPAR CAMPOS</StyledText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10
    },
    header:{
        fontSize: 22,
        fontFamily: fonts.padrao.SemiBold600,
        marginVertical:15 
    },
    moldura:{
        alignSelf: "center",
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: colors.cinza.medio,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    imagem:{
        flex:1  
    },
    txtFoto:{
        textAlign: 'center',
        color: colors.cinza.escuro
    },
    containerInfo:{
        marginBottom: 20
    },
    tituloInfo:{
        fontSize: 18
    },
    info:{
        fontSize: 16,
        borderBottomColor: colors.cinza.escuro,
        borderBottomWidth: 1,
        color: colors.cinza.medio2,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 5
    },
    containerNumericos:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "100%",
    },
    containerInfoNumericos:{
        flex:1,
        marginHorizontal: 10
    },
    tituloNumericos:{
        textAlign: 'center'  
    },
    containerQuantidade:{
        flexDirection: 'row',
        flex: 1
    },
    botaoQuantidade:{
        flex: 2        
    },
    txtBotaoQuantidade:{
        textAlign: 'center',
        fontSize: 25,
    },
    txtInputValor:{
        textAlign: 'center',
        flex:1
    },
    txtInputQtd:{
        flex: 3,
        textAlign: 'center'
    },
    botaoSalvar:{
        backgroundColor: colors.verde.padrao,
        padding: 7,
        width: "100%",
        marginVertical: 15,
        marginTop: 50,
        borderRadius: 20
    },
    txtBotaoSalvar:{
        color: colors.branco.padrao,
        textAlign: 'center'
    },
    botaoLimpar:{
        padding: 7
    },
    txtBotaoLimpar:{
        textAlign: 'center',
        color: colors.cinza.escuro
    }
})