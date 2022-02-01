import React from "react";

import { Button, 
         Form, 
         Input, 
         Row, 
         Col, 
        } from 'antd';
import { SaveOutlined,
         EyeOutlined, 
       } from '@ant-design/icons';   
import { connect } from "react-redux";
import { updateAdSettings } from "../../../store/actions/settings";


class AdSettingsForm extends React.Component {

  state= {
    loading: false,
    testDisabled: true
  }
  formRef = React.createRef();

  onFieldsChange = (values) =>{
    console.log("values: ", values)
  }  

  onFinish = async (values) =>{
    console.log(values)
  }  

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {

    const { adSettings } = this.props
    const { 
      loading, 
      testDisabled
    } = this.state

    return (
    <div>
      <Form
        ref={this.formRef}
        className="RessourceFormStyle"
        name="NewModalForm"
        layout="vertical"
        onFieldsChange={this.onFieldsChange}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        initialValues={{
          Ldap_url: adSettings ? adSettings.Ldap_url:"https://someurl:389",
          baseDNStaffUser: adSettings ? adSettings.baseDNStaffUser:"",
          baseDNStaffGroup: adSettings ? adSettings.baseDNStaffGroup:"",
          baseDNStaffGroup: adSettings ? adSettings.baseDNStaffGroup:"",
          baseDNStudentUser: adSettings ? adSettings.baseDNStudentUser:"",
          baseDNStudentGroup: adSettings ? adSettings.baseDNStudentGroup:"",
          Ldap_username: adSettings ? adSettings.Ldap_username:"",
          Ldap_pass: adSettings ? adSettings.Ldap_pass:"",
        }}
        
      >
        <Form.Item
          label="Url du LDAP"
          name="Ldap_url"
          rules={[{ required: true, message: "Veuillez saisire une url valid!" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="BaseDN Personnels et administrateur"
          name="baseDNStaffUser"
          rules={[{ required: true, message: "Veuillez saisir une OU valide !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Base DN du groupe Personnels et administrateur"
          name="baseDNStaffGroup"
          rules={[{ required: true, message: "Veuillez saisir une OU valide !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Base DN des étudiants"
          name="baseDNStudentUser"
          rules={[{ required: true, message: "Veuillez saisir une OU valide !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Base DN du groupe étudiants"
          name="baseDNStudentGroup"
          rules={[{ required: true, message: "Veuillez saisir une OU valide !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Nom d'utilisateur LDAP"
          name="Ldap_username"
          rules={[{ required: true, message: "Veuillez saisir un nom d'utilisateur !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Mots de passe du compte LDAP"
          name="Ldap_pass"
          rules={[{ required: true, message: "Veuillez saisir un mots de passe !" }]}
        >
          <Input/> 
        </Form.Item>

        
        <Row>
          <Col span={10}>
            <Form.Item noStyle>
              <Button 
                type="primary"  
                htmlType="submit"
                loading={loading} 
                style={{float:"right", marginRight:"1em"}}
                // disabled={!this.state.fieldsChange}
                icon={<SaveOutlined />}
              >
                Modifier
              </Button>
            </Form.Item>          
          </Col>
          <Col span={10}>
            <Button 
              icon={<EyeOutlined/>}
              loading={loading}
              onClick={() => this.setState({testDisabled: true})}
              disabled={testDisabled}
              style={{marginLeft:"1em"}}
            >
              Téster
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
    );
  }
}

const mapdispatchtoprops = {
  updateAdSettings
}

function mapStateToProps(state) {
  return {
    adSettings: state.settings.adSettings
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(AdSettingsForm)