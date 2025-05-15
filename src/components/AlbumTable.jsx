import { Eye } from "lucide-react";
import {Pagination} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AlbumTable = ({ albums, users, loading }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const getUserById = (userId) => {
        return users.find(user => user.id === userId) || {};
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const paginatedAlbums = albums.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (loading) {
        return (
            <div className="flex justify-between flex-col py-25">
                <svg className="animate-spin mx-auto my-6 h-16 w-16 text-cyan-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-center text-xl text-gray-600">Loading albums...</p>
            </div>
        );
    }

    const handleShowAlbum = (id) => {
        navigate(`/albums/${id}`);
    }

    const handleShowUser = (userId) => {
        navigate(`/users/${userId}`);
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 text-left font-bold uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold uppercase tracking-wider">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold uppercase tracking-wider">
                        User
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-bold uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAlbums.map((album) => {
                    const user = getUserById(album.userId);

                    return (
                        <tr key={album.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap ">
                                {album.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                {album.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center" onClick={() => handleShowUser(user.id)}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`}
                                        alt={user.name}
                                        className="h-8 w-8 cursor-pointer"
                                    />
                                    <div className="ml-4 text-blue-500 hover:text-blue-300 cursor-pointer transition-colors duration-200">
                                        {user.name}
                                    </div>
                                </div>
                            </td>
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
                    );
                })}
                </tbody>
            </table>
            <div className="mt-6 p-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={albums.length}
                    showSizeChanger
                    onChange={handlePageChange}
                    pageSizeOptions={["10", "20", "50", "100"]}
                />
            </div>
        </div>
    );
};

export default AlbumTable;