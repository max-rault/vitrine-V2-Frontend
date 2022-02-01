import React from "react";
import { Button, Modal, Avatar, Row, Col } from 'antd';
import db from "../../../utils/db";
import maggyHappy from "../../../../public/Maggy_Happy-no-bg.png"
import { connect } from "react-redux";
import { hideMessageModal } from "../../../store/actions/messages";
import { updateFirstUse } from "../../../store/actions/users";
import { hideMaggyFirstUse } from "../../../store/actions/modal";
import Message from "../../displayData/Message";

class MaggyFirstUse extends React.Component{

  onFinish = async () =>{

    const user = await db.user.get(1)
    await this.props.updateFirstUse(user.data.id)

    user.data.firstUse = "0"
    db.user.update(1, user)
    this.props.hideMessageModal()
    this.props.hideMaggyFirstUse()
  }

  componentDidMount(){
    this.props.hideMessageModal()
  }
  
  render() {
    let name = localStorage.getItem("name")
    const { visible, modalVisible } = this.props
    return(
      <Modal 
        title="Maggy à quelque chose à vous dire ...." 
        visible={modalVisible}
        
        footer={[
          <Button type="primary" onClick={() => this.onFinish()} key="maggy_button">
            ok j'ai compris !
          </Button>
        ]}
      >
        {visible ? <Message typeMessage="modal"/>:null}

        <Row>
          <Col span={10}>
            <Avatar src={maggyHappy} size={192} />
          </Col>
          <Col span={12}>
            <p>Salut {name} !</p>
            <p>
              Je m'appelle Maggy !
              <br/>
              Je serais là pour vous tout au long de l'utilisation,
              <br/>
              de cette application afin de vous informer de différents
              <br/>
              évenements, comme par exemple vous informer que votre profile est incomplet !

              <br/>
            </p>
            <p>
              le service informatique
              <br />
              vous souhaite une agréable utilisation
              <br/>
              de sa nouvel application ResIn
              <br/>
              ( Ressource Informatques ) !
            </p>
          </Col>
        </Row>
      </Modal>
    )
  } 
}

const mapdispatchtoprops = { 
  updateFirstUse, 
  hideMessageModal, 
  hideMaggyFirstUse
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible_modal,
    modalVisible: state.modal.maggyFirstUse
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(MaggyFirstUse)