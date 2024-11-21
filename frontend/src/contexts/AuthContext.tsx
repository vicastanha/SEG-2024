import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "../@libs/types";
import { AuthService } from "../services/auth-service";

type AuthContextProps = {
    user?: IUser | null;
    setUser: (user: IUser | null) => void;
    factorId: string;
    setFactorId: (factorId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthContextProviderProps = {
    children: ReactNode
}
export function AuthContextProvider(props: AuthContextProviderProps) {
 
    const [user, setUser] = useState<IUser | null>();
    const [factorId, setFactorId] = useState<string>('');

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
        <AuthContext.Provider value={{user, setUser, factorId, setFactorId}}>
            {props. children}
        </AuthContext.Provider>
    )

}