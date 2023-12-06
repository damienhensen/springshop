import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { connect } from "react-redux";
import { toast } from "react-toastify";

import { hideProductSavedToast, hideProductEditedToast } from "@/redux/admin/actions";

import { ProductAdaptor } from "@/services/ProductAdaptor";


import Layout from "@/components/admin/layout";
import FormSection from "@/components/admin/formSection";

import PlaceholderImage from "@/assets/image/placeholder.png";

const mapStateToProps = (state) => ({
    savedProductToastVisible: state.admin.savedProductToastVisible,
    editedProductToastVisible: state.admin.editedProductToastVisible,
});

const mapDispatchToProps = {
    hideProductSavedToast,
    hideProductEditedToast,
}

const ListProducts = ({ savedProductToastVisible, hideProductSavedToast, editedProductToastVisible, hideProductEditedToast }) => {
    const productAdaptor = new ProductAdaptor("/products");

    const [products, setProducts] = useState(null);
    const [selected, setSelected] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchProducts = async () => {
        await productAdaptor.findAll()
            .then(products => {
                setProducts(products);
                setLoading(false);
            })
            .catch(console.error);
    }

    const selectProduct = (evt) => {
        const { value: product, checked } = evt.target;
        let newSelected = [...selected, product];
        if (!checked) newSelected = newSelected.filter(p => p != product);
        setSelected(newSelected);
    }

    const deleteProduct = async (id) => {
        setLoading(true);

        await productAdaptor.delete(id)
            .then(products => {
                setProducts(products);
                setLoading(false);
                toast.success("Product deleted!");
            })
            .catch(console.error);
    }

    const deleteSelection = async () => {
        alert("Not yet created")
        // setLoading(true);

        // await productAdaptor.multiDelete(selected)
        //     .then(products => {
        //         setProducts(products);
        //         setLoading(false);
        //         toast.success("Products deleted!");
        //     })
        //     .catch(console.error);
    }

    useEffect(() => {
        fetchProducts();

        if (savedProductToastVisible) {
            toast.success("Product saved!");
            hideProductSavedToast();
        }

        if (editedProductToastVisible) {
            toast.success("Product edited!");
            hideProductEditedToast();
        }
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
                        {products && products.success && products.data ? (
                            <div className="flex-1 flex flex-col">
                                <div className="grid grid-cols-12 font-semibold">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-4">
                                        <h3>Image</h3>
                                    </div>
                                    <div className="col-span-1">
                                        <h3>SKU</h3>
                                    </div>
                                    <div className="col-span-2">
                                        <h3>Title</h3>
                                    </div>
                                    <div className="col-span-1">
                                        <h3>Price</h3>
                                    </div>
                                    <div className="col-span-1">
                                        <h3>Sale</h3>
                                    </div>
                                </div>
                                {products.data.map(product => {
                                    return (
                                        <div className="grid grid-cols-12 items-center py-2" key={product.id}>
                                            <div className="col-span-1 mx-auto">
                                                <input type="checkbox" value={product.id} onChange={selectProduct} />
                                            </div>
                                            <div className="col-span-4">
                                                <Image src={product.image ?? PlaceholderImage.src} alt={product.title} width={100} height={100} />
                                            </div>
                                            <div className="col-span-1">
                                                <h3>{product.sku}</h3>
                                            </div>
                                            <div className="col-span-2">
                                                <h3>{product.title}</h3>
                                            </div>
                                            <div className="col-span-1">
                                                <h3>{product.price}</h3>
                                            </div>
                                            <div className="col-span-1">
                                                <h3>{product.salePrice}</h3>
                                            </div>
                                            <div className="col-span-2 flex items-center justify-end gap-2">
                                                <Link href={"/admin/products/" + product.id + "/edit"} className="px-3 py-1 bg-blue-100 text-blue-500 rounded border border-blue-500 hover:bg-blue-500 hover:text-white transition-all">Edit</Link>
                                                <button onClick={() => deleteProduct(product.id)} className="px-3 py-1 bg-red-100 text-red-500 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p>No products</p>
                        )}
                    </FormSection>

                    {products && products.success && products.data ? (
                        <FormSection>
                            <div className="flex flex-1 justify-end items-center gap-4">
                                <button disabled={!selected.length} onClick={deleteSelection} className="px-3 py-1 bg-red-100 text-red-500 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all disabled:bg-slate-300 disabled:border-slate-500 disabled:text-slate-500">Delete</button>
                            </div>
                        </FormSection>
                    ) : (<></>)}
                </div>
            )}
        </Layout>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts)