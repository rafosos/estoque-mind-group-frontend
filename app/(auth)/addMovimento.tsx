import StyledText from "@/components/styled/StyledText";
import ProdutoService from "@/services/produto_service";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function AddMovimento() {
    const {tipo} = useLocalSearchParams();
    const produtoService = ProdutoService();
    
    return (<View>
        <StyledText>{tipo}</StyledText>
    </View>)    
}