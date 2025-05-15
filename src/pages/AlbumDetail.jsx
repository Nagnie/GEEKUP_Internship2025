import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {User, ArrowLeft, Eye, Image} from "lucide-react";
import { Image as AntImage } from 'antd';

const AlbumDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch album details
                const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
                const albumData = await albumResponse.json();
                setAlbum(albumData);

                // Fetch user details
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${albumData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch photos in album
                const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
                const photosData = await photosResponse.json();
                setPhotos(photosData.slice(0, 10));
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
            <div className="flex justify-between flex-col py-20">
                <svg className="animate-spin mx-auto my-3 h-16 w-16 text-cyan-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-center text-gray-600">Loading album details...</p>
            </div>
        );
    }

    if (!album) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-800 text-xl">Album not found</p>
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

    const handleShowAlbumTable = () => {
        navigate(`/albums`);
    }

    const handleShowUser = (id) => {
        navigate(`/users/${id}`);
    }

    return (
        <div className="container">
            {/* Breadcrumb */}
            <div className="flex items-center text-gray-500 mb-2">
                <span className="flex items-center cursor-pointer" onClick={() => handleShowAlbumTable()}>
                    <Image/>
                    <p className={"ms-1 px-1 rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-200"}>Album</p>
                </span>
                <span className="mx-1">/</span>
                <span className="font-bold text-black mx-1">Show</span>
            </div>
            {/* Back Button */}
            <button
                onClick={handleGoBack}
                className="mb-2 inline-flex items-center font-bold text-2xl py-2 rounded-md"
            >
                <ArrowLeft className="h-10 w-10 me-2 p-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200" />
                Show Album
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
                                    <h2 className="text-xl font-bold cursor-pointer text-blue-500 hover:text-blue-400 transition-colors duration-200"
                                        onClick={() => handleShowUser(user.id)}>{user.name}</h2>
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

                    {/* Photos Section */}
                    <div className="mb-2 px-6">
                        <h2 className="text-2xl font-bold text-gray-800">{album?.title || "Album Title"}</h2>
                    </div>

                    <div className="mt-8">
                        {photos.length === 0 ? (
                            <p className="text-gray-500">No photos found for this album.</p>
                        ) : (
                            <div className="my-8 px-6">
                                <AntImage.PreviewGroup>
                                    <div className="flex gap-4 flex-wrap">
                                        {photos.map((photo) => (
                                            <div key={photo.id} className="rounded-lg w-32">
                                                <AntImage
                                                    src={photo.thumbnailUrl}
                                                    alt={photo.title}
                                                    width="100%"
                                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </AntImage.PreviewGroup>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AlbumDetail;