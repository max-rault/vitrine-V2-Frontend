import React from "react";
import { Carousel, Row, Col, Image, Typography, Button } from 'antd';
import { showMaggyFirstUse } from "../../store/actions/modal";
import {connect} from "react-redux"
import MaggyThink from "../../components/displayData/MaggyThink";
import db from "../../utils/db";

import Message from "../../components/displayData/Message";
import MaggyFirstUse from "../../components/profil/modal/MaggyFirstUse";
import HomeList from "../../components/home/HomeList";
import * as serviceWorker from "../../service-worker/registerSW";


const HomeListLoading = MaggyThink(HomeList)


class Home extends React.Component{

  state = {
    load: true,
    user: {},
  }

  componentDidMount = async () =>{
    
    const user = await db.table("user").get({uid: 1})

    if(user){
      this.setState({user: user.data})
    }

    if (user.data.firstUse === "1"){

      this.props.showMaggyFirstUse()
    }

  }

  componentDidUpdate(prevProps, prevState){

    if(Object.keys(this.props.ressource).length && this.state.loading === true){
      this.setState({load: false})
    }

  }

  render() {

    const { user, load } = this.state
    const { homeRessources, visible } = this.props

    serviceWorker.notification()
    return (
      <div className="conatiner">
        <Message typeMessage="container" visible={visible} />
        <MaggyFirstUse />
        <HomeListLoading
          isLoading={load}
          user={user}
          homeRessources={homeRessources}
        />
      </div>
    );
  }
}

const mapdispatchtoprops = {
  showMaggyFirstUse,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Home)