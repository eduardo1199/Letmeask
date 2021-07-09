import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {AuthControler} from './contexts/AuthControler';

//meu contexto é um objeto que apresenha nele um usuario do type User e um função
//do tipo signInWithPopup que retorna para void.

function App() {

  return (
    <BrowserRouter>
      <AuthControler>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/room/new' component={NewRoom}/>
          <Route path='/room/:id' component={Room}/>
        </Switch>
      </AuthControler>
    </BrowserRouter>
  );
}

export default App;
