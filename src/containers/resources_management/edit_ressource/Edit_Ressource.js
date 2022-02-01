import React from "react";

import { PageHeader } from 'antd';  
import { getRessource } from "../../../store/actions/ressources";
import Edit from "../../../components/resources_management/management/Edit";
import Message from "../../../components/displayData/Message";
import { connect } from "react-redux";
import MaggyThink from "../../../components/displayData/MaggyThink";
import db from "../../../utils/db";

const EditLoading = MaggyThink(Edit)

class Edit_Ressource extends React.Component {

 state = {
    loading: true,
    ressource_type: ""
  }

  componentDidMount(){
   
    db.table("ressource").get({uid: 1}).then((ressource) =>{
      if(ressource){
        this.props.getRessource(ressource.data.id)

        if(ressource.data.type === "apps_link" || ressource.data.type === "online_service"){

          this.setState({ressource_type: "link"})  

        } else {

          this.setState({ressource_type: ressource.data.type})  


        }  

        document.title = `Édition - ${ressource.data.name}`
      }
    }).catch((err) => console.log('err in Edit ressource =====> ', err))
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.ressource !== {} && this.state.loading === true){
      this.setState({loading: false})
    }

  }

  render() {
    
    const { visible, ressource } = this.props
    const { loading, ressource_type } = this.state
    return (
    <div>
      <PageHeader title={ressource.name} onBack={() => window.history.back()}/>
      <Message typeMessage="container" visible={visible}/>
      <EditLoading
        ressource={ressource}
        ressource_type={ressource_type}
        isLoading={loading}
      />
    </div>
    );
  }
}

const mapdispatchtoprops = {
  getRessource,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    ressource: state.ressources.ressource,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Edit_Ressource)