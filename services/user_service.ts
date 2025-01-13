import { UserEdit } from "@/classes/user";
import { patch } from "./service_base";

export default function UserService(){
    const prefix = "/user";
    
    const editUser = (fieldsToUpdate: UserEdit) => {
        const promise = patch<UserEdit>(prefix + "/", fieldsToUpdate);
        return promise.then(res => res.data);
    }
}
