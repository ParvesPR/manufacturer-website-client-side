import React from 'react';
import toast from 'react-hot-toast';

const DeleteProduct = ({ manageProduct, setManageProduct, refetch }) => {
    const { name, _id, } = manageProduct;

    const handleDelete = () => {
        fetch(`https://salty-tor-00917.herokuapp.com/manageproducts/${_id}`, {

            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Product ${name} deleted successfully`);
                    setManageProduct(null);
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="delete-product" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are You sure you want to delete <span className='text-green-700'>{name} ?</span></h3>
                    <p className="py-4">This Product can not be restore!</p>
                    <div className="modal-action">
                        <button onClick={() => handleDelete(_id)} className='btn btn-md btn-error text-white'>Delete</button>
                        <label htmlFor="delete-product" className="btn btn-md">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;