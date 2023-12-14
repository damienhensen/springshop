import { Adaptor } from "./Adaptor";

export class AuthAdaptor extends Adaptor {
    constructor(resourceUrl) {
        super(resourceUrl);
    }

    async signUp(user) {
        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }

        return await this.sendRequest(this.path + "/sign-up", data);
    }

    async login(user) {
        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }

        return await this.sendRequest(this.path + "/login", data);
    }
}