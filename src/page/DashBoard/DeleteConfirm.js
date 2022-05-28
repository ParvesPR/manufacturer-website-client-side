import React from 'react';
import toast from 'react-hot-toast';

const DeleteConfirm = ({ cancel, setCancel, refetch }) => {
    console.log(cancel)
    const { productName, _id, email } = cancel;

    const handleDelete = () => {
        fetch(`https://salty-tor-00917.herokuapp.com/orders/${_id}`, {

            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Order ${productName} canceled successfully`);
                    setCancel(null);
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="delete-confirm" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are You sure you want to cancel <span className='text-green-700'>{productName}</span>!</h3>
                    <p className="py-4">This Product can not be restore!</p>
                    <div className="modal-action">
                        <button onClick={() => handleDelete(email)} className='btn btn-md btn-error text-white'>Cancel Order</button>
                        <label htmlFor="delete-confirm" className="btn btn-md">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirm;