import { IFullname } from "./fullname.model.js";

export interface IContact {
    fullname: IFullname
    email: string
}

export class IContact {
    email: string
    fullname: IFullname
    constructor() {
        this.email = ""
        this.fullname = new IFullname()
    }
}