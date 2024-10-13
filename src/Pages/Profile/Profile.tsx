import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, FloatingLabel, Textarea } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        userType: "",
        aboutMe: "",
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (!user) {
            nav("/signin");
        } else {
            setProfileData({
                name: `${user.name.first} ${user.name.middle} ${user.name.last}`,
                email: user.email,
                userType: user.isBusiness ? "Business" : user.isAdmin ? "Admin" : user.isRegular ? "Regular" : "",
                aboutMe: user.about || "", 
            });
        }
    }, [user, nav]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profileData.name || !profileData.email) {
            toast.error("Name and email are required.");
            return;
        }

        setLoading(true);
        try {
            if (user) {
                await axios.patch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                    profileData
                );
                toast.success("Profile updated successfully!");
                setProfileData({ ...profileData });
            } else {
                toast.error("User not found.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="flex flex-col items-center justify-start gap-10 mb-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
            <h1 className="mb-4 text-2xl font-bold text-center">Profile Page</h1>
            <div className="flex justify-center mt-10">
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 w-96">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">User Profile</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <FloatingLabel
                            type="text"
                            variant="outlined"
                            label="Full Name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="mb-4"
                        />
                        
                        <FloatingLabel
                            type="email"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="mb-4"
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Me</label>
                            <Textarea
                                name="aboutMe"
                                value={profileData.aboutMe}
                                onChange={handleChange}
                                disabled={!isEditing}
                                maxLength={260}
                                placeholder="Tell us about yourself (max 260 characters)"
                                rows={3}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">User Type</label>
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">{profileData.userType}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button 
                                type="button" 
                                onClick={() => setIsEditing(!isEditing)} 
                                className="mr-2"
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </Button>
                            <Button type="submit" disabled={loading || !isEditing}>
                                {loading ? "Updating..." : "Update Profile"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
