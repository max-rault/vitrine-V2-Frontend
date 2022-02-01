import React from "react";

import { Button, 
         Form, 
         Row, 
         Col, 
         Upload,
         Progress
        } from 'antd';
import { LeftOutlined, RightOutlined, InboxOutlined, EyeOutlined } from '@ant-design/icons';

import db from "../../../../utils/db"

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

class Page_layout extends React.Component {

  state= {
    loading: false,
    logoList: [],
    data: {},
    backgroundList: [],
    fileList: [],
    disableSubmit: true,
    previewDisabled: true,
  }

  // componentDidMount = async () =>{
  //   const { ressource } = this.props

  //   if(ressource){


  //     const backgroundList = [{
  //       uid: '-1',
  //       name: ressource.background_name,
  //       status: 'done',
  //       url: ressource.background,
  //       thumbUrl: ressource.background
  //     }]

  //     const logoList  = [{
  //       uid: '-1',
  //       name: ressource.logo_name,
  //       status: 'done',
  //       url: ressource.logo,
  //       thumbUrl: ressource.logo
  //     }]

  //     this.formRef.current.setFieldsValue({
  //       logo: logoList,
  //       background: backgroundList
  //     })

  //     const data = this.formRef.current.getFieldsValue()
  //     const logo = await getBase64(logoList[0])
  //     data.logo = logo

  //     const background = await getBase64(backgroundList[0])
  //     data.background = background
  //     this.setState({
  //       logoList: logoList,
  //       backgroundList: backgroundList,
  //       data: data,
  //       previewDisabled: false,
  //     })

  //   }
  // }

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

  render() {

    const { edit } = this.props
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
            onFinish={(values) => {
            
              if(edit === true){
                this.props.onFinish(values)
              } else {
                this.props.nextStep(values)
              }
  
            }}
            initialValues={{
              logo: [],
              background: [],
            }}
            
          >   

            <Row justify="center" align="middle">
              <Col flex="auto">

                <Form.Item label="Arrière plan">
                  <Form.Item name="background" valuePropName="fileList" getValueFromEvent={this.normItem} noStyle>
                    <Upload.Dragger
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      name="images"
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

                <Form.Item label="Logo">
                  <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={this.normItem} noStyle>
                    <Upload.Dragger
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      name="images"
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
              <Col flex="auto" style={{textAlign: "start"}}>
                <Form.Item noStyle>
                  <Button 
                    onClick={() => this.props.prevStep()}
                    icon={<LeftOutlined />}
                  >
                    Précedent
                  </Button>
                </Form.Item>          
              </Col>
              
              <Col flex="auto" style={{textAlign: "center"}}>
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
              <Col flex="auto" style={{textAlign: "end"}}>
                <Form.Item noStyle>
                  <Button 
                    type="primary"  
                    htmlType="submit"
                  >
                    Suivant <RightOutlined />
                  </Button>
                </Form.Item>          
              </Col>
            </Row>

          </Form>        
        </Col>      
      </Row>
    </div>
    );
  }
}

export default Page_layout