export class Adaptor {
    path;

    constructor(path) {
        this.path = path;
    }

    async sendRequest(path, data = null) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, data);

            if (!response.ok) {
                console.error(`Server returned an error: ${response.status}`);
                throw new Error('Failed to fetch data');
            }

            return await response.json();
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
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