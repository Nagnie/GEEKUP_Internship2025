import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    const getActiveItem = (path) => {
        if (path.startsWith("/users")) return "users";
        if (path.startsWith("/albums")) return "albums";
        return "";
    };

    const activeItem = getActiveItem(location.pathname);

    return (
        <div className="h-screen flex">
            <Sidebar activeItem={activeItem} />
            <div className="flex-1 bg-gray-50 overflow-auto">
                <Header />
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
