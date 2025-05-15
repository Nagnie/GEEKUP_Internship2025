import { Image, User } from "lucide-react"
import { Link } from 'react-router-dom';

const Sidebar = ({ activeItem }) => {
    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4">
            <Link to="/">
                <div className="flex items-center font-bold mb-6 px-4">
                    <div className="text-black text-2xl">GEEK<sup className="text-sm text-emerald-700 px-1">UP</sup></div>
                </div>
            </Link>
            <div className="space-y-2">
                <Link to="/albums">
                    <div className={`px-2 py-3 my-2 rounded-md flex items-center ${activeItem === 'albums' ? 'bg-blue-50 text-blue-500 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}>
                        <Image className="mx-2"/>
                        Albums
                    </div>
                </Link>
                <Link to="/users">
                    <div className={`px-2 py-3 my-2 rounded-md flex items-center ${activeItem === 'users' ? 'bg-blue-50 text-blue-500 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}>
                        <User className={"mx-2"} />
                        Users
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;