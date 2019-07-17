import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './container/Connection/PrivateRoute'
import Navbar from './container/Navbar';
import Home from './container/Home';
import AdminArtist from './container/Admin/AdminArtist';
import AdminShow from './container/Admin/AdminShow';
import AdminAct from './container/Admin/AdminAct'
import SignIn from './container/Connection/SignIn'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/admin/artist" component={AdminArtist}/>
        <PrivateRoute path="/admin/act" component={AdminAct}/>
        <PrivateRoute path="/admin/show" component={AdminShow}/>
      </Switch>
    </div>
  );
}

export default App;