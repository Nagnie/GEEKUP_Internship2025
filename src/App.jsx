// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/albums" replace />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/albums/:id" element={<AlbumDetail />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}
