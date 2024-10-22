import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditUserSchema from '../../validations/EditUserSchema'; // Asegúrate de que la ruta sea correcta

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: {
            first: '',
            middle: '',
            last: ''
        },
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: TRootState) => state.UserSlice.user); // Asegúrate de obtener el usuario correctamente
    const nav = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/profile', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setUserData(res.data);
            } catch (error) {
                toast.error('Error fetching user data');
                nav('/profile'); // Redirigir si hay un error
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [nav]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Manejar el cambio para el objeto name
        if (name.includes('name')) {
            const nameKey = name.split('.')[1]; // 'first', 'middle' o 'last'
            setUserData(prevState => ({
                ...prevState,
                name: { ...prevState.name, [nameKey]: value }
            }));
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar los datos antes de enviar
        const { error } = EditUserSchema.validate(userData);
        if (error) {
            toast.error(error.details[0].message); // Mostrar error de validación
            return;
        }

        try {
            if (!user || !user._id) {
                toast.error('User not found');
                return;
            }
            const res = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`, userData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status === 200) {
                toast.success('Profile updated successfully');
                nav('/profile'); // Redirige al perfil después de actualizar
            }
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="w-3/5 p-5 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="first" className="block text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        name="name.first"
                        value={userData.name.first}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="middle" className="block text-sm font-medium">Middle Name</label>
                    <input
                        type="text"
                        name="name.middle"
                        value={userData.name.middle}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="last" className="block text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        name="name.last"
                        value={userData.name.last}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
