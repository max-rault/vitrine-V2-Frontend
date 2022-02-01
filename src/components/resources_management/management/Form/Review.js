import React from "react";

import { Button, 
         Row, 
         Col, 
         Descriptions,
         Collapse,
         Result,
         Avatar
        } from 'antd';
import { AppleOutlined, WindowsOutlined, QqOutlined, SaveOutlined, LeftOutlined } from '@ant-design/icons';   
import Happy from "../../../../../public/Maggy_Happy-no-bg.png"

const { Panel } = Collapse;
const maggyHappy = <img src={Happy}/>

class Review extends React.Component {

  displayVisibility = (props) =>{

    switch (props.ressource_data.visibility) {
      case "Public":
        return ("Pulique")

      case "User":
        return ("Personnels")

      case "Admin":
        return ("Administrateur")
    
      default:
        return ("n/c")
    }
  
  }

  render() {

    const { ressource_data, Files_data, Images_data, ressource_type } = this.props
  
    return (
    <div style={{margin: "0 5em 0 5em"}}>

      <Row className="CenterRow">
        <Result
          title="Bravo !!! vous y êtes presque !!!"
          subTitle="Je vous laisse vérifier que toutes les infos sont éxact !!!"
          icon={
            <Avatar icon={maggyHappy} size={162} className="MaggyHappyStyle"/>
          }
        />
      </Row>

      <Collapse defaultActiveKey={['1']}>

        <Panel header="Informations" key="1">
          <Descriptions bordered layout="vertical" style={{margin: "2em 0 0 2em"}}>

            <Descriptions.Item label="Type de ressource">{ressource_type}</Descriptions.Item>
            <Descriptions.Item label="Est essentiel ?">{ressource_data.is_essential ? "Oui":"Non"}</Descriptions.Item>
            <Descriptions.Item label="Nom de la ressource">{ressource_data.name}</Descriptions.Item>

            <Descriptions.Item label="Visibilité">
              <this.displayVisibility ressource_data={ressource_data}/>
            </Descriptions.Item>

            <Descriptions.Item label="os compatible">
              {ressource_data.osDisponibility.map((os) =>{
              
                switch (os) {
                  case "macOSX":               
                    return(
                      <AppleOutlined key="1"/>
                    )
                  
                  case "windows":
                    return(
                      <WindowsOutlined key="2"/>
                    )

                  case "linux":
                    return(
                      <QqOutlined key="3"/>
                    )
                  default:
                    break;
                }          
              })}
            </Descriptions.Item>
          </Descriptions>
        </Panel>

        <Panel header="Fichiers(s)" key="2">

          <Descriptions title='Fichier' bordered layout="vertical" style={{margin: "2em 0 0 2em"}}>

            <Descriptions.Item label="Nom du fichier">{Files_data.file[0].name}</Descriptions.Item>
            <Descriptions.Item label="type de fichier">{Files_data.file[0].type}</Descriptions.Item>
            <Descriptions.Item label="Taille du fichier">{((Files_data.file[0].size/1024)/1024).toFixed(3)} Mio</Descriptions.Item>

          </Descriptions>

          {Files_data.doc_associated ?

            <Descriptions title="Procédure" bordered layout="vertical" style={{margin: "2em 0 0 2em"}}>

              <Descriptions.Item label="Nom du fichier">{Files_data.doc_associated[0].name}</Descriptions.Item>
              <Descriptions.Item label="type de fichier">{Files_data.doc_associated[0].type}</Descriptions.Item>
              <Descriptions.Item label="Taille du fichier">{((Files_data.doc_associated[0].size/1024)/1024).toFixed(3)} Mio</Descriptions.Item>

            </Descriptions>
          :null}
        </Panel>

        {Images_data.logo.length > 0 || Images_data.background.length > 0 ?

          <Panel header="Mise en page" key="3">
            <div>
              {Images_data.logo.length > 0 ?

                <Descriptions title="Logo" bordered layout="vertical" style={{margin: "2em 0 0 2em"}}>

                  <Descriptions.Item label="Nom du fichier">{Images_data.logo[0].name}</Descriptions.Item>
                  <Descriptions.Item label="type de fichier">{Images_data.logo[0].type}</Descriptions.Item>
                  <Descriptions.Item label="Taille du fichier">{((Images_data.logo[0].size/1024)/1024).toFixed(3)} Mio</Descriptions.Item>

                </Descriptions>
              :null}
              {Images_data.background.length > 0 ?

                <Descriptions title="Arrière plan" bordered layout="vertical" style={{margin: "2em 0 0 2em"}}>

                  <Descriptions.Item label="Nom du fichier">{Images_data.background[0].name}</Descriptions.Item>
                  <Descriptions.Item label="type de fichier">{Images_data.background[0].type}</Descriptions.Item>
                  <Descriptions.Item label="Taille du fichier">{((Images_data.background[0].size/1024)/1024).toFixed(3)} Mio</Descriptions.Item>

                </Descriptions>
              :null}
            </div>
          </Panel>
        :null}

      </Collapse>     

      <Row style={{marginTop: "3em"}}>
        <Col flex="auto" style={{textAlign: "end", marginRight: "2em"}}>
          <Button 
            icon={<LeftOutlined/>}
            onClick={() => this.props.prevStep()}
          >
            Précedent
          </Button>          
        </Col>
        <Col flex="auto">
          <Button 
            type="primary"  
            onClick={this.props.onFinish}
            icon={<SaveOutlined />}
          >
            Terminer
          </Button>
        </Col>
      </Row>
    </div>
    );
  }
}

export default Review