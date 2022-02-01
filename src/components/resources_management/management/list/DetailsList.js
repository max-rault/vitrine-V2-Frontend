import React from "react";
import { Row, Col, Descriptions , Divider, Typography  } from 'antd';
import { 
         AppleOutlined,
         WindowsOutlined,
         QqOutlined
       } from '@ant-design/icons';   

const { Title } = Typography;

class DetailsList extends React.Component {

  render() {
    const {ressource} = this.props
    return (
      <div>
        <Title level={4} style={{marginBottom: "1em"}}>Informations</Title>
        <Descriptions layout='vertical' bordered size="small">
          { ressource.type === "docs" || ressource.type === "apps_file" ?
            <Descriptions.Item label="Nom du fichier">{ressource.file_name}</Descriptions.Item>
          :null}
         {  ressource.type === "apps_file" ?
            <Descriptions.Item label="Compatibilité">
              {ressource.osDisponibility.map((os) =>{
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
                })
              }
            </Descriptions.Item>
          :null}
          <Descriptions.Item label="Visibilité">{ressource.visibility}</Descriptions.Item>
          <Descriptions.Item label="Procédure associé">{ressource.has_procedure === true ? "oui":"non"}</Descriptions.Item>
        </Descriptions>
        <Title level={4} style={{marginTop: "2em", marginBottom: "1em"}} >Description</Title>
          <Row>
            {ressource.describ}
          </Row>
      </div>
    );
  }
}


export default DetailsList