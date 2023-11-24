import Layout from "@/components/admin/layout";
import FormSection from "@/components/admin/formSection";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CreateProduct() {
    const [products, setProducts] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchProducts = async () => {
        await fetch('http://127.0.0.1:8080/api/products')
            .then(response => response.json())
            .then(products => {
                setProducts(products);
                setLoading(false);
            })
            .catch(console.error);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Layout>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl uppercase mb-8">Products</h1>
                <Link href={"/admin/products/create"} className="px-3 py-1 bg-blue-100 text-blue-500 rounded border border-blue-500 hover:bg-blue-500 hover:text-white transition-all">New product</Link>
            </div>

            {(isLoading) ? <p>Loading...</p> : (
                <div className="flex flex-col gap-8">
                    <FormSection>
                        {products && products.success ? (
                            <div className="flex-1 flex flex-col">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-2">
                                        <h3>SKU</h3>
                                    </div>
                                    <div className="col-span-2">
                                        <h3>Title</h3>
                                    </div>
                                </div>
                                {products.data.map(product => {
                                    return (
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-2">
                                                <h3>{product.sku}</h3>
                                            </div>
                                            <div className="col-span-2">
                                                <h3>{product.title}</h3>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p>{products ? products.message : "No products"}</p>
                        )}
                    </FormSection>

                    <FormSection>
                        <div className="flex flex-1 justify-end items-center gap-4">
                            <button className="px-3 py-1 bg-green-100 text-green-500 rounded border border-green-500 hover:bg-green-500 hover:text-white transition-all">Save</button>
                            <button className="px-3 py-1 bg-red-100 text-red-500 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                        </div>
                    </FormSection>
                </div>
            )}
        </Layout>
    );
}