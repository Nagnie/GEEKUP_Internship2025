import { Mail, Phone, Globe, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useState } from "react";

const UserTable = ({ users, loading }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleShowUser = (userId) => {
        navigate(`/users/${userId}`);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const paginatedUsers = users?.slice(
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
                <p className="text-center text-xl text-gray-600">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Avatar</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Website</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers?.map((user) => {
                    return (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-500">{user.id}</td>
                            <td className="px-6 py-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`}
                                    alt={user.name}
                                    className="h-8 w-8"
                                />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                            <td className="px-6 py-4 text-sm">
                                <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-300 transition-colors duration-200">{user.email}</a>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 ">
                                <p className={"text-blue-500 cursor-pointer hover:text-blue-300"}>{user.phone}</p>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300 transition-colors duration-200">{user.website}</a>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <button
                                    onClick={() => handleShowUser(user.id)}
                                    className="inline-flex cursor-pointer items-center px-3 py-1 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Show
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 p-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={users?.length || 0}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50"]}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default UserTable;
