import React from "react";

import { Button, 
         Form, 
         InputNumber, 
         Typography,
         Row, 
         Col, 
         Tooltip,
         Progress
        } from 'antd';
import { SaveOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { updateAppSettings } from "../../../store/actions/settings";

const { Paragraph, Title } = Typography;

class LimitForm extends React.Component {

  state= {
    loading: false,
    disableSubmit: true,
    limitPercent: 0,
    totalUsedDisk: 0,
  }

  componentDidMount = async () =>{
    const { appSettings } = this.props

    if(appSettings){

      const DiskData = appSettings.DiskData
      console.log("settings : ", appSettings)

      this.setState({

        limitPercent: appSettings.limitPercent,
        totalUsedDisk: appSettings.disk_used_with_limit,
        DiskData: DiskData,
      })
    }
  }

  formRef = React.createRef();


  onFieldsChange = async () =>{

    if(this.formRef.current !== null){
      const data = this.formRef.current.getFieldsValue()
      const { appSettings } = this.props

      const disk_used_with_limit = parseFloat((data.dbStorageLimit+data.storageLimitServer).toFixed(3))
      const limitPercent = parseFloat(((disk_used_with_limit*100)/appSettings.maxAllowedLimit).toFixed(3))  

      if(data.dbStorageLimit + data.storageLimitServer > appSettings.maxAllowedLimit){
        this.setState({disableSubmit: true})
      } else {
        this.setState({disableSubmit: false})
      }
     
      this.setState({
        totalUsedDisk: data.dbStorageLimit + data.storageLimitServer,
        limitPercent: limitPercent,
        maxBdd: appSettings.maxAllowedLimit - data.storageLimitServer,
      })
    }
  }

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
      limitPercent,
      totalUsedDisk,
      disableSubmit
    } = this.state
    return (
    <div>

      <Row justify="center" align="middle" style={{margin: "3em 0 1em 0"}}> 
        <Col flex="auto" style={{textAlign: "center"}}>
          <Title level={5}>Éspace disque utilisé une fois les limites atteintes</Title>
          <Progress 
            type="circle" 
            percent={limitPercent}
            format={(percent) =>{
              if(percent === 100){
                return(
                  <div style={{color: '#fa5e43'}}>
                    Limit Max !
                  </div>
                )
              } else {
                return(
                  <div>
                    {`${percent} %`}
                  </div>
                )
              }
            }}
            strokeColor={{
              '0%': '#068a06',
              '100%': '#fa5e43'
            }}
          />
          <Paragraph>
            {`${totalUsedDisk} Gio / ${appSettings.maxAllowedLimit} Gio`}
          </Paragraph>
        </Col> 
      </Row> 

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
              dbStorageLimit: appSettings ? appSettings.dbStorageLimit:0,
              storageLimitServer: appSettings ? appSettings.storageLimitServer:0,
            }}
          >
            <Form.Item
              label="Limite du stockage en BDD en Gio"
              name="dbStorageLimit"
              tooltip={{
                title: <div>
                          Limite (Gio) concernant la sauvegarde des procédures,
                          <br/>
                          logo en BDD, si cette <strong>limite est dépassée</strong>, 
                          <br/>
                          <strong>la ressources ne sera pas sauvegardée !</strong>
                       </div>, 
                icon: <QuestionCircleOutlined size={150} />, 
                color: "blue"
              }}
              rules={[{ required: true, message: "Veuillez saisire une limite!" }]}
            >
              <InputNumber
                min={1}
                style={{width:"100%"}}
                max={appSettings.maxAllowedLimit}
              />        
            </Form.Item>

            <Form.Item
              label="Limite de stockage sur le serveur en Gio"
              name="storageLimitServer"
              tooltip={{
                title: <div>
                          Limite (Gio) concernant la sauvegarde des application (.exe, .zip ... etc),
                          <br/>
                          sur le serveur, si cette <strong>limite est dépassée</strong>, 
                          <br/>
                          <strong>la ressources ne sera pas sauvegardée !</strong>
                       </div>, 
                icon: <QuestionCircleOutlined size={150} />, 
                color: "blue"
              }}
              rules={[{ required: true, message: "Veuillez saisire une limite !" }]}
            >
              <InputNumber
                style={{width:"100%"}}
                min={1}
                max={appSettings.maxAllowedLimit}
              />
             
            </Form.Item>     
          
            <Form.Item style={{textAlign: "center"}}>
              <Button 
                type="primary"  
                htmlType="submit"
                loading={loading} 
                disabled={disableSubmit}
                // style={{float:"right", marginRight:"1em"}}
                icon={<SaveOutlined />}
              >
                Modifier
              </Button>
            </Form.Item> 
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

export default connect(mapStateToProps, mapdispatchtoprops)(LimitForm)