import React from "react";

import { Button, 
         Form, 
         Typography,
         Divider,
         Switch,
         Input,
         Row, 
         Col, 
        } from 'antd';
import { SaveOutlined, CheckOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';

import { connect } from "react-redux";
import { updateAppSettings } from "../../../store/actions/settings";
import db from "../../../utils/db";

const { Paragraph, Title } = Typography;

class TasksForm extends React.Component {

  state= {
    loading: false,
    delImagesDisabled: true,
    checkFilesDisabled: true,
    syncAdDisabled: true,
    disableSubmit: true,
  }

  componentDidMount = async () =>{
    const { appTasks } = this.props

    if(appTasks.length > 0){

      if(appTasks[0].is_active === true || appTasks[1].is_active === true || appTasks[2].is_active === true){
        this.setState({disableSubmit: false})
      }

      if(appTasks[0].is_active === true){
        this.setState({delImagesDisabled: false})
      }

      if(appTasks[1].is_active === true){
        this.setState({checkFilesDisabled: false})
      }

      if(appTasks[2].is_active === true){
        this.setState({syncAdDisabled: false})
      }
    }
  }

  formRef = React.createRef();


  onFieldsChange = async () =>{

    if(this.formRef.current !== null){
      const data = this.formRef.current.getFieldsValue()

      if(data.deleteImage === true || data.checkFiles === true || data.syncAd === true){

        this.setState({
          disableSubmit: false,
        })

        if(data.deleteImage === true){
          this.setState({delImagesDisabled: false})
        } else {
          this.setState({delImagesDisabled: true})
        }

        if(data.checkFiles === true){
          this.setState({checkFilesDisabled: false})
        } else {
          this.setState({checkFilesDisabled: true})
        }

        if(data.syncAd === true){
          this.setState({syncAdDisabled: false})
        } else {
          this.setState({syncAdDisabled: true})
        }


      } else {

        this.setState({
          disableSubmit: true,
          checkFilesDisabled: true,
          delImagesDisabled: true,
          syncAdDisabled: true
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
      appTasks, 
    } = this.props

    const { 
      loading,
      disableSubmit,
      delImagesDisabled,
      checkFilesDisabled,
      syncAdDisabled
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
            initialValues={{
              deleteImage: appTasks ? appTasks[0].is_active:false,
              checkFiles: appTasks ? appTasks[1].is_active:false,
              syncAd: appTasks ? appTasks[2].is_active:false,
              delete_images_tasks: appTasks ? appTasks[0].scheduled_time:"0 23 * * *",
              check_files_tasks: appTasks ? appTasks[1].scheduled_time:"* * * * Sunday",
              sync_ad_tasks: appTasks ? appTasks[2].scheduled_time:"* * * * Sunday",
            }}
          >   
            <Divider>Suppression des images dans le dossier public (serveur) </Divider>
            <Form.Item
              name="deleteImage"
              valuePropName="checked"
              rules={[{ required: true, message: "Veuillez activer/désactiver la tâche !" }]}
            >
              <Switch
                checkedChildren={<div><CheckOutlined /> Actif</div>}
                unCheckedChildren={<div><CloseOutlined /> Inactif</div>}
              />
            </Form.Item>

            <Form.Item
              name="delete_images_tasks"
              rules={[{ required: true, message: "Veuillez saisir une tâche !" }]}
            >
              <Input disabled={delImagesDisabled}/>
            </Form.Item>

            <Divider>Verification des fichiers orphelins</Divider>
            <Form.Item
              name="checkFiles"
              valuePropName="checked"
              rules={[{ required: true, message: "Veuillez activer/désactiver la tâche !" }]}
            >
              <Switch
                checkedChildren={<div><CheckOutlined /> Actif</div>}
                unCheckedChildren={<div><CloseOutlined /> Inactif</div>}
              />
            </Form.Item>

            <Form.Item
              name="check_files_tasks"
              rules={[{ required: true, message: "Veuillez saisir une tâche !" }]}
            >
              <Input disabled={checkFilesDisabled}/>
            </Form.Item>

            <Divider>Suppression des comptes orphelins de la BDD</Divider>
            <Form.Item
              name="syncAd"
              valuePropName="checked"
              rules={[{ required: true, message: "Veuillez activer/désactiver la tâche !" }]}
            >
              <Switch
                checkedChildren={<div><CheckOutlined /> Actif</div>}
                unCheckedChildren={<div><CloseOutlined /> Inactif</div>}
              />
            </Form.Item>

            <Form.Item
              name="sync_ad_tasks"
              rules={[{ required: true, message: "Veuillez saisir une tâche !" }]}
            >
              <Input disabled={syncAdDisabled}/>
            </Form.Item>
          
            <Row justify="center" align="middle">
              <Col flex="auto" style={{textAlign: "center"}}>
                <Form.Item noStyle>
                  <Button 
                    type="primary"  
                    htmlType="submit"
                    loading={loading} 
                    disabled={disableSubmit}
                    icon={<SaveOutlined />}
                  >
                    Modifier
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

const mapdispatchtoprops = {
  updateAppSettings
}

function mapStateToProps(state) {
  return {
    type: state.messages.type,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(TasksForm)