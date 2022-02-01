import React from "react";
import { Row, Col, Divider, Typography, Button, Statistic, List, Rate } from 'antd';
import { 
  StarTwoTone, 
  AppleOutlined, 
  WindowsOutlined, 
  QqOutlined, 
  LikeOutlined,
  DownSquareOutlined,
} from '@ant-design/icons'

import db from "../../utils/db";

const { Paragraph, Title } = Typography;


class FakeDetails extends React.Component {
  
  state = {
    background: "",
    logo: "",
    feedbacks: [
      {
        title: 'Ant Design Title 1',
        postedAt: "17/01/2022, 19:15:23",
        updatedAt: "17/01/2022, 20:15:23",
        rate: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        title: 'Ant Design Title 1',
        postedAt: "17/01/2022, 19:15:23",
        updatedAt: "17/01/2022, 20:15:23",
        rate: 4,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        title: 'Ant Design Title 1',
        postedAt: "17/01/2022, 19:15:23",
        updatedAt: "17/01/2022, 20:15:23",
        rate: 4,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        title: 'Ant Design Title 1',
        postedAt: "17/01/2022, 19:15:23",
        updatedAt: "17/01/2022, 20:15:23",
        rate: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
    ]
  }

  componentDidMount = () =>{
    db.table("defaultImage").get({id: 1}).then((image) =>{
      console.log(image)
      if(image){
        this.setState({
          background: image.data.background,
          logo: image.data.logo
        })
      }

    }).catch((err) => console.log(err))
  }

  render() {
    const { background, logo, feedbacks } = this.state
    return (
      <div className="DetailContainer" >

        <Row className="DetailBackground" >
          <img src={background} alt="background logo" />
        </Row>

        <div className="detailsContentStyle" >
          <Row style={{ margin: "0 2em 0 2em" }}>

            <Col flex="100px">
              <img src={logo} alt="ressource logo" style={{margin: " 0 2em 2em 0", maxWidth: "24rem"}}/>
            </Col>

            <Col flex="auto">

              <Row>
                <Title>
                  Page d'Exemple
                </Title>
                <Button 
                  icon={<DownSquareOutlined />} 
                  type="primary" 
                  style={{margin: "14px 0 0 1em"}}
                  onClick={() => console.log('vous avez obtenue la ressource !!!!')}
                >
                  Obtenire
                </Button>
              </Row>

              <Row>
                <Col>
                  <Paragraph>
                    Moyenne
                  </Paragraph>
                  <Paragraph>
                    <StarTwoTone twoToneColor={"#ffd27d"} /> 4,5
                  </Paragraph>
                </Col>

                <Divider type="vertical" style={{height: "5em"}}/>

                  <Col>
                    <Paragraph>
                      OS compatible
                    </Paragraph>
                    <Paragraph>
                      <AppleOutlined/>
                      <WindowsOutlined/>
                      <QqOutlined/>
                                    
                    </Paragraph>
                  </Col>

                <Divider type="vertical" style={{height: "5em"}}/>

                <Col>
                  <Paragraph>
                    Procédure
                  </Paragraph>
                  <Row>
                    <Col style={{marginRight: "2em"}}>
                      <Button 
                        
                        type="ghost"
                        onClick={()=> console.log('ouvert en ligne !!!')}
                      >
                        Ouvrir en ligne
                      </Button>
                    </Col>
                    <Col>
                      <Button 
                        
                        type="ghost"
                        onClick={() => console.log('Télécharger !!!!')}
                      >
                        Télécharger
                      </Button>
                    </Col>                    
                  </Row>
                </Col>

              </Row>
            </Col>
          </Row>

          <Divider>Description</Divider>

          <Row style={{ margin: "0 2em 0 2em" }}>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Praesent vel nisi dictum, posuere augue sit amet, congue velit. 
              Maecenas lorem purus, tincidunt in eleifend ut, porta id nunc. 
              Curabitur sed metus vel quam ornare tincidunt. Sed commodo neque ac tristique condimentum. 
              Quisque imperdiet magna semper, iaculis ipsum eget, placerat turpis. 
              Vestibulum et nisl feugiat, pharetra diam quis, sollicitudin urna. 
              Morbi auctor, leo eu accumsan tristique, augue ante vestibulum massa, quis ultrices sapien quam eget lacus. 
              Curabitur quis gravida nibh.
            </Paragraph>

            <Paragraph>
              Nullam fringilla eget tortor ut suscipit. 
              Duis arcu orci, lacinia eget odio a, pharetra consequat ligula. 
              Aenean fermentum lorem sit amet dictum sollicitudin. 
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
              Ut sit amet nibh nisi. Etiam eget felis vel ipsum vulputate convallis quis sit amet odio. 
              Ut bibendum pulvinar velit. 
              Aliquam sed tempus risus. Donec tempor risus eget congue laoreet. 
              Morbi efficitur nisl tellus, eu feugiat sem maximus eget.
               Pellentesque id dictum dolor, sit amet facilisis tortor. 
              Pellentesque consectetur leo nisl, dapibus lobortis nulla gravida eu. 
              In ut egestas metus. 
              Sed ex felis, dictum non scelerisque sit amet, auctor id massa.
            </Paragraph>
            
          </Row>

          <Divider>Évaluation et Commentaires</Divider>

          <Row style={{ margin: "0 2em 0 2em" }}>
            <Row>
              <Col>
                <Paragraph >
                  <Statistic title="Nombre d'avis" value={666} prefix={<LikeOutlined />} />                
                </Paragraph>
              </Col>
              <Col style={{marginLeft: "2em"}}>
                <Button type="primary" onClick={() => console.log("Merci ! d'avoir donné votre avis")}>
                  Donner son avis
                </Button>
              </Col>
            </Row>
          </Row>

          <Row style={{ margin: "0 2em 0 2em" }}>
            <List
              style={{width:"100%"}}
              dataSource={feedbacks}
              itemLayout="vertical"
              size="large"
              renderItem={feedback => (
                <List.Item>
                  <List.Item.Meta
                    style={{marginBottom: "0em"}}
                    title={feedback.title}
                    description={feedback.updatedAt ? `Modifié le ${feedback.updatedAt}`:`Posté le ${feedback.postedAt}`}
                  />
                  <Rate disabled defaultValue={feedback.rate} style={{marginBottom: "1em"}}/>                    
                  <Paragraph>
                    {feedback.text}
                  </Paragraph>

                </List.Item>
              )}
            />
          </Row>

        </div>
      </div>   
    );
  }
}


export default FakeDetails