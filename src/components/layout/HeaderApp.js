import React from "react";
import { Layout, Row, Col, Dropdown, Avatar, Affix, Input, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import MenuLayout from "./menu/MenuLayout";
import ProfilMenu from "./menu/ProfilMenu";
import ProfilDesc from "../profil/ProfilDesc";
import db from "../../utils/db";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;


class HeaderApp extends React.Component{

  state = {
    profilVisible: false,
    menuVisible: false,
    accountType: "",
    user: {},
    avatarColor: '',
    avatarName: ''
  }



  componentDidMount(){

    if(localStorage.getItem('autType') !== "default"){
      db.table("user").get(1)
      .then((user) => {
        this.setState({
          user: user.data,
          accountType: user.data.accountType,
          avatarColor: user.data.avatarColor,
          avatarName: user.data.avatarName,
        })
      })
      .catch((err) => console.log(err))
    }
  }

   onColorChange = async (value) => {

    const user = await db.user.get(1) 
    user.data.avatarColor = value
    await db.user.update(1, user)
    this.setState({avatarColor: value})
  }

  showProfil = () => {

    this.setState({profilVisible: true})
  } 

  render() {
    const { 
      profilVisible, 
      user, 
      avatarColor, 
      accountType,
      avatarName, 
      menuVisible, 
    } = this.state
    const { history } = this.props
    return(
      <Header className="headerAppStyle">
        <Drawer
          visible={menuVisible}
          closable={false}
          onClose={() => this.setState({menuVisible: false})}
          placement="left"
          width={350}
        >
          <MenuLayout           
            accountType={accountType}
            onClose={() => this.setState({menuVisible: false})}
          />
        </Drawer>
        <Drawer
          visible={profilVisible}
          className="profilDrawerStyle"
          onClose={() => this.setState({profilVisible: false})}
          placement="right"
          width={700}
        >
          <ProfilDesc 
            user={user} 
            onColorChange={this.onColorChange}
          />
        </Drawer>
        <Affix>
          <Row>
            <Col span={8}>
              <Row>
                <Col span={5}>
                  <div 
                    onClick={() => this.setState({menuVisible: true})}
                    className="HeaderMenuButtonStyle"
                  >
                  <MenuOutlined className="iconMenu" />  Menu
                  </div>
                </Col>
                <Col span={5} style={{marginTop: "1em"}}>
                  <Link to="/home">
                    <strong className="textLogoStyle">
                      RESIN
                    </strong>                  
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Search 
                style={{marginTop:"1.5em"}}
                placeholder="Recherche"
                enterButton
                onSearch={(value) =>  history.push({
                  pathname: '/search_result',
                  search: `?query=${value}`,
                  state: {query: value}
                })}
              />
            </Col>
            { profilVisible ? null:
              <Col span={8}>
                <Dropdown overlay={<ProfilMenu showProfil={this.showProfil}/>}>
                  <Avatar style={{background:`${avatarColor}`}} size="large" className="ButtonProfileStyle">{avatarName}</Avatar>
                </Dropdown>
              </Col>
            }
          </Row>
        </Affix>
      </Header>
    )
  } 
}


function mapStateToProps(state) {
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps)(HeaderApp)