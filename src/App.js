import React, { Component} from "react";
import {connect} from "react-redux"
import { setNewUpdate } from './store/actions/serviceWorker';
import { hot } from "react-hot-loader";
import Login from "./containers/account/Login";
import { PrivateRoute } from "./components/route/PrivateRoute";
import timeoutSession from "./utils/session";
import NotFound from "./containers/404/notFound";
import { ConfigProvider } from "antd";
import EmptyData from './components/displayData/EmptyData';
import * as serviceWorker from "./service-worker/registerSW";
import NewUpdate from "./components/serviceWorker/newUpdate";
import LoginLayout from "./containers/Layout/LoginLayout";
import fr_FR from 'antd/lib/locale-provider/fr_FR';

import Home from "./containers/home/home";
import Search from "./containers/Search/Search";

import Apps  from "./containers/Ressources/Apps";
import OnlineServices from "./containers/Ressources/OnlineSevices";
import Docs  from "./containers/Ressources/Docs";

import Dashboard from "./containers/resources_management/Dashboard";
import Ressources_management from "./containers/resources_management/Ressources_management";

import NewFile from "./containers/resources_management/new_ressource/NewFile";
import NewLink from "./containers/resources_management/new_ressource/NewLink";
import NewDoc from "./containers/resources_management/new_ressource/NewDoc";

import Edit_Ressource from "./containers/resources_management/edit_ressource/Edit_Ressource";

import Ressource_details from "./containers/Ressources/Ressource_details";
import Settings from "./containers/settings/Settings";
import FakeDetails from "./containers/Ressources/FakeDetails";

import 'moment/locale/fr';


import { 
  Route, 
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import "./style/App.scss";
import "antd/dist/antd.css";

class App extends Component{

   state = {
    TimeSession: 24,
  }

  customizeEmpty = () =>(

    <div className="EmptyDataContainer">
      <EmptyData />
    </div>

  )

  componentDidMount(){
    const wb = serviceWorker.register()
    serviceWorker.checkUpdate(wb)
    this.props.setNewUpdate(false)
  }

  render(){
    timeoutSession.check(this.state.TimeSession)
    console.log("update ========> ", this.props.newUpdate)
    return(
        <div className="App">
          <ConfigProvider renderEmpty={this.customizeEmpty} locale={fr_FR}>
            <Router>
              <NewUpdate/>
              <Switch>
                <Route exact path="/">
                  <LoginLayout>
                    <Login />
                  </LoginLayout>
                </Route>
                <PrivateRoute exact path="/home" component={Home}/>
                <PrivateRoute exact path="/search_result" component={Search}/>

                <PrivateRoute exact path="/apps" component={Apps} />
                <PrivateRoute exact path="/online_services" component={OnlineServices} />
                <PrivateRoute exact path="/docs" component={Docs} />

                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                <PrivateRoute exact path="/Ressources_management" component={Ressources_management} />

                <PrivateRoute exact path="/New_File" component={NewFile} />
                <PrivateRoute exact path="/New_Link" component={NewLink} />
                <PrivateRoute exact path="/New_Doc" component={NewDoc} />

                <PrivateRoute exact path="/Edit_Ressource" component={Edit_Ressource}/>

                <PrivateRoute exact path="/ressource_details" component={Ressource_details}/>

                <PrivateRoute exact path="/settings" component={Settings}/>
                <PrivateRoute exact path="/fake_details" component={FakeDetails}/>

                <Route component={NotFound} />
              </Switch>
            </Router>
          </ConfigProvider>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newUpdate: state.sw.newUpdate
  }
}

const mapdispatchtoprops = {
  setNewUpdate
}

export default connect(mapStateToProps, mapdispatchtoprops)(hot(module)((App)))