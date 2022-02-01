import React from "react";
import { PageHeader, Row, Col, Button, Select, Progress, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import { getRessources } from "../../store/actions/ressources";
import { showDeleteRessources } from "../../store/actions/modal";
import { hideMessage } from "../../store/actions/messages";
import db from "../../utils/db";
import RessourcesList from "../../components/resources_management/management/list/ressourcesList";
import DeleteRessources from "../../components/resources_management/management/modal/DeleteRessource";
import Message from "../../components/displayData/Message";
import MaggyThink from "../../components/displayData/MaggyThink";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Paragraph, Title } = Typography;

const RessourcesListLoading = MaggyThink(RessourcesList)

class Ressources_management extends React.Component {

  state = { 
      name: '',
      load: false,
      selectedRowKeys: [],
      selectedRowsValue: [],
      newRoute: '/New_File',
      isDisabled: true
  }
   componentDidMount = async () =>{

    this.props.hideMessage()
    this.props.getRessources(0, 10)

    this.setState({
        load: true
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(Object.keys(this.props.ressources).length !== 0 && this.state.load === true){
      this.setState({load: false})
    } else if(this.props.noData === true && this.state.load === true){
      this.setState({load: false})
    }
  }

  resetSelectedRow = () => {
  
    this.setState({
      selectedRowKeys: [],
      selectedRowsValue: [],
      isDisabled: true
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows) =>{
  
    if(selectedRowKeys.length > 0){
      this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRowsValue: selectedRows,
        isDisabled: false
      })
    } else if(selectedRowKeys.length <= 0){
      this.resetSelectedRow()
    }
  }

  onAddChange = value =>{
    this.setState({newRoute: value})
  }

  render() {

    const { 
      visible,
      count,
      ressources,
      currentPage,
      size
    } = this.props

    const {
      load, 
      isDisabled, 
      selectedRowsValue, 
      newRoute,
      selectedRowKeys
    } = this.state
    return (
      <div className="UserDashboardStyle">
        <Message visible={visible} typeMessage="container"/>
        <DeleteRessources/>
        
        {load ? null: 
          <div>

            <Row justify="center" align="middle" style={{margin: "3em 0 1em 0"}}> 
              <Col flex="auto" style={{textAlign: "center"}}>
                <Title level={5}>éspace occupé en BDD</Title>
                <Progress 
                  type="circle" 
                  percent={size.percentBDD}
                  format={(percent) =>{
                    if(percent === 100){
                      return(
                        <div style={{color: '#fa5e43'}}>
                          Mémoire pleine
                        </div>
                      )
                    } else {
                      return(
                        <div>
                          {`${percent} %`}
                        </div>
                      )
                    }
                  }}
                  width={150}
                  strokeColor={{
                    '0%': '#068a06',
                    '100%': '#fa5e43'
                  }}
                />
                <Paragraph>
                  {`${size.totalSizeBDD} Gio/${size.limitBDD} Gio`}
                </Paragraph>
              </Col>
              <Col flex="auto" style={{textAlign: "center"}}>
                <Title> Liste des ressources </Title>
              </Col>
              <Col flex="auto" style={{textAlign: "center"}}>
                <Title level={5}>éspace occupé sur le serveur</Title>
                <Progress 
                  type="circle" 
                  percent={size.percentServer}
                  width={150}
                  format={(percent) =>{
                    if(percent === 100){
                      return(
                        <div style={{color: '#fa5e43'}}>
                          Mémoire pleine
                        </div>
                      )
                    } else {
                      return(
                        <div>
                          {`${percent} %`}
                        </div>
                      )
                    }
                  }}
                  strokeColor={{
                    "0%": '#068a06',
                    "100%": '#fa5e43'
                  }}
                />
                <Paragraph>
                 {`${size.totalSizeServer} Gio/${size.limitServer} Gio`}
                </Paragraph>
              </Col>      
            </Row>
            <PageHeader
              className="HeaderStyle"
              extra={[
                <Row  key="buttonUserList" className="ButtonHeader">
                  <Col span={24}  className="ButtonContainer">
                    <Select 
                      className="selectWithButton" 
                      onChange={this.onAddChange}
                      defaultValue="/New_File"
                    >
                      <Option value="/New_File">
                        Nouvelle ressource (fichier)
                      </Option>
                      <Option value="/New_Link">
                        Nouvelle ressource (URL)
                      </Option>
                      <Option value="/New_Doc">
                        Nouvelle procédure
                      </Option>
                    </Select>
                    <Button
                      type="primary"
                      className="newButtonStyle"
                    >
                      <Link to={newRoute}>
                        <PlusOutlined />                  
                      </Link>
                    </Button>
                    <Button
                      className="ButtonStyle"
                      type="primary" 
                      shape="round"
                      danger
                      disabled={isDisabled}
                      icon={<DeleteOutlined />}
                      onClick={() => {
                          this.resetSelectedRow()
                          this.props.showDeleteRessources(selectedRowsValue)
                        }
                      }
                    >
                      supprimer
                    </Button>
                  </Col>
                </Row>
              ]}
            /> 

          </div>
        }
        <RessourcesListLoading  
          isLoading={load}
          ressources={ressources}
          count={count}
          getRessources={this.props.getRessources}
          showDeleteRessources={this.props.showDeleteRessources}
          resetSelectedRow={this.resetSelectedRow}
          rowKeys={selectedRowKeys}
          onSelectChange={this.onSelectChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

const mapdispatchtoprops = {
    showDeleteRessources,
    hideMessage,
    getRessources
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    ressources: state.ressources.list,
    count: state.ressources.count,
    noData: state.ressources.noData,
    currentPage: state.ressources.currentPage,
    size: state.ressources.size
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Ressources_management)