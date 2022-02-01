import React from "react";
import { getRessource, downloadFile } from "../../store/actions/ressources";
import { new_ressource_stat } from "../../store/actions/stats";
import {connect} from "react-redux";
import { Details } from "../../components/ressources/Details";
import MaggyThink from "../../components/displayData/MaggyThink";
import db from "../../utils/db";
import Message from "../../components/displayData/Message";

const DetailsLoading = MaggyThink(Details)

class Ressource_details extends React.Component {
  
  state = {
    load: true,
    logo_url: '',
    userID: 0
  }

  componentDidMount = () =>{
    db.table("ressource").get({uid: 1}).then( (ressource) =>{
      if(ressource){
        this.props.getRessource(ressource.data.id)
        document.title = `${ressource.data.name}`
        this.setState({logo_url: ressource.data.logo})

        db.table("user").get({id: 1}).then((user) =>{
          if(user){
            this.setState({userID: user.data.id})
          }
        }).catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))
  }

  componentWillUnmount = () =>{
  
    document.title = "Resin"
  }

  componentDidUpdate(prevProps, prevState){
    if(Object.keys(this.props.ressource).length !== 0 && this.state.load === true){
      this.setState({load: false})
    } else if(this.props.noData === true && this.state.load === true){
      this.setState({load: false})
    }
  }


  render() {
    const { 
      ressource, 
      visible, 
      feedbacks, 
      feedBacksCount, 
      noFeedBack,
      file,
      average
    } = this.props
    const { load, logo_url, userID } = this.state
    return (
      <div>
        <Message visible={visible} typeMessage="container"/>
        <DetailsLoading
          isLoading={load}
          downloadFile={(data) => this.props.downloadFile(data)}
          newStats={(id) => this.props.new_ressource_stat(id)}
          userID={userID}
          ressource={ressource}
          feedbacks={feedbacks}
          average={average}
          file={file}
          feedBacksCount={feedBacksCount}
          noFeedBack={noFeedBack}  
          logo={logo_url}
        />      
      </div>
    );
  }
}

const mapdispatchtoprops = {
    getRessource,
    new_ressource_stat,
    downloadFile
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    ressource: state.ressources.ressource,
    feedbacks: state.feedbacks.list,
    feedBacksCount: state.feedbacks.count,
    average: state.feedbacks.average,
    file: state.ressources.fileDownloaded,
    noFeedBack: state.feedbacks.noFeedBack
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Ressource_details)