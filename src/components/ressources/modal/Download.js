import React from "react";
import { Button, Modal, Row, Avatar, Progress, Typography } from 'antd';
import { DownOutlined , UpOutlined, CheckCircleFilled} from '@ant-design/icons'
import { connect } from "react-redux";
import { downloadFile, resetDowloadStats } from "../../../store/actions/ressources";
import maggyHappy from "../../../../public/Maggy_Happy-no-bg.png";
import maggyThink from "../../../../public/Maggy_think-no-bg.png"

const { Paragraph } = Typography;

class Download extends React.Component{

  state= {
    disabledClose: true,
    status: "Téléchargement",
    fileSaved: false,
    showDetails: false,
    downloadCompleted: false,
    dataStatus: "En attente",
    totalComplete: 0
  }

  componentDidMount(){

    this.props.downloadFile(this.props.data)
  }

  
  componentDidUpdate(prevProps){

    if(prevProps.percentCompleted !== this.props.percentCompleted){
    
      const percent = this.props.percentCompleted/3
      this.setState({totalComplete: percent.toFixed(2)})
    }

    if(prevProps.fileDownloaded !== this.props.fileDownloaded){

      if(this.props.percentCompleted === 100 && this.state.fileSaved === false && this.props.fileDownloaded !== {}){

        this.setState({downloadCompleted: true})
        this.saveFile()
      }

    }

    if(prevProps.typeRes !== this.props.typeRes){

      if(this.props.typeRes === "error"){
        this.props.hideDownload()
      }
    }
  }


  saveFile =  async () =>{

    // console.log('file : ', this.props.file)
    try {
      const writable = await this.props.file.createWritable();

      this.setState({dataStatus: <Paragraph>En cours d'écriture ... </Paragraph>})

      await writable.write(this.props.fileDownloaded)

      this.setState({
        dataStatus: <Paragraph>Finalisation de l'écriture des données ...</Paragraph>,
        totalComplete: 67
      }) 
      await  writable.close()

      this.setState({
          totalComplete: 100,
          disabledClose: false,
          fileSaved: true,
      })            
    } catch (error) {
      this.setState({status: "erreur dans le téléchargement !!!!"})
      console.log('err : ', error)
    }
  }

  render() {
    const { disabledClose, 
            totalComplete,
            downloadCompleted,
            dataStatus,
            fileSaved,
            showDetails } = this.state
    const { modalVisible,  percentCompleted, speed} = this.props
    return(
      <Modal 
        key="DownloadModal"
        title="Téléchargement" 
        visible={modalVisible}
        closable={false}
        footer={
          <Button 
            type="primary"
            disabled={disabledClose}
            onClick={ async () => {
              await this.props.resetDowloadStats()
              this.props.hideDownload()
            }}
          >
            Fermer
          </Button>}
        destroyOnClose={true}
      >
        <Row justify="center">
          <Avatar src={fileSaved ? maggyHappy:maggyThink} size={128} style={fileSaved ? {backgroundColor:"green"}:null}/>
        </Row>

        <Row justify="center" style={{marginTop: "2em"}}>
          { fileSaved ?
            <div style={{textAlign: "center"}}>
              <Paragraph>
                Hey ! Merci d'avoir télécharger cette ressource !!!!
              </Paragraph>
              <Paragraph>
                N'oubliez pas de nous donner votre avis !
              </Paragraph>
            </div>
            :
            <div style={{textAlign: "center"}}>
              <Paragraph>
                Veuillez patienter pendant que je m'occupe de la sauvegarde du fichier !!!
              </Paragraph>
              <Paragraph>
                Soyez patient cela peut durer plusieurs minutes !
              </Paragraph>
            </div>
          }
        </Row>
        
        <Row style={{marginTop: "3em"}}>
          Progression global
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={totalComplete}
          />
        </Row>

        <Row style={{marginTop: "1em"}}>
          <Button 
            type="text" 
            icon={showDetails ?  <UpOutlined /> : <DownOutlined />}
            onClick={() => this.setState({showDetails: !showDetails})}
          >
            Détails
          </Button>
        </Row>

      { showDetails ?
        <div style={{marginTop: "2em"}}>
          <Row>
            {downloadCompleted ? 
              <div>
                Téléchargement : Fait <CheckCircleFilled  style={{color: "green"}}/>
              </div>
              : 
              <div>
                Téléchargement : {percentCompleted} %
                <br/>
                Vitesse de téléchargement : {speed} Mio/s
              </div>
            }
          </Row>

          <Row style={{marginTop: "1em"}}>
            {totalComplete === 100 ? 
              <div>
               Écriture des données sur le disque :  Fait <CheckCircleFilled  style={{color: "green"}}/>
              </div>
              : 
              <div>
                Écriture des données sur le disque : {dataStatus === "En attente" ? " En attente": <div>{dataStatus}</div>}
              </div>
            }
          </Row>

        </div>
        :null
      }
      </Modal>
    )
  } 
}

const mapdispatchtoprops = { 
  downloadFile,
  resetDowloadStats 
}

function mapStateToProps(state) {
  return {
    typeRes: state.messages.type,
    fileDownloaded: state.ressources.fileDownloaded,
    percentCompleted: state.ressources.percentCompleted,
    speed: state.ressources.speed,
  }
}
export default connect(mapStateToProps, mapdispatchtoprops)(Download)