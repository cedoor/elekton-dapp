import React from 'react';

type AuthContextType = {
    signIn: () => void;
    signUp: () => void;
    signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
    signIn: () => {},
    signUp: () => {},
    signOut: () => {}
});