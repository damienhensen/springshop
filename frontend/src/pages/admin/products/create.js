import Layout from "@/components/admin/layout";
import FormSection from "@/components/admin/formSection";
import { useRef, useState } from "react";
import PlaceholderImage from "@/assets/image/placeholder.png";

export default function CreateProduct() {
    const [imageFile, setImageFile] = useState(null);
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        status: "HIDDEN",
        publishAt: null,
        weight: 0,
        width: 0,
        length: 0,
        height: 0,
        salePrice: 0,
        saleStart: null,
        saleEnd: null,
    });

    const image = useRef(null);
    const imageInput = useRef(null);

    const handleImageChange = () => {
        const [file] = imageInput.current.files;

        if (file) {
            image.current.src = URL.createObjectURL(file);
            setImageFile(file);
        } else {
            image.current.src = PlaceholderImage.src;
            setImageFile(null);
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const saveProduct = async () => {
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

        await fetch("http://localhost:8080/api/products", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(product => {
                console.log(product)
            })
            .catch(console.error);
    }

    return (
        <Layout>
            <h1 className="font-bold text-2xl uppercase mb-8">Create product</h1>

            <div className="flex flex-col gap-8">
                <FormSection title={"Product info"}>
                    <label className="cursor-pointer">
                        <input ref={imageInput} type="file" className="absolute w-0 h-0" onChange={handleImageChange} />
                        <img ref={image} src={PlaceholderImage.src} alt="Image" className="w-64 h-64 appearance-none shadow rounded-md object-contain" />
                    </label>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="uppercase cursor-pointer">Product Title</label>
                            <input type="text" id="title" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="description" className="uppercase cursor-pointer">Product Description</label>
                            <textarea id="description" className="bg-slate-100 rounded-md outline-none p-3 py-1 flex-1" onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                </FormSection>

                <FormSection title={"Product status"}>
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="price" className="uppercase cursor-pointer">Product Price</label>
                            <input type="text" id="price" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="stock" className="uppercase cursor-pointer">Stock</label>
                            <input type="text" id="stock" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="status" className="uppercase cursor-pointer">Status</label>
                                <select name="" id="status" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange}>
                                    <option value="HIDDEN">Hidden</option>
                                    <option value="PUBLIC">Public</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="publishAt" className="uppercase cursor-pointer">Publish at</label>
                                <input type="date" id="publishAt" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                </FormSection>

                <FormSection title={"Dimensions"}>
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="weight" className="uppercase cursor-pointer">Weight</label>
                            <input type="text" id="weight" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="width" className="uppercase cursor-pointer">Width</label>
                                <input type="text" id="width" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="length" className="uppercase cursor-pointer">Length</label>
                                <input type="text" id="length" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="height" className="uppercase cursor-pointer">Height</label>
                                <input type="text" id="height" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                </FormSection>

                <FormSection title={"Sale information"}>
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="salePrice" className="uppercase cursor-pointer">Sale price</label>
                            <input type="text" id="salePrice" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="saleStart" className="uppercase cursor-pointer">Sale start</label>
                                <input type="date" id="saleStart" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="saleEnd" className="uppercase cursor-pointer">Sale end</label>
                                <input type="date" id="saleEnd" className="bg-slate-100 rounded-md outline-none p-3 py-1" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                </FormSection>

                <FormSection>
                    <div className="flex flex-1 justify-end items-center gap-4">
                        <button onClick={saveProduct} className="px-3 py-1 bg-green-100 text-green-500 rounded border border-green-500 hover:bg-green-500 hover:text-white transition-all">Save</button>
                        <button className="px-3 py-1 bg-red-100 text-red-500 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                    </div>
                </FormSection>
            </div>
        </Layout>
    );
}