import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "../@libs/types";
import { AuthService } from './../services/auth-service';
type AuthContextProps = {
    user: IUser | undefined;
    setUser: (user: IUser) => void;
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
type AuthContextProviderProps = {
    children: ReactNode
}
export function AuthContextProvider(props: AuthContextProviderProps) {
 
    const [user, setUser] = useState<IUser>();
    useEffect(()=>{
        
        AuthService.getUser()
            .then(result => {
                if (result) {
                    setUser({
                        uid: result.id,
                        email: result.email || '',
                        name: result.user_metadata?.name
                    });
                }
            })
            .catch(error => {
                console.log('PAU: ', error);
            })        
        
    }, [user]);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props. children}
        </AuthContext.Provider>
    )
}