import { useState, useEffect } from "react";
import AlbumTable from "../components/AlbumTable.jsx";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [albumsResponse, usersResponse] = await Promise.all([
                    fetch("https://jsonplaceholder.typicode.com/albums"),
                    fetch("https://jsonplaceholder.typicode.com/users")
                ]);

                const albumsData = await albumsResponse.json();
                const usersData = await usersResponse.json();

                setAlbums(albumsData.slice(0, 100)); // Up to 100 for demo
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen flex">

            <div className="flex-1 bg-gray-50">
                <AlbumTable albums={albums} users={users} loading={loading} />
            </div>
        </div>
    );
};

export default Albums;
