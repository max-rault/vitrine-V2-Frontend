import React from "react";
import { Button, Modal, Row, Col, Avatar } from 'antd';
import { connect } from "react-redux";
import { deleteFeedback } from "../../../store/actions/feedback";
import maggyThink from "../../../../public/Maggy_think-no-bg.png";


class DeleteFeedback extends React.Component{

  state= {
    loading: false,
  }

  onDelete = async () =>{

    const {feedBackID, typeRes, RessourceID} = this.props

    let data = {
    
      id: feedBackID,
      RessourceID: RessourceID
    
    }

    await this.setState({loading: true})

    await this.props.deleteFeedback(data)

    if(typeRes === "success"){
    this.props.hideModal()
    }
    this.setState({
      loading: false
    })
  }

  render() {
    const { loading } = this.state
    const { modalVisible } = this.props
    return(
      <Modal 
        key="DeleteItemsModal"
        title="Un peu de ménage ..." 
        visible={modalVisible}
        onCancel={this.props.hideModal}
        footer={[
        
          <div key="buttonDiv">
            <Button 
              onClick={() => this.props.hideModal()}
            >
              Non ... 
            </Button>
            <Button 
              type="primary" 
              danger 
              loading={loading} 
              onClick={this.onDelete}
            >
              J'en suis sûr !!!
            </Button>
          </div>
        
        ]}
        destroyOnClose={true}
      >
        <Row>
          <Col span={6}>
            <Avatar src={maggyThink} size={128} />
          </Col>
          <Col span={18}>
            <div>
              Hey ! êtes vous vraiment sûr de vouloir
              <br/>
              supprimer ce commentaire ?
            </div>
          </Col>
        </Row>
      </Modal>
    )
  } 
}

const mapdispatchtoprops = { 
  deleteFeedback, 
}

function mapStateToProps(state) {
  return {
    typeRes: state.messages.type,
  }
}
export default connect(mapStateToProps, mapdispatchtoprops)(DeleteFeedback)