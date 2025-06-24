import { useEffect, useState } from "react";
import { getAuthToken, getAuthUser } from "../../utils/authStorage";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getAuthToken();
        const storedUser = getAuthUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }

        setLoading(false);
    }, []);

    const isAuthenticated = !!token && !!user;

    return { user, token, isAuthenticated, loading };
};