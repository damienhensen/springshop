import { Adaptor } from "./Adaptor";

export class ProductAdaptor extends Adaptor {
    constructor(resourceUrl) {
        super(resourceUrl);
    }

    async save(product, imageFile = null) {
        const formData = new FormData();

        for (const key in product) {
            if (Object.hasOwnProperty.call(product, key)) {
                const value = product[key];

                if (value || value === 0) {
                    formData.append(key, value);
                }
            }
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        const data = {
            method: "POST",
            headers: {
                // Include any necessary headers, e.g., 'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        return await this.sendRequest(this.path, data);
    }

    async update(id, product, imageFile = null) {
        const formData = new FormData();

        for (const key in product) {
            if (Object.hasOwnProperty.call(product, key)) {
                const value = product[key];

                if (value || value === 0) {
                    formData.append(key, value);
                }
            }
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        const data = {
            method: "PUT",
            headers: {
                // Include any necessary headers, e.g., 'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        return await this.sendRequest(this.path + "/" + id, data);
    }
}