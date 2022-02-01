import React from "react";
import { Menu } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/actions/auth";


class ProfilMenu extends React.Component {

  render() {
    return (
      <Menu
        mode="vertical"
        // theme="dark"
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <a onClick={() => this.props.showProfil()}>
            Informations du profile
          </a>
        </Menu.Item>
        <Menu.Item key="2" icon={<LogoutOutlined />}>
          <Link to="/" onClick={() => this.props.logout()}>
            Déconnexion
          </Link>
        </Menu.Item> 
      </Menu>
    );
  }
}
const mapdispatchtoprops = {
  logout
}


export default connect(null, mapdispatchtoprops)(ProfilMenu)