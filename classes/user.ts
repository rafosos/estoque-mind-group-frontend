export interface User{
    nome: string;
    email: string;
    senha: string;
}

export interface UserEdit{
    nome?: string, 
    email?: string, 
    senha?: string
}