export interface UserData {
    email: string;
    fullName: string;
    gender: string;
    mobile: string;
    password: string;
}

const useAuth = () => {
    const login = (email: string, password: string): boolean => {
        const storedUserData: UserData[] = JSON.parse(localStorage.getItem("userData") || "[]");

        if (storedUserData && storedUserData.length > 0) {
            const userFound = storedUserData.some((data) => {
                return data.email === email && data.password === password;
            });

            if (userFound) {
                localStorage.setItem("isAuthenticated", "true");
                return true;
            }
        }
        return false;
    };

    return { login };
};

export default useAuth;
