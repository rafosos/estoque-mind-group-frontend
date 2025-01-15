import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSession } from "./ctx";
import StyledText from "@/components/styled/StyledText";
import StyledTextInput from "@/components/styled/StyledTextInput";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import ErroInput from "@/components/ErroInput";
import { errorHandler } from "@/services/service_base";
import AuthService from "@/services/auth_service";

export default function Login() {
    const { signIn } = useSession();
    const authService = AuthService();
    const [erros, setErros] = useState<any>({});
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
  
    const passRef = useRef<TextInput>(null);

    const handleLogin = () => {
        let erroObj = {...erros};

        // checagem de erros
        erroObj = {...erros,
            geral: false,
            inputLogin: !email,
            inputSenha: !senha,
        };
        setErros(erroObj);

        // se algum erro existe, a função .some vai voltar true e não vai chamar submit
        if(Object.values(erroObj).some(err => err)) return;

        setLoading(true);
        authService.login(email, senha)
            .then(res => {
                if (res){
                    signIn(res.token, res.nome);
                    router.replace("/");
                } else {
                    setErros({...erroObj, geral: `Login e senha inválidos ou incompatíveis, confira as informações inseridas e tente novamente.`});
                }
            })
            .catch(err => {
                errorHandler(err);
                if(err.response && err.response.status == 401)
                    setErros({...erroObj, geral: `Login e senha inválidos ou incompatíveis, cheque as informações e tente novamente.`});
                else if(err.message == "Network Error") //server is down
                    setErros({...erroObj, geral: `Erro: ${err.message}`});
                else
                    setErros({...erroObj, geral: `Erro: ${err.message}`});
            })
            .finally(() => setLoading(false));
    };

    return (
        <View style={styles.container}>
            <StyledText style={styles.title}>Login</StyledText>
            <View style={styles.separator} />
            
            <ErroInput
                show={erros.geral}
                texto={erros.geral}
            />

            <View style={[styles.txtInputIcon, erros.inputLogin && styles.inputErro]}>
                <Feather name="mail" style={[styles.iconeTxtInput, erros.inputLogin && styles.inputErro]}/>
                <StyledTextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={(txt:string) => setEmail(txt)} 
                    style={[styles.input, erros.inputLogin && styles.inputErro]}
                    enterKeyHint="next"
                    keyboardType="email-address"
                    submitBehavior="submit"
                    onBlur={() => setErros({...erros, "inputLogin": !email})}
                    onSubmitEditing={() => passRef.current && passRef.current.focus()}
                />
            </View>
            <ErroInput
                show={erros.inputLogin}
                texto="O email é obrigatório!"
            />

            <View style={[styles.txtInputIcon, erros.inputSenha && styles.inputErro]}>
                <Feather name="lock" style={[styles.iconeTxtInput, erros.inputSenha && styles.inputErro]}/>
                <StyledTextInput
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onBlur={() => setErros({...erros, "inputSenha": !senha})}
                    onChangeText={(txt) => setSenha(txt)}
                    style={styles.input}
                    ref={passRef}
                    onSubmitEditing={() => handleLogin()} 
                />
            </View>
            <ErroInput
                show={erros.inputSenha}
                texto="A senha é obrigatória!"
            />

            <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
            {loading ? <ActivityIndicator size={"small"} color={colors.verde.padrao}/> : 
                <StyledText style={styles.txtBotaoEntrar}>ENTRAR</StyledText>}
            </TouchableOpacity>

            <View style={styles.separator} />
            
            <StyledText>Ainda não tem conta?</StyledText>

            <TouchableOpacity style={styles.botaoEntrar} onPress={() => router.push("/cadastro")}>
                <StyledText style={styles.txtBotaoEntrar}>CADASTRE-SE AGORA!</StyledText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.branco.padrao,
    },
    title: {
        fontSize: 40,
        fontFamily: fonts.padrao.Medium500,
        textAlign: 'center'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: "center",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    txtInputIcon:{
        width: "80%",
        flexDirection: "row",
        borderWidth: 1,
        backgroundColor: colors.branco.padrao,
        borderColor: colors.preto.padrao,
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },
    iconeTxtInput:{
        alignSelf: 'center',
        paddingRight: 5,
        fontSize: 18,
        color: colors.preto.padrao 
    },
    input: {
        flex:1
    },
    inputErro:{
        borderColor: colors.vermelho.padrao,
        color: colors.vermelho.padrao
    },
    botaoEntrar:{
        backgroundColor: colors.cinza.escuro,
        padding:10,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 5
    },
    txtBotaoEntrar:{
        color: colors.branco.padrao,
    }
});