import React from "react";
import { Form, Input, Button } from "antd";
import {connect} from "react-redux"
import { authLogin, isAuth } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import session from "../../utils/session";
import db from "../../utils/db";
import Message from "../../components/displayData/Message";

export class Login extends React.Component {
  state = {
    redirect : false,
  }

  componentDidMount = async () =>{

   try {
      const isAuth = await session.isAuth(localStorage.getItem('token'))
      const sessionTimed = await session.check(24, localStorage.getItem('timesession'))

      if(isAuth === false || sessionTimed === true){
        await db.open()
        await db.delete()
        await db.open()
      } else {
        this.setState({redirect: true})
      }
    } catch (error) {
      console.log('error ======> ', error)
    }

  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onFinish = values =>{
    if (!values.userName || values.userName.length === 0) {
      return;
    }
    if (!values.password || values.password.length === 0) {
      return;
    }
    this.send(values)
  }

  send = async values => {
  
    await this.props.authLogin(values.userName, values.password)
    const { user, userSession, authSuccess } = this.props

      if(authSuccess === true){

        localStorage.setItem("token", userSession.token)
        localStorage.setItem("timesession", userSession.timesession)

        await db.table('user')
        .put(user, [0])
        
        this.setState({
          redirect: true,
        })
      }
  };
 
  render() {
    if(this.state.redirect === true){
      return <Redirect to={ `/home`}/>
    }

    if(this.props.user_IsAuth === true){
      return <Redirect to={`/home`} />
    }

    const { visible } = this.props

    return (
       <div className="Login">
       {visible ? <Message typeMessage="login"/>:null}
        <Form
          
          name="basic"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
        <Form.Item
          className="LoginFeilds"
          label="nom d'utilisateur"
          name="userName"
          rules={[{ required: true, message: "Veuillez saisir un nom d'utilisateur !" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="LoginFeilds"
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: 'Veuillez saisir un mot de passe !' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="LoginButtonContainer" >
          <Button type="primary" htmlType="submit" className="LoginButton">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
     </div>
    );
  }
}

const mapdispatchtoprops = {
  authLogin, 
  isAuth, 
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userSession: state.auth.userSession,
    authSuccess: state.auth.authSuccess,
    visible: state.messages.visible,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Login)