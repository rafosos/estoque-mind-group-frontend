import { User } from "@/classes/user";
import { post } from "./service_base";

export default function AuthService(){
    const prefix = "/auth";
    
    const login = async (email: string, senha: string) => {
        const promise = post<{nome: string, token: string}>(prefix + "/login", {email, senha});
        return promise.then(res => res.data);
    }

    const cadastro = async (user: User) => {
        const promise = post<User>(prefix + "/cadastro", user);
        return promise.then(res => res.data);
    }

    return {login, cadastro}
}
