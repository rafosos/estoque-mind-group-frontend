import { deletar, get, patch, post } from "./service_base";
import { Produto } from "@/classes/produto";

export default function ProdutoService(){
    const prefix = "/produto";
    
    const adicionarProduto = (nome: string, descricao?: string, valor: number = 0, quantidade: number = 0, imagem?: string) => {
        const formData = new FormData();

        formData.append("nome", nome);
        if(descricao)
            formData.append("descricao", descricao);
    
        formData.append("valor", valor.toString());
        formData.append("quantidade", quantidade.toString());

        if(imagem){
            const localUri = imagem;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            formData.append("image", {uri: localUri, name: filename, type});
        }

        const promise = post<Produto>(prefix + "/", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return promise.then(res => res.data);
    }

    const editarProduto = (id: number, fieldsToUpdate: Produto) => {
        const promise = patch<Produto>(prefix + "/", fieldsToUpdate);
        return promise.then(res => res.data);
    }

    const deletarProduto = (id: number) => {
        const promise = deletar<{id:number}>(`${prefix}/${id}`);
        return promise.then(res => res.data);
    }

    const getAll = () => {
        const promise = get<Produto[]>(prefix + "/");
        return promise.then(res => res.data);
    }

    return {adicionarProduto, editarProduto, deletarProduto, getAll}
}