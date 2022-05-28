import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey = 'e2d45fddfbfdb6662a3ef75d64ca3f0b';

    const onSubmit = async data => {
        console.log('data', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log('imgbb', result)
                if (result.success) {
                    const image = result.data.url;
                    const product = {
                        name: data.productname,
                        price: data.price,
                        available: data.available,
                        minimum: data.minimum,
                        image: image
                    }
                    // send to your database 
                    fetch('https://salty-tor-00917.herokuapp.com/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Product added successfully');
                                reset();
                            }
                            else {
                                toast.error('Failed to add a product')
                            }
                        })
                }
            })
    };
    return (
        <div>
            <h2 className='font-bold text-white my-5 text-2xl text-center'>Add a new Product</h2>

            <div className='flex justify-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* PRODUCT NAME FIELD */}
                    <div className="form-control w-full max-w-xs">
                       
                        <input
                            type="name"
                            placeholder="Product Name"
                            className="input input-bordered w-full input-md max-w-xs"
                            {...register("productname", {
                                required: {
                                    value: true,
                                    message: 'Product Name is required'
                                },
                            })}
                        />
                        <label className="label">
                            {errors.productname?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.productname.message}</span>}
                            {errors.productname?.type === 'pattern' && <span className="label-text-alt font-semibold text-warning">{errors.productname.message}</span>}
                        </label>
                    </div>

                    {/* EMAIL FIELD */}
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-md input-bordered w-full max-w-xs"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'Price is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.price.message}</span>}
                        </label>
                    </div>

                    {/*AVAILABLE QUANTITY FIELD */}
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="number"
                            placeholder="Product Quantity"
                            className="input input-md input-bordered w-full max-w-xs"
                            {...register("available", {
                                required: {
                                    value: true,
                                    message: 'Quantity is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.available?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.available.message}</span>}
                        </label>
                    </div>

                    {/*MINIMUM ORDER FIELD */}
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="number"
                            placeholder="Minimum Order"
                            className="input input-md input-bordered w-full max-w-xs"
                            {...register("minimum", {
                                required: {
                                    value: true,
                                    message: 'Minimum Order is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.minimum?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.minimum.message}</span>}
                        </label>
                    </div>

                    {/*PRODUCT DESCRIPTION FIELD */}
                    <div className="form-control w-full max-w-xs">
                        <textarea
                            type="text"
                            placeholder="Add a description"
                            className="textarea textarea-bordered w-full max-w-xs"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Product description is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.description.message}</span>}
                        </label>
                    </div>

                    {/* IMAGE UPLOAD FIELD */}
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="file"
                            className="input input-md input-bordered w-full max-w-xs"
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is required'
                                },
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt font-semibold text-warning">{errors.image.message}</span>}
                        </label>
                        <input className='btn w-full mt-3' value="Add Product" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;