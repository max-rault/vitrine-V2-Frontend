import React from "react";

import { Button, 
         Form, 
         Row, 
         Col, 
         Upload,
         Progress,
        } from 'antd';
import { LeftOutlined,
         RightOutlined,
         InboxOutlined,
       } from '@ant-design/icons';   


class Files_upload extends React.Component {

  state= {
    logoList: [],
    fileList: [],
    appList: [],
  }

  formRef = React.createRef();

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

    const { 
      ressource, 
      edit,
      ressource_type,
      percent_doc, 
      percent_file, 
      uploadingApp, 
      uploadingDoc } = this.props

    return (
    <div>
      <Form
        ref={this.formRef}
        className="RessourceFormStyle"
        name="NewModalForm"
        layout="vertical"
        onFinish={(values) =>{

          if(values.doc_associated){

            values.have_doc = true

          }

          if(edit === true){
            this.props.onFinish(values)
          } else {
            this.props.nextStep(values)
          }
        }}
        onFinishFailed={this.onFinishFailed}
      >
        <Row align="middle" justify='center'>

          { ressource_type === "apps_file" ?

            <Col flex="auto">
              <Form.Item
                label="Fichier"
                name="file"
                rules={[{required: true, message: "veuillez uploader une application"}]}
                valuePropName="fileList"
                getValueFromEvent={this.normItem}
              >
                <Upload.Dragger
                  listType="picture"
                  accept=".exe,.7z,.dmg,.gz,.iso,.jar,.rar,.tar,.zip"
                  name="file"
                  maxCount={1}
                  beforeUpload={ file => {
                    this.setState(state => ({
                      fileList: [...state.fileList, file],
                      appList: [file]
                    }));
                      return false;
                    }
                  }
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Cliquez ou faites glisser le fichier dans cette zone pour le téléverser</p>
                </Upload.Dragger>
              </Form.Item>
              {uploadingApp ? 
                <Row>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    percent={percent_file}
                  />
                </Row>: null}
            </Col>
          :null}

          { ressource_type === "apps_file" && edit === true ?
            null:
            <Col flex="auto">
              <Form.Item
                label={ressource_type === "apps_file" ? "Procédure associée":"Procédure"}
                name="doc_associated"
                valuePropName="fileList"
                rules={ressource_type === "docs" ? [{required: true, message: "veuillez uploader une application"}] :null}
                getValueFromEvent={this.normItem}
              >
                <Upload.Dragger
                  listType="picture"
                  accept=".pdf"
                  name="docs"
                  maxCount={1}
                  beforeUpload={ file => {
                    this.setState(state => ({
                      fileList: [...state.fileList, file],
                    }));
                    return false;
                  }
                }
                >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou faites glisser le PDF dans cette zone pour le téléverser</p>
                </Upload.Dragger>
              </Form.Item>
              {uploadingDoc ?
                <Row>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    percent={percent_doc}
                  />
                </Row>: null}              
            </Col>
          }
          
        </Row>
      
        <Row>
          <Col flex="auto" style={{textAlign: "start"}}>
            <Button 
              icon={<LeftOutlined/>}
              onClick={() => this.props.prevStep()}
            >
              Précedent
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
    </div>
    );
  }
}

export default Files_upload