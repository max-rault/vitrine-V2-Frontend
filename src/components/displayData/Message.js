import React from "react";
import {connect} from "react-redux"
import { Alert, Result, Avatar, Modal, Button } from "antd";
import { hideMessage, hideMessageModal } from "../../store/actions/messages";
import Sad from "../../../public/Maggy_sad-no-bg.png";
import Happy from "../../../public/Maggy_Happy-no-bg.png";
import ErrorNetwork from "./ErrorNetwork";

const maggyHappy = <img src={Happy} className="message"/>
const maggySad = <img src={Sad} className="message"/>

class Message extends React.Component {

  render() {

    const { 
      message, 
      type, 
      visible,
      msgModal,
      typeModal,
      typeMessage,
      networkError,
      subTitleModal,
      descritpion } = this.props

    console.log('message ==>', message)
    if( typeMessage === "modal"){
      if(typeModal === 'success'){
        return (
          <Result
            title={msgModal}
            subTitle={subTitleModal}
            icon={
               <Avatar icon={maggyHappy} size={100} className="MaggyHappyStyle"/>
            }
          />
        );
      } else {
        return (
          <Alert showIcon icon={maggySad} message={msgModal} type={typeModal} />
        );
      }
    } else if ( typeMessage === "container"){
      if(networkError === true){
      
        return <ErrorNetwork visible={visible} />
      } else {
      
        return (
          <Modal 
            visible={visible}
            key="diplayMessage"
            footer={[
              <Button key='buttonMessage' type="primary" onClick={this.props.hideMessage}>
                Ok
              </Button>
            ]}
            closable={false}
            destroyOnClose={true}
          >
            <Result
              title={message}
              subTitle={descritpion}
              icon={
                <Avatar
                  key="AvatarMessage"
                  icon={type === "success" ? maggyHappy:maggySad}  
                  size={100} 
                  className={type === "success" ? "MaggyHappyStyle":"MaggySadStyle"} 
                />
              }
            />
          </Modal>
        );
      }
    } else if ( typeMessage === "login"){
      return (
        <Alert 
          showIcon 
          icon={type === "success" ? maggySad:maggyHappy} 
          message={message} 
          description={descritpion} 
          type={type} />
      );
      }
  }
}

const mapdispatchtoprops = {
  hideMessage, 
  hideMessageModal,
}

function mapStateToProps(state) {
  return {
    message: state.messages.message,
    type: state.messages.type,
    descritpion: state.messages.desc,
    msgModal: state.messages.message_modal,
    typeModal: state.messages.type_modal,
    networkError: state.messages.networkError
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Message)