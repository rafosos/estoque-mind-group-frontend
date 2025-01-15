export class Produto{
    id: number | undefined;
    nome: string | undefined;
    descricao: string| undefined;
    imagem: BufferObject | undefined;
    valor: number| undefined;
    quantidade: number| undefined;
}

export class ProdutoModel{
    nome: string | undefined;
    descricao: string| undefined;
    imagem: string | null | undefined;
    valor: number| undefined;
    quantidade: number| undefined;
}

export interface BufferObject {
    type: 'Buffer';
    data: number[];
}  

export class ProdutoResultado {
    constructor(id: number, nome: string, quantidade: number, valor: number){
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    id: number;
    nome: string;
    quantidade: number;
    movimentacao: number = 0;
    valor: number;
    imagem: BufferObject | undefined;
}