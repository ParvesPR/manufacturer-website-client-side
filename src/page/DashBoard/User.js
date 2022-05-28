import React from 'react';
import toast from 'react-hot-toast';

const User = ({ user, refetch }) => {
    const { email, role } = user;
    const handleMakeAdmin = () => {
        fetch(`https://salty-tor-00917.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make an admin')
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Successfully made an admin')
                }
            })
    }

    return (
        <tr>
            <td>{email}</td>
            <td>
                {role !== 'admin' && <button onClick={handleMakeAdmin} className="btn btn-xs">Make Admin</button>}
            </td>
        </tr >
    );
};

export default User;