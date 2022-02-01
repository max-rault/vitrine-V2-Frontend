import React from "react";
import { 
  Divider,
  Avatar,
  Row,
  Button,
} from 'antd';
import {connect} from "react-redux";
import { updateUser } from "../../store/actions/users";
import PreferencesForm from "./PreferencesForm";
import { subscribeUser } from "../../Subscription/subscription";

class ProfilDesc extends React.Component{

  state = {
    userID: 0,
    avatarName: "D N",
    avatarColor: "#00F",
    name: 'Default Name',
    mail: 'default mail',
    theme:'light',
  }

  componentDidMount(){
  
    const { user } = this.props
    this.setState({
      userID: user.id,
      avatarName: user.avatarName,
      avatarColor: user.avatarColor,
      name: user.name,
      mail: user.mail,
      theme: user.theme,
    })
  }
  
  onFinish = async values =>{

    const {userID} = this.state 
    var user = this.props.user
    user.theme = values.theme
    user.avatarColor = values.avatarColor

    
    console.log('values : ', values)

    if(values.nottification === true){
      user.nottification = "granted"
      
    } else {
      user.nottification = "denied"
    }
    
    const data = {
      id: userID,
      fields: ['theme', 'avatarColor', 'notiffication'],
      userUpdate: user,
    }
    await this.props.updateUser(data)

  }

  onFinishFailed = errorInfo =>{
  
    console.log('err in preferences form ======> ', errorInfo)  
  }

  render() {
    const { user } = this.props
    const { avatarName, avatarColor, name } = this.state
    return(
    <div className="selectStyle">
      <Row className="HeaderProfileContainer">
        <strong className="TitleProfileStyle">{name}</strong>
        <Avatar 
          style={{background:`${avatarColor}`}} 
          size="large" 
          className="ButtonProfileStyle"
        >
          {avatarName}
        </Avatar>
        <Button onClick={subscribeUser}>Test</Button>
      </Row>
      <Divider orientation="center" type="horizontal">Préferences</Divider>
      <PreferencesForm 
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        onColorChange={value => {
          this.props.onColorChange(value)
          this.setState({avatarColor: value})
        }}
        user={user}
      />
    </div>
    )
  }
}
const mapdispatchtoprops = {
  updateUser
}

export default connect(null, mapdispatchtoprops)(ProfilDesc)