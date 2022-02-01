import React from "react";

import { Button, 
         Form, 
         Typography,
         Row, 
         Col, 
         Upload,
         Progress
        } from 'antd';
import { SaveOutlined, InboxOutlined, EyeOutlined } from '@ant-design/icons';

import { connect } from "react-redux";
import { updateAppSettings } from "../../../store/actions/settings";
import db from "../../../utils/db";

const { Paragraph, Title } = Typography;

function getBase64(file) {
  let src = file.url
  
  if(!src){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  } else {
    return src
  }
}

class ImageForm extends React.Component {

  state= {
    loading: false,
    logoList: [],
    data: {},
    backgroundList: [],
    fileList: [],
    disableSubmit: true,
    previewDisabled: true,
  }

  componentDidMount = async () =>{
    const { appSettings } = this.props

    if(appSettings){


      const backgroundList = [{
        uid: '-1',
        name: appSettings.default_background_name,
        status: 'done',
        url: appSettings.defaultBackground,
        thumbUrl: appSettings.defaultBackground
      }]

      const logoList  = [{
        uid: '-1',
        name: appSettings.default_logo_name,
        status: 'done',
        url: appSettings.defaultLogo,
        thumbUrl: appSettings.defaultLogo
      }]

      this.formRef.current.setFieldsValue({
        logo: logoList,
        background: backgroundList
      })

      const data = this.formRef.current.getFieldsValue()
      const logo = await getBase64(logoList[0])
      data.logo = logo

      const background = await getBase64(backgroundList[0])
      data.background = background
      this.setState({
        logoList: logoList,
        backgroundList: backgroundList,
        data: data,
        previewDisabled: false,
      })

    }
  }

  formRef = React.createRef();


  onFieldsChange = async () =>{

    if(this.formRef.current !== null){
      const data = this.formRef.current.getFieldsValue()
      if(data.logo.length > 0 && data.background.length > 0){

        try {

          if(data.logo[0].uid !== "-1"){

              if(data.background[0].uid === "-1"){

                const background = await getBase64(data.background[0])
                data.background = background

              } else {
                const background = await getBase64(data.background[0].originFileObj)
                data.background = background
              }

              const logo = await getBase64(data.logo[0].originFileObj)
              data.logo = logo       

          } else if(data.background[0].uid !== "-1"){

              if(data.logo[0].uid === "-1"){

                const logo = await getBase64(data.logo[0])
                data.logo = logo

              } else {
                const logo = await getBase64(data.logo[0].originFileObj)
                data.logo = logo
              }
  
              const background = await getBase64(data.background[0].originFileObj)
              data.background = background
          }  
          this.setState({
            previewDisabled: false,
            disableSubmit: false,
            data: data
          })
 
        } catch (error) {
          console.log(error)
          this.setState({
            previewDisabled: true,
            disableSubmit: true
          })
        }
      
      } else {
        this.setState({
          previewDisabled: true,
          data: data,
          disableSubmit: true
        })
      }      
    }
  }

  normItem = (e) => {
    console.log('Upload logo event:', e);
      if (Array.isArray(e)) {
        return e;
      }
        return e && e.fileList;
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onFinish = (values) =>{
    console.log(values)
  }
  render() {

    const { 
      appSettings, 
    } = this.props

    const { 
      loading,
      disableSubmit,
      previewDisabled,
      data
    } = this.state

    return (
    <div>

      <Row align="middle" justify="center">
        <Col flex="auto">
          <Form
            ref={this.formRef}
            className="RessourceFormStyle"
            name="NewModalForm"
            layout="vertical"
            onFieldsChange={this.onFieldsChange}
            onFinish={this.onFinish}
            
          >   

            <Row justify="center" align="middle">
              <Col flex="auto">

                <Form.Item label="Arrière plan par défaut">
                  <Form.Item name="background" valuePropName="fileList" getValueFromEvent={this.normItem} noStyle>
                    <Upload.Dragger
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      name="image"
                      maxCount={1}
                      beforeUpload={ file => {
                        this.setState(state => ({
                            fileList: [...state.fileList, file],
                            backgroundList: [file]
                          }));
                          return false;
                        }
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Cliquez ou faites glisser l'image dans cette zone pour la téléverser</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>

              </Col>
              <Col flex="auto">

                <Form.Item label="Logo par défaut">
                  <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={this.normItem} noStyle>
                    <Upload.Dragger
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      name="image"
                      maxCount={1}
                      beforeUpload={ file => {
                        this.setState(state => ({
                            fileList: [...state.fileList, file],
                            logoList: [file]
                          }));
                          return false;
                        }
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Cliquez ou faites glisser l'image dans cette zone pour la téléverser</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>

              
              </Col>
            </Row>
          
            <Row justify="center" align="middle">
              <Col flex="auto" style={{textAlign: "end"}}>
                <Form.Item noStyle>
                  <Button 
                    type="primary"  
                    htmlType="submit"
                    loading={loading} 
                    style={{marginRight: "2em"}}
                    disabled={disableSubmit}
                    icon={<SaveOutlined />}
                  >
                    Modifier
                  </Button>
                </Form.Item>          
              </Col>
              <Col flex="auto" style={{textAlign: "start"}}>
                <Button 
                  icon={<EyeOutlined/>}
                  loading={loading}
                  style={{marginLeft: "2em"}}
                  target="_blank"
                  href="/fake_details"
                  onClick={() => {
                    db.table("defaultImage").clear()
                    db.table("defaultImage").add({ id: 1, data: data})  

                  }}
                  disabled={previewDisabled}
                >
                    Prévisualiser
                </Button>
              </Col>
            </Row>

          </Form>        
        </Col>      
      </Row>
    </div>
    );
  }
}

const mapdispatchtoprops = {
  updateAppSettings
}

function mapStateToProps(state) {
  return {
    type: state.messages.type,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(ImageForm)