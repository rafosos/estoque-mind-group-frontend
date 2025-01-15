import { colors } from "@/constants/Colors";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

interface Props{
    loading: boolean
}

export default function OverflowLoading({loading}: Props){
    return (
        <Modal visible={loading} transparent>
            <View style={styles.overflow}>
                <ActivityIndicator size={'large'} color={colors.cinza.claro}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overflow:{
        zIndex: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.preto.fade[5]
    },
});