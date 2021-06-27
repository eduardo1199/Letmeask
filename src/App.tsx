import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import {Route, BrowserRouter} from 'react-router-dom';
import {AuthControler} from './contexts/AuthControler';
//meu contexto é um objeto que apresenha nele um usuario do type User e um função
//do tipo signInWithPopup que retorna para void.

function App() {

  return (
    <BrowserRouter>
      <AuthControler>
        <Route path='/' component={Home} exact/>
        <Route path='/newRoom/new' component={NewRoom}/>
      </AuthControler>
    </BrowserRouter>
  );
}

export default App;
