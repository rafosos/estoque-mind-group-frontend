import { User, UserEdit } from "@/classes/user";
import { get, patch } from "./service_base";

export default function UserService(){
    const prefix = "/user";
    
    const editUser = (fieldsToUpdate: UserEdit) => {
        const promise = patch<UserEdit>(prefix + "/", fieldsToUpdate);
        return promise.then(res => res.data);
    }
    
    const getUser = () => {    
        const promise = get<User>(prefix + "/");
        return promise.then(res => res.data);
    }

    return {editUser, getUser}
}
