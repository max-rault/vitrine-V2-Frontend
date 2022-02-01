import React from "react";

import { connect } from "react-redux";
import { getAppSettings } from "../../store/actions/settings";
import MaggyThink from "../../components/displayData/MaggyThink";
import Settings_componnent from "../../components/settings/Settings";
import Message from "../../components/displayData/Message";

const Settings_Loading =  MaggyThink(Settings_componnent)

class Settings extends React.Component {

  state= {
    loading: true,
  }

  componentDidMount(){
   this.props.getAppSettings()
  }

  componentDidUpdate(prevProps, prevState){
    console.log('props appTasks : ', this.props.appTasks)

    if(this.props.appSettings !== {} && this.props.appTasks.length > 0 && this.state.loading === true){
      this.setState({loading: false})
    }

  }

  render() {

    const { appSettings, visible, appTasks } = this.props
    const { loading } = this.state

    return (
    <div>
      <Message visible={visible} typeMessage="container"/>
      <Settings_Loading
        isLoading={loading}
        appSettings={appSettings}
        appTasks={appTasks}
      />
    </div>
    );
  }
}

const mapdispatchtoprops = {
  getAppSettings, 
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    appSettings: state.settings.appSettings,
    appTasks: state.settings.appTasks
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Settings)