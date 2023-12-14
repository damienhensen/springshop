export class Adaptor {
    path;

    constructor(path) {
        this.path = path;
    }

    async sendRequest(path, data = null) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, data);

        let responseBody;

        try {
            // Attempt to parse the response body as JSON
            responseBody = await response.json();
        } catch (jsonError) {
            // If parsing as JSON fails, fallback to reading response as text
            responseBody = await response.text();
        }

        return responseBody;
    }

    async findAll() {
        return await this.sendRequest(this.path);
    }

    async findOne(id) {
        return await this.sendRequest(this.path + "/" + id);
    }

    async save(object) {
        const data = {
            method: "POST",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return await this.sendRequest(this.path, data);
    }

    async update(id, object) {
        const data = {
            method: "PUT",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return await this.sendRequest(this.path + "/" + id, data);
    }

    async delete(id) {
        const data = {
            method: "DELETE",
        }

        return await this.sendRequest(this.path + "/" + id, data);
    }
}