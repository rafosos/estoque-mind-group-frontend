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