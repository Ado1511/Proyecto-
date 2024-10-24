import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const userId = '6559f2dbdedf2db2b52bde42'; // Cambia esto según tu lógica

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('authToken');
    const updatedUserData = {
      name: {
        first: 'business',
        middle: 'man',
        last: 'user',
      },
      phone: '0512345567',
      image: {
        url: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png',
        alt: 'business card image',
      },
      address: {
        state: 'IL',
        country: 'Israel',
        city: 'Arad',
        street: 'Shoham',
        houseNumber: 5,
        zip: 8920435,
      },
    };

    try {
      const response = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, updatedUserData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      console.log("Usuario actualizado:", response.data);
      navigate('/edit-profile'); // Redirige a la página de edición de perfil
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {userData ? (
        <div>
          <p>Nombre: {userData.name.first} {userData.name.middle} {userData.name.last}</p>
          <p>Teléfono: {userData.phone}</p>
          <p>Correo Electrónico: {userData.email}</p>
          <img src={userData.image.url} alt={userData.image.alt} />
          <p>Dirección: {userData.address.street}, {userData.address.city}, {userData.address.state}, {userData.address.country}</p>
          <button onClick={handleUpdateProfile}>Actualizar Perfil</button>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default Profile;
