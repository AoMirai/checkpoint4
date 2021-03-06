import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './container/Connection/PrivateRoute'
import Navbar from './container/Navigation/Navbar';
import Home from './container/Visitor/Home';
import Admin from './container/Admin/Admin';
import AdminArtistList from './container/Admin/AdminArtistList';
import AdminShowList from './container/Admin/AdminShowList';
import SignIn from './container/Connection/SignIn'
import SignOut from './container/Connection/SignOut'
import AdminActList from './container/Admin/AdminActList';
import {NotificationContainer } from 'react-notifications';
import './App.scss'
import Acts from './container/Visitor/Acts';
import Shows from './container/Visitor/Shows';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute exact path="/admin" component={Admin}/>
        <PrivateRoute path="/admin/artist" component={AdminArtistList}/>
        <PrivateRoute path="/admin/act" component={AdminActList}/>
        <PrivateRoute path="/admin/show" component={AdminShowList}/>
        <Route path="/admin/signout" component={SignOut}/>
        <Route path="/act" component={Acts}/>
        <Route path="/box-office" component={Shows}/>
      </Switch>
      <NotificationContainer/>
    </div>
  );
}

export default App;