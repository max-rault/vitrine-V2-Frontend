import React from "react";

import { Button, 
         Form, 
         Modal,
         Rate, 
         Input } from 'antd';

import { LikeOutlined } from '@ant-design/icons';

import { connect } from "react-redux";
import { postFeedback, updateFeedBack } from "../../../store/actions/feedback";

class Feedback extends React.Component{

  state= {
    loading: false,
    prevName: !this.props.project ? '':this.props.project.name 
  }
  
  formRef = React.createRef();



  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onFinish = async values =>{

    const { id, typeRes, postFeedback, hideFeedBack, userID, feedBack, updateFeedBack } = this.props

    const data = {
      id: id,
      title: values.title,
      feedback: values.feedback,
      rate: values.rate,
      userID: userID
    }

    if(feedBack){

      await updateFeedBack(data)

    } else {

      await postFeedback(data)

    }

    if(typeRes === "Success"){
      this.formRef.current.resetFields()
      hideFeedBack()
    }
  }

  render() {
    const { loading } = this.state
    const { visible, hideFeedBack, feedBack } = this.props
    return(
      <Modal 
        key="PostFeedbackModal"
        title="Un petit commentaire ..." 
        centered
        visible={visible}
        onCancel={hideFeedBack}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          ref={this.formRef}
          name="NewModalForm"
          layout="vertical"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          initialValues={{
            rate: feedBack ? feedBack.rate:0,
            title: feedBack ? feedBack.title:'',
            feedback: feedBack ? feedBack.text: ''
          }}
        >
          <Form.Item
            label="Note"
            name="rate"
            hasFeedback
            rules={[{ required: true, message: "Veuillez donner une note !" }]}
          >
            <Rate/> 
          </Form.Item>
          <Form.Item
            label="Titre du commentaire"
            name="title"
            hasFeedback
            rules={[{ required: true, message: "Veuillez saisir un titre pour votre commentaire !" }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Commentaire"
            name="feedback"
            hasFeedback
            rules={[{ required: true, message: "Veuillez saisir une description !" }]}
          >
            <Input.TextArea/> 
          </Form.Item>
          <Form.Item  className="ButtonProjectForm">
            <Button 
              type="primary"  
              htmlType="submit"
              style={{margin: "2em"}}
              loading={loading} 
              icon={<LikeOutlined />}
            >
              Publier
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  } 
}

const mapdispatchtoprops = { 
  postFeedback,
  updateFeedBack
}

function mapStateToProps(state) {
  return {
    typeRes: state.messages.type,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Feedback)