import React from "react";
import { Menu, Row, Col, Divider } from 'antd';
import { 
  FilePdfOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  CloudOutlined,
  FileDoneOutlined,
  SettingOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import {connect} from "react-redux";
import { getUser } from "../../../store/actions/users";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class MenuLayout extends React.Component {

  render() {
    const { accountType } = this.props
    if(accountType === "admin"){
      return (
        <div>
          <Row>
            <Col 
              span={10}
              onClick={() => this.props.onClose()}
              className="MenuButtonStyle"
            >
              <CloseOutlined className="iconMenu"/>  Menu
            </Col>
            <Col span={10} style={{marginTop: "1em"}}>
              <Link to="/home" onClick={this.props.onClose}>
                <strong className="textLogoStyle">RESIN</strong>            
              </Link>
            </Col>
          </Row>       
          <Menu mode="vertical" style={{border:"none"}} selectable={false}>
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={this.props.onClose}>
              <Link to="/home">
                Accueil
              </Link>
            </Menu.Item>
          </Menu>
            <Divider>Ressources</Divider>
          <Menu mode="vertical" style={{border:"none"}} selectable={false}>
            <Menu.Item key="Res1" icon={<AppstoreOutlined />} onClick={this.props.onClose}>
              <Link to="/apps">
                Applications
              </Link>
            </Menu.Item>
            <Menu.Item key="Res2" icon={<CloudOutlined />} onClick={this.props.onClose}>
              <Link to="/online_services">
                Services en lignes
              </Link>
            </Menu.Item> 
            <Menu.Item key="Res3" icon={<FilePdfOutlined />} onClick={this.props.onClose}>
              <Link to="/docs">
                Procédures
              </Link>
            </Menu.Item> 
          </Menu>
            <Divider>Administration</Divider>
          <Menu mode="inline" style={{border:"none"}} selectable={false}>
            <Menu.Item key="mana1" icon={<DashboardOutlined />} onClick={this.props.onClose}>
              <Link to="/Dashboard">
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="mana2" icon={<UnorderedListOutlined />} onClick={this.props.onClose}>
              <Link to="/Ressources_management">
                Géstions des ressources
              </Link>
            </Menu.Item>  
            <Menu.Item key='mana3' icon={<SettingOutlined />} onClick={this.props.onClose}>
              <Link to="/settings">
                Paramètres
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col 
              span={10}
              onClick={() => this.props.onClose()}
              className="MenuButtonStyle"
            >
              <CloseOutlined className="iconMenu"/>  Menu
            </Col>
            <Col span={10} style={{marginTop: "1em"}}>
              <Link to="/home" onClick={this.props.onClose}>
                <strong className="textLogoStyle">RESIN</strong>            
              </Link>
            </Col>
          </Row>       
          <Menu mode="vertical" style={{border:"none"}} selectable={false}>
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={this.props.onClose}>
              <Link to="/home">
                Accueil
              </Link>
            </Menu.Item>
          </Menu>
          <Divider>Ressources</Divider>
          <Menu mode="vertical" style={{border:"none"}} selectable={false}>
            <Menu.Item key="Res1" icon={<AppstoreOutlined />} onClick={this.props.onClose}>
              <Link to="/apps">
                Applications
              </Link>
            </Menu.Item>
            <Menu.Item key="Res2" icon={<CloudOutlined />} onClick={this.props.onClose}>
              <Link to="/online_services">
                Services en lignes
              </Link>
            </Menu.Item> 
            <Menu.Item key="Res3" icon={<FileDoneOutlined />} onClick={this.props.onClose}>
              <Link to="/survey">
                Enquêtes en ligne
              </Link>
            </Menu.Item> 
            <Menu.Item key="Res4" icon={<FilePdfOutlined />} onClick={this.props.onClose}>
              <Link to="/docs">
                Procédures
              </Link>
            </Menu.Item> 
          </Menu>
        </div>
      );
    }
  }
}
const mapdispatchtoprops = {
  getUser
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(MenuLayout)