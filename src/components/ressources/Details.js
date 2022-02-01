import React from "react";
import { Row, Col, Divider, Typography, Button, Statistic, List, Rate } from 'antd';
import { 
  StarTwoTone, 
  AppleOutlined, 
  WindowsOutlined, 
  QqOutlined, 
  LikeOutlined,
  DownSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import defaultBG from "../../../public/linux_good_side.jpg"
import Feedback from "./modal/Feedback";
import DeleteFeedback from "./modal/DeleteFeedback";
import API from "../../utils/API";
import Download from "./modal/Download";

const { Paragraph, Title } = Typography;

export class Details extends React.Component {

  state = {
    visible: false,
    feedBack: null,
    openDownload: false,
    deleteVisible: false,
    file: {},
    dataRequest: {},
    deleteID: 0
  }

  hideFeedBack = () => {
    this.setState({visible: false})
  }

  hideDownload = () =>{
    this.setState({openDownload: false})
  }

  hideModal = () => {
  
    this.setState({deleteVisible: false})
  }

  openPDFinNavigator = async () =>{

    const data = {
      id: this.props.ressource.Ressources_doc.DocId,
      type: 'Doc',
      responseType: 'arraybuffer',
      headerAccept: 'application/pdf'
    }
    await this.props.downloadFile(data)

    const file = new Blob([this.props.file], { type: "application/pdf" })
    const fileURL = window.URL.createObjectURL(file)

    window.open(fileURL, "_blank");
  }

  render() {
    const { 
      ressource,
      logo, 
      feedBacksCount, 
      feedbacks, 
      noFeedBack,
      average, 
      userID } = this.props
    const { 
      visible, 
      deleteVisible,
      openDownload,
      file,
      dataRequest,
      deleteID, 
      feedBack } = this.state
    return (
      <div className="DetailContainer" >

        <Feedback visible={visible} hideFeedBack={this.hideFeedBack} id={ressource.id} userID={userID} feedBack={feedBack}/>
        <DeleteFeedback modalVisible={deleteVisible} hideModal={this.hideModal} RessourceID={ressource.id} feedBackID={deleteID} />
        {openDownload ? <Download modalVisible={openDownload} data={dataRequest} file={file} hideDownload={this.hideDownload} />:null}

        <Row className="DetailBackground" >
          <img src={defaultBG} alt="background logo" />
        </Row>

        <div className="detailsContentStyle" >
          <Row style={{ margin: "0 2em 0 2em" }}>

            <Col flex="100px">
              <img src={logo} alt="ressource logo" style={{margin: " 0 2em 2em 0", maxWidth: "24rem"}}/>
            </Col>

            <Col flex="auto">

              <Row>
                <Title>
                  {ressource.name}
                </Title>
                <Button 
                  icon={ressource.link ? <ArrowRightOutlined />:<DownSquareOutlined />} 
                  type="primary" 
                  href={ressource.link ? ressource.link:null}
                  target={ressource.link ? "_blank":null}
                  style={{margin: "14px 0 0 1em"}}
                  onClick={async () =>{
                    try {
                      await this.props.newStats(ressource.id)
                      const file = await window.showSaveFilePicker({
                          suggestedName: ressource.file_name,
                          types: [{
                            description: 'Application',
                            accept: {'application/file': ['.exe','.iso']},
                          }],
                        })
                        const data = {
                          id: ressource.id,
                          type: 'App',
                          responseType: 'blob',
                          headerAccept: 'application/file'
                        }
                        this.setState({
                          openDownload: true,
                          dataRequest: data,
                          file: file
                        })

                    } catch (error) {
                      console.log('err : ', error)
                    }
                  }}
                >
                  {ressource.link ? "Aller sur le site":"Obtenir"}
                </Button>
              </Row>

              <Row>
                <Col>
                  <Paragraph>
                    Moyenne
                  </Paragraph>
                  <Paragraph>
                    <StarTwoTone twoToneColor={"#ffd27d"} /> {average}
                  </Paragraph>
                </Col>

                {ressource.type === "apps_file" | ressource.type === "apps_link"  ? <Divider type="vertical" style={{height: "5em"}}/>:null}

                {ressource.type === "apps_file" | ressource.type === "apps_link"  ?
                  <Col>
                    <Paragraph>
                      OS compatible
                    </Paragraph>
                    <Paragraph>
                      {ressource.osDisponibility.map((item) =>{
                        switch (item) {
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
                    </Paragraph>
                  </Col>:null
                }

                {ressource.has_procedure ? <Divider type="vertical" style={{height: "5em"}}/>:null}

                {ressource.has_procedure ? 
                  <Col>
                    <Paragraph>
                      Procédure
                    </Paragraph>
                    <Row>
                      <Col style={{marginRight: "2em"}}>
                        <Button 
                          
                          type="ghost"
                          onClick={()=> this.openPDFinNavigator()}
                        >
                          Ouvrir en ligne
                        </Button>
                      </Col>
                      <Col>
                        <Button 
                          
                          type="ghost"
                          onClick={async () =>{
                            try {
                              const fileName = ressource.file_name.split(".").slice(0,-1).join(".") || this + ""
                              const file = await window.showSaveFilePicker({
                                  suggestedName: `${fileName}-Procédure`,
                                  types: [{
                                    description: 'Document',
                                    accept: {'application/pdf': ['.pdf']},
                                  }],
                                })

                              const data = {
                                id: ressource.Ressources_doc.DocId,
                                type: 'Doc',
                                responseType: 'arraybuffer',
                                headerAccept: 'application/pdf'
                              }

                              this.setState({
                                openDownload: true,
                                dataRequest: data,
                                file: file
                              })

                            } catch (error) {
                              console.log('err : ', error)
                            }                          
                          }}
                        >
                          Télécharger
                        </Button>
                      </Col>                    
                    </Row>
                  </Col>
                :null}

              </Row>
            </Col>
          </Row>

          <Divider>Description</Divider>

          <Row style={{ margin: "0 2em 0 2em" }}>
            <div>{ressource.describ}</div>
          </Row>

          <Divider>Évaluation et Commentaires</Divider>

          <Row style={{ margin: "0 2em 0 2em" }}>
            <Row>
              <Col>
                <Paragraph >
                  <Statistic title="Nombre d'avis" value={feedBacksCount} prefix={<LikeOutlined />} />                
                </Paragraph>
              </Col>
              <Col style={{marginLeft: "2em"}}>
                <Button type="primary" onClick={() => this.setState({visible: true})}>
                  Donner son avis
                </Button>
              </Col>
            </Row>
          </Row>

          {noFeedBack === true ? null:<Row style={{ margin: "0 2em 0 2em" }}>
            <List
              style={{width:"100%"}}
              dataSource={feedbacks}
              itemLayout="vertical"
              size="large"
              renderItem={feedback => (
                <List.Item
                  actions={feedback.UserId === userID ?[
                    <Button 
                      type="primary" 
                      shape="round" 
                      onClick={() => {
                        this.setState({
                          visible: true,
                          feedBack: feedback
                        })
                      }}
                      icon={<EditOutlined />}
                    >
                      Modifier
                    </Button>,
                    <Button 
                      type="primary" 
                      danger 
                      shape="round"
                      onClick={() => {
                        this.setState({
                          deleteVisible: true,
                          deleteID: feedback.id
                        })
                      }}
                      icon={<DeleteOutlined />}
                    >
                      Supprimer
                    </Button>
                  ]:null}
                >
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
          </Row>} 

        </div>
      </div>
    );
  }
}