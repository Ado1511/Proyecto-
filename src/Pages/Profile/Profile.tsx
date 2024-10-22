import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        userType: "",
        aboutMe: "",
        city: "",
        phone: "",
    });
    const nav = useNavigate();

    useEffect(() => {
        if (!user) {
            nav("/signin", { replace: true });
        } else {
            setProfileData({
                name: `${user.name.first} ${user.name.middle || ""} ${user.name.last}`.trim(),
                email: user.email,
                userType: user.isBusiness ? "Business" : user.isAdmin ? "Admin" : user.isRegular ? "Regular" : "",
                aboutMe: user.about || "",
                city: user.city || "",
                phone: user.phone || "",
            });
        }
    }, [user, nav]);

    const handleEditProfile = () => {
        nav('/edit-profile'); // Redirigir a la página de edición de perfil
    };

    return (
        <div className="flex flex-col items-center justify-start gap-10 m-auto" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Profile Page</h1>
            <div className="flex justify-center mt-10 mb-5">
                <Card className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-96">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">User Profile</h2>
                    <div>
                        <p className="mb-4"><strong>Full Name:</strong> {profileData.name}</p>
                        <p className="mb-4"><strong>Email:</strong> {profileData.email}</p>
                        <p className="mb-4"><strong>Phone:</strong> {profileData.phone}</p>
                        <p className="mb-4"><strong>City:</strong> {profileData.city}</p>
                        <p className="mb-4"><strong>About Me:</strong> {profileData.aboutMe}</p>
                        <p className="mb-4"><strong>User Type:</strong> {profileData.userType}</p>
                    </div>
                    <button 
                        onClick={handleEditProfile}
                        className="w-full p-2 mt-4 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
