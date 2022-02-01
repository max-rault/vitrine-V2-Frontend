import React from "react";

import { Button, 
         Form, 
         Select, 
         Input, 
         Row, 
         Col, 
         Checkbox,
         Switch,
        } from 'antd';
import { RightOutlined, EyeOutlined } from '@ant-design/icons';   


const { Option } = Select;

class Ressource_data extends React.Component {

  formRef = React.createRef();

  state= {
    testUrl: "https://danstonchat.com/latest.html",
    testDisabled: true
  }

  onFieldsChange = async () =>{

    if(this.formRef.current !== null){
      const data = this.formRef.current.getFieldsValue()

      if(data.link && data.link !== ""){

        this.setState({
          testUrl: data.link,
          testDisabled: false
        })

      } else {
        this.setState({testDisabled: true})
      }
    }
  }


  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {

    const { ressource, ressource_type, edit } = this.props
    const { testDisabled, testUrl } = this.state

    return (
    <div>
      <Form
        ref={this.formRef}
        className="RessourceFormStyle"
        name="NewModalForm"
        layout="vertical"
        onFinish={(values) =>{

          if(edit === true){
            this.props.onFinish(values)
          } else {
            this.props.nextStep(values)
          }

        }}
        onFinishFailed={this.onFinishFailed}
        onFieldsChange={this.onFieldsChange}
        initialValues={{
          visibility: ressource ? ressource.visibility:"Public",
          name: ressource ? ressource.name:"",
          describ: ressource ? ressource.describ:"",
          osDisponibility: ressource ? ressource.osDisponibility:[],
          is_essential: ressource ? ressource.is_essential:false,
        }}
        
      >
        <Form.Item
          label="Est essentiel ?"
          name="is_essential"
          tooltip="Permetra de mettre cette ressource en avant sur la page d'accueil dans la catégorie: les essentiels"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="Oui" 
            unCheckedChildren="Non" 
          />
        </Form.Item>

        <Form.Item
          label="Nom de la Ressource"
          name="name"
          rules={[{ required: true, message: "Veuillez saisir un nom de ressource !" }]}
        >
          <Input/> 
        </Form.Item>

        <Form.Item
          label="Visibilité"
          name="visibility"
          tooltip={
            <div>
              La visibilité détermine qui pourra voir cette ressource :
              <br/>
              Publique: Tout le monde pourra la voir (étudiants, Personnels, administrateur).
              <br/>
              Personnels: Seul les Administrateurs et le personnels pourront la voir.
              <br/>
              Administrateur: Seul le service informatique pourra la voir.
            </div>
          }
          rules={[{ required: true, message: "Veuillez séléctionner la visibilité de la ressource !" }]}
        >
          <Select>
            <Option value="Public">Publique</Option>
            <Option value="User">Personnels</Option>
            <Option value="Admin">Administrateur</Option>
          </Select>
        </Form.Item>

        { ressource_type === "link" ?
          <Form.Item
            label="Type de ressource"
            name="type"
            rules={[{ required: true, message: "Veuillez séléctionner un type de ressource !" }]}
          >
            <Select>
              <Option value="apps_link">Application</Option>
              <Option value="online_service">Service en ligne</Option>
            </Select>
          </Form.Item>
        :null}

        { ressource_type === "link" ?
          <Form.Item
            label="URL"
            name="link"
            rules={[{ 
              required: true, 
              message: "Veuillez saisir une url !", 
              type: "url"
            }]}
          >
            <Input placeholder="https://danstonchat.com/latest.html"/>
          </Form.Item>
        :null}

        { ressource_type === "apps_file" ?
          <Form.Item 
            name="osDisponibility" 
            label="OS compatible"
            rules={[{ required: true, message: "Veuillez séléctionner au moins un os compatible"}]}
          >
            <Checkbox.Group style={{width: "100%"}}>
              <Row>
                <Col flex="auto">
                  <Checkbox value="windows">Windows</Checkbox>
                </Col>
                <Col flex="auto">
                  <Checkbox value="linux">Linux</Checkbox>
                </Col>
                <Col flex="auto">
                  <Checkbox value="macOSX">Macos x</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        :null}

        <Form.Item
          label="Description"
          name="describ"
          rules={[{ required: true, message: "Veuillez saisir une description !" }]}
        >
          <Input.TextArea autoSize={{minRows: 10}}/> 
        </Form.Item>

        { ressource_type === "link" ?
          <Col flex="auto" style={{textAlign: "center"}}>
            <Button
              icon={<EyeOutlined/>}
              target="_blank"
              href={`${testUrl}`}
              disabled={testDisabled}
              // loading={loading}
              style={{marginLeft:"1em"}}
            >
              Tester le lien
            </Button>
          </Col>
        :null}
        <Col flex="auto" style={{textAlign: "end"}}>
          <Form.Item>
            <Button 
              type="primary"
              
              htmlType="submit"
            >
              suivant <RightOutlined />
            </Button>
          </Form.Item>      
        </Col>
      </Form>
    </div>
    );
  }
}

export default Ressource_data