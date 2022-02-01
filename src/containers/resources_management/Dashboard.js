import React from "react";
import Message from "../../components/displayData/Message";
import {connect} from "react-redux";
import MaggyThink from "../../components/displayData/MaggyThink";
import Dashboards_Tabs from "../../components/resources_management/dashboard/Dashboards_Tabs";
import { getHeaderStats } from "../../store/actions/stats";

const Tabs_loading = MaggyThink(Dashboards_Tabs)

class Dashboard extends React.Component {

  state = {
    loading: true
  }

 componentDidMount(){
    this.props.getHeaderStats()
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.headerStats !== {} && this.state.loading === true){
      this.setState({loading: false})
    }
  }

  render() {
    const { visible, headerStats } = this.props
    const { loading } = this.state
    console.log('header stats : ', headerStats)
    return (
      <div className="UserDashboardStyle">

        <Message visible={visible} typeMessage="container"/>
        <Tabs_loading
          isLoading={loading}
          headerStats={headerStats}
        />
      </div>
    );
  }
}
const mapdispatchtoprops = {
    getHeaderStats,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    headerStats: state.stats.headerStats,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Dashboard)