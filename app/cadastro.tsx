import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useNavigation } from "expo-router";
import StyledText from "@/components/styled/StyledText";
import StyledTextInput from "@/components/styled/StyledTextInput";
import { fonts } from "@/constants/Fonts";
import { colors } from "@/constants/Colors";
import ErroInput from "@/components/ErroInput";
import { AntDesign } from "@expo/vector-icons";
import AuthService from "@/services/auth_service";
import { useToast } from "react-native-toast-notifications";

export default function Cadastro() {    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState<any>({});
    const [loading, setLoading] = useState(false);
    
    const authService = AuthService();
    const toast = useToast();
    
    const emailRef = useRef<TextInput>(null);
    const senhaRef = useRef<TextInput>(null);
    
    const navigator = useNavigation();


    const handleCadastrar = () => {        
        let erroObj = {...erros};

        // checagem de erros
        erroObj = {...erros,
            geral: false,
            nome: !nome,
            email: !email,
            senha: !senha
        };
        setErros(erroObj);
        
        // se algum erro existe, a função .some vai voltar true e não vai chamar submit
        if(Object.values(erroObj).some(err => err)) return;
        
        setLoading(true);
        authService.cadastro({nome, email, senha})
            .then(res => {
                if (res){
                    router.back();
                    toast.show("Cadastro concluído com sucesso!", {type: 'success'});
                }
            })
            .catch(err => {
                if (err.response){
                    setErros({...erros,
                        geral: err.response.data.detail,
                        username: err.response.data.detail.includes("Username"),
                        email: err.response.data.detail.includes("Email"),
                    });
                }
            })
            .finally(()=>setLoading(false));
    };

    return (
        <View style={styles.container}>

            <AntDesign name="arrowleft" onPress={() => navigator.goBack()} style={styles.iconeVoltar} />
            
            <StyledText style={styles.title}>Cadastro</StyledText>
            <View style={styles.separator} />

            <ErroInput
                show={erros.geral} 
                texto={erros.geral}
            />
            
            <StyledTextInput 
                placeholder="Nome"
                value={nome}
                onChangeText={(txt) => setNome(txt)} 
                style={[styles.input, erros.nome && styles.inputErro]}
                enterKeyHint="next"
                submitBehavior="submit"
                onBlur={() => setErros({...erros, nome: !nome})}
                onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
                />
            <ErroInput 
                show={erros.nome && !erros.geral}
                texto="O nome é obrigatório!"
                />

            <StyledTextInput
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChangeText={(txt) => setEmail(txt)} 
                enterKeyHint="next"
                ref={emailRef}
                style={[styles.input, erros.email && styles.inputErro]}
                submitBehavior="submit"
                onBlur={() => setErros({...erros, email: !email})}
                onSubmitEditing={() => senhaRef.current && senhaRef.current.focus()}
                />
            <ErroInput 
                show={erros.email && !erros.geral}
                texto="O email é obrigatório!"
            />

            <StyledTextInput
                placeholder="Senha"
                secureTextEntry
                value={senha}
                ref={senhaRef}
                onChangeText={(txt: string) => setSenha(txt)}
                onBlur={() => setErros({...erros, senha: !senha})} 
                style={[styles.input, erros.senha && styles.inputErro]}
                onSubmitEditing={handleCadastrar}
            />
            <ErroInput
                show={erros.senha}
                texto="O campo senha é obrigatório."
            />

            <TouchableOpacity style={styles.botaoEnviar} onPress={handleCadastrar}>
                {loading ? <ActivityIndicator size={"small"} color={colors.verde.padrao}/> : 
                    <StyledText style={styles.textBotaoEnviar}>CADASTRAR</StyledText>
                }
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.branco.padrao,
        alignItems: "center",
        justifyContent: "center",
    },
    iconeVoltar:{
        fontSize: 30, 
        color: colors.preto.padrao, 
        position: 'absolute', 
        top: 15, 
        left: 15
    },
    title: {
        fontSize: 40,
        fontFamily: fonts.padrao.Medium500,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    input: {
        width: "80%",
        borderWidth: 1,
        backgroundColor: colors.branco.padrao,
        borderColor: colors.preto.padrao,
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },
    inputErro:{
        borderColor: colors.vermelho.erro,
        color: colors.vermelho.erro
    },
    botaoEnviar:{
        backgroundColor: colors.cinza.escuro,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 5,
        padding: 10,
        paddingHorizontal: 25
    },
    textBotaoEnviar:{
        color: colors.branco.padrao
    }
});