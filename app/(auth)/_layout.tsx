import { Redirect, Stack } from 'expo-router';
import { useSession } from '../ctx';
import { colors } from '@/constants/Colors';
import StyledText from '@/components/styled/StyledText';

export default function AppLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <StyledText>Carregando...</StyledText>;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack>
            <Stack.Screen 
                name="(tabs)" 
                options={{ 
                    headerShown: false, 
                    contentStyle: {
                        "backgroundColor": colors.cinza.background
                        }
                }} 
            />
        </Stack>
    )
}