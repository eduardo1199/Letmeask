import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthControler';

export default function useAuth(){
  const value = useContext(AuthContext);

  return value;
}