import {createContext, ReactNode} from 'react';
import { useState,useEffect } from 'react';
import {auth, firebase} from '../services/Firebase';


type User = {
 uid:string;
 displayName:string;
 photoURL:string;
}

type AuthContext = {
 user: User | undefined;
 signInWithPopup: () => Promise<void>; //função que retorna uma promiss
}

type AuthControlerProps = {
  children: ReactNode
} // caso seja passado compoenete atraves das props, entãoo tipo dele é ReactNode

export const AuthContext = createContext({} as AuthContext);

export function AuthControler(props:AuthControlerProps){
 const [user, setUser] = useState<User>();

 async function signInWithPopup(){
   const provider = new firebase.auth.GoogleAuthProvider();
   const response =  await auth.signInWithPopup(provider);
   if(response.user){
     const {displayName, photoURL, uid} = response.user;

     if(!displayName || !photoURL){
       throw new Error("User not found in Firebase");
     }
     setUser({
       uid:uid,
       displayName:displayName,
       photoURL:photoURL
     })
   }else{
     throw new Error("Invalid User");
   }
 }// fazer login do usuario
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(User => {
      if(User){
        const {displayName, photoURL, uid} = User;
        if(!displayName || !photoURL){
            throw new Error("User not found in Firebase");
        }
        setUser({
            uid:uid,
            displayName:displayName,
            photoURL:photoURL
        });
      }else{
        throw new Error("Invalid User");
      }
    });
    return () => {
      unsubscribe();
    }
  },[]); //verificar se o usuarioja estava logado na aplicação

  return(
    <AuthContext.Provider value={{user, signInWithPopup}}>
      {props.children}
    </AuthContext.Provider>
  ); //exportar o authContext para todos os componenetes no react, então cada componente terá verificação de login
}