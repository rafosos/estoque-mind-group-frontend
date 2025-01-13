import React from "react";
import { useStorageState } from "@/hooks/useStorageState";

const AuthContext = React.createContext<{
    signIn: (token:string, nome: string) => void;
    signOut: () => void;
    session?: string | null;
    nome?: string | null;
    isLoading: boolean;
}>({
    signIn: (token: string, nome: string) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = React.useContext(AuthContext);
    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [[isLoadingNome, nome], setNome] = useStorageState("nome");
    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string, nome:string) => {
                    setSession(token);
                    setNome(nome);
                },
                signOut: () => {
                    setSession(null);
                    setNome(null);
                },
                nome,
                session,
                isLoading: isLoading || isLoadingNome,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
