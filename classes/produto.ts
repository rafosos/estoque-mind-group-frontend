export class Produto{
    nome: string | undefined;
    descricao: string| undefined;
    imagem: BufferObject | undefined;
    valor: number| undefined;
    quantidade: number| undefined;
}

export interface BufferObject {
    type: 'Buffer';
    data: number[];
}  