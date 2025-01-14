export interface User{
    nome: string;
    email: string;
    senha: string;
    qtdProdutos: number;
    somaProdutos: number;
}

export interface UserEdit{
    nome?: string, 
    email?: string, 
    senha?: string
}