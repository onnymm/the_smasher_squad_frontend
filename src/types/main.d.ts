type AuthenticationHeaders = {
    headers: {
        accept: string;
        "Content-Type"?: string;
        "Authorization"?: string;
    }
};

type CurrentUserData = {
    id: number | undefined;
    user: string;
    name: string;
    avatar: string;
    "create_date": string;
    "write_date": string;
}

type DarkModeElements = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

type TokenElements = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}