import React from "react";

import { Collapse } from 'antd';  
import { 

  uploadDoc,
  uploadImages,
  uploadFile,
  createRessource

} from "../../../store/actions/ressources";
import Ressource_data from "./Form/Ressource_data";
import Files_upload from "./Form/Files_upload";
import Page_layout from "./Form/Page_layout";
import { connect } from "react-redux";

const { Panel } = Collapse;

class Edit extends React.Component {

  state = {
    uploadingApp: false, 
    uploadingDoc: false
  }

  render() {
    
    const { ressource, ressource_type } = this.props
    const { uploadingDoc, uploadingApp } = this.state
    return (
    <div>
      <Collapse 
        accordion
        bordered
        style={{margin:"0 5em 0 5em"}}
      > 
        <Panel header="Informations" key="1">
          <Ressource_data
              ressource_type={ressource_type}
              ressource={ressource}

              onFinish={async (value) =>{
                value.type = ressource.type
                await this.props.createRessource(value)
              }}
            />
        </Panel>
        <Panel header="Fichier" key="2">
          <Files_upload
              ressource={ressource}
              uploadingApp={uploadingApp}
              uploadingDoc={uploadingDoc}
              ressource_type={ressource_type}
              percent_file={this.props.percent_file}
              percent_doc={this.props.percent_doc}
              nextStep={async (values) => {
                if(values.have_doc){

                  this.setState({
                      uploadingDoc: true
                  })
                  await this.props.uploadDoc(values, ressource.key) 

                } else {
                  
                  this.setState({uploadingApp: true})

                  await this.props.uploadFile(values.file[0].originFileObj, ressource.key)
                }
              }}
            />
        </Panel>
        <Panel header="Mise en forme" key="3">
          <Page_layout
              ressource={ressource}
              nextStep={async (values) => {

                if(values.logo || values.background){

                  await this.props.uploadImages(values, ressource.key)

                } 
              }}
            />
        </Panel>
      </Collapse>
    </div>
    );
  }
}

const mapdispatchtoprops = {
  uploadDoc,
  uploadImages,
  uploadFile,
  createRessource
}

function mapStateToProps(state) {
  return {
    fileStatus: state.ressources.fileStatus,
    Imagesstatus: state.ressources.Imagesstatus,
    percent_file: state.ressources.percent_file,
    docStatus: state.ressources.docStatus,
    percent_doc: state.ressources.percent_doc,
    responseStatus: state.ressources.ressource_status,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Edit)