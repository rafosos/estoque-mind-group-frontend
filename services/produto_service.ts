import { deletar, get, patch, post } from "./service_base";
import { Produto } from "@/classes/produto";

export default function ProdutoService(){
    const prefix = "/produto";
    
    const adicionarProduto = (produto: Produto) => {
        const promise = post<Produto>(prefix + "/", produto);
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