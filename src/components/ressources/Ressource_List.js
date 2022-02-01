import React from "react";
import { List, Card, Rate, Typography} from 'antd';
import { 
  AppleOutlined, 
  WindowsOutlined, 
  QqOutlined, 
} from '@ant-design/icons'
import db from "../../utils/db";

const { Meta } = Card;
const { Paragraph, Title } = Typography;

export class Ressource_List extends React.Component {
  
  render() {
    const { Ressources, history } = this.props
    console.log('ressources : ', Ressources)
    return (
      <List
        style={{marginTop:"2em"}}
        grid={{ gutter: 16, column: 4}}
        dataSource={Ressources}
        renderItem={ressource => (
          <List.Item>
          <Card 
              className="cardListStyle"
              cover={
                <div style={{ overflow: "hidden", height: "150px" }}>
                  <img alt="example" src={ressource.logo} className="imageCardStyle"/>
                </div>
              }
              hoverable
              onClick={() =>{
                db.table("ressource").clear()
                db.table("ressource").add({ uid: 1, data : ressource})
                history.push('/ressource_details')
              }}
            >
              <Meta
                
                title={ressource.name}  
                description={
                  <div>
                    <Paragraph>
                      {ressource.displayType}
                    </Paragraph>
                    {ressource.type === "apps_file"  ?
                      <Paragraph>
                        {ressource.osDispinibility.map((item) =>{
                          switch (item) {
                            case "macOSX":
                              
                              return(
                                <AppleOutlined key={`${ressource.id}-1`}/>
                              )
                            
                            case "windows":

                              return(
                                <WindowsOutlined key={`${ressource.id}-2`}/>
                              )

                            case "linux":

                              return(
                                <QqOutlined key={`${ressource.id}-3`}/>
                              )
                            default:
                              break;
                          }
                        })}
                      </Paragraph>:null
                    }
                    <div>
                      <Rate disabled defaultValue={ressource.average}/>
                    </div>            
                  </div>           
                } 
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}