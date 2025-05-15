import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserTable from "../components/UserTable.jsx";

const UserDetail = () => {
    const { id } = useParams();
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                if (!response.ok) {
                    throw new Error("User not found");
                }
                const userData = await response.json();
                setUsers(userData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);


    return (
        <div className="h-screen flex">

            <div className="flex-1 bg-gray-50">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Users</h1>
                <UserTable users={users} loading={loading} />
            </div>
        </div>
    );
};

export default UserDetail;