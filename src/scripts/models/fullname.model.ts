export interface IFullname {
    firstname: string,
    lastname: string
}

export class IFullname {
    firstname: string
    lastname: string
    constructor() {
        this.firstname = ""
        this.lastname = ""
    }
}