import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {User, ArrowLeft, Eye} from "lucide-react";

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch user data
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch albums for this user
                const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
                const albumsData = await albumsResponse.json();
                setAlbums(albumsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex justify-between flex-col py-25">
                <svg className="animate-spin mx-auto my-6 h-16 w-16 text-cyan-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-center text-xl text-gray-600">Loading user details...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-800 text-xl">User not found</p>
                <button
                    onClick={handleGoBack}
                    className="mb-2 inline-flex items-center font-bold text-2xl py-2 rounded-md"
                >
                    <ArrowLeft className="h-10 w-10 me-2 p-1 hover:bg-gray-100 cursor-pointer" />
                    Go Back
                </button>
            </div>
        );
    }

    const handleShowUserTable = () => {
        navigate(`/users`);
    };

    const handleShowAlbum = (id) => {
        navigate(`/albums/${id}`);
    }

    return (
        <div className="container">
            {/* Breadcrumb */}
            <div className="flex items-center text-gray-500 mb-2">
                <span className="flex items-center cursor-pointer" onClick={() => handleShowUserTable()}>
                    <User />
                    <p className={"ms-1 px-1 rounded-md hover:bg-gray-200 hover:text-black"}>Users</p>
                </span>
                <span className="mx-1">/</span>
                <span className="font-bold text-black mx-1">Show</span>
            </div>
            {/* Back Button */}
            <button
                onClick={handleGoBack}
                className="mb-2 inline-flex items-center font-bold text-2xl py-2 rounded-md"
            >
                <ArrowLeft className="h-10 w-10 me-2 p-1 hover:bg-gray-100 cursor-pointer" />
                Show Users
            </button>
            <div className="mb-2 bg-white p-6 rounded-xl">
                <div className="border border-gray-200 rounded-md">
                    {/* User Details Card */}
                    <div className="mb-8">
                        <div className="mx-6 py-6 border-b border-gray-200">
                            <div className="flex items-center">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128&rounded=true`}
                                    alt={user.name}
                                    className="h-12 w-12 border-4 border-white rounded-full"
                                />
                                <div className="ms-4">
                                    <h2 className="text-xl font-bold">{user.name}</h2>
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="text-blue-500 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {user.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Albums Section */}
                    <div className="mb-4 px-6">
                        <h2 className="text-xl font-bold text-gray-800">Albums</h2>
                    </div>

                    {/* Albums Table */}
                    <div className="px-6 bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-bold uppercase">ID</th>
                                <th className="px-6 py-3 text-left font-bold uppercase">Title</th>
                                <th className="px-6 py-3 text-left font-bold uppercase">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {albums.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="px-6 py-4 text-center">
                                        No albums found for this user
                                    </td>
                                </tr>
                            ) : (
                                albums.map((album) => (
                                    <tr key={album.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{album.id}</td>
                                        <td className="px-6 py-4">{album.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                className="cursor-pointer inline-flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                                                onClick={() => handleShowAlbum(album.id)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Show
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;