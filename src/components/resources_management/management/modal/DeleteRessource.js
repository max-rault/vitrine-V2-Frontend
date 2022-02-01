import React from "react";
import { Button, Modal, Row, Col, Avatar, Typography } from 'antd';
import { connect } from "react-redux";
import { deleteRessources } from "../../../../store/actions/ressources";
import { hideDeleteRessources } from "../../../../store/actions/modal";
import maggyThink from "../../../../../public/Maggy_think-no-bg.png";


class DeleteRessource extends React.Component{

  state= {
    loading: false,
    itemTypeText: '',
    items: [{name: 'tests', key:1}, {name: 'test 2', key:2}]
  }

  componentDidUpdate(prevProps, prevState){
  
    if(this.props.itemArray !== prevProps.itemArray){
      if(this.props.itemArray.length === 1){
    
        var text = `la ressource suivante ? :`
    
        this.setState({
          itemTypeText: text,
          items: this.props.itemArray
        })
    
      } else {
        var text = `les ressources suivantes ? :`

        this.setState({
          itemTypeText: text,
          items: this.props.itemArray
        })
      }
    }
  }

  onDelete = async () =>{

    const {itemArray, currentPage, ressources, count} = this.props
    let data = {}
    const offset = (currentPage - 1)*10

    await this.setState({loading: true})
    let itemIdsArray = []

    if(itemArray){

      await itemArray.forEach(item => {
        itemIdsArray.push(item.id)
      });

      
      data = {
        itemIDS: itemIdsArray,
        item: itemArray,
        offset: offset,
        ressourcesLength: ressources.length,
        currentPage: currentPage,
        count: count
      }
      await this.props.deleteRessources(data)

      if(this.props.typeRes === "success"){
        this.props.hideDeleteRessources()
      }
    }
    this.setState({
      loading: false
    })
  }

  render() {
    const { loading, name, itemTypeText, items } = this.state
    const { modalVisible } = this.props
    return(
      <Modal 
        key="DeleteItemsModal"
        title="Un peu de ménage ..." 
        visible={modalVisible}
        onCancel={this.props.hideDeleteRessources}
        footer={[
        
          <div key="buttonDiv">
            <Button 
              onClick={() => this.props.hideDeleteRessources()}
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
              Hey {name} êtes vous vraiment sûr de vouloir
              <br/>
              supprimer {itemTypeText} {items.map(item =>(
                <Typography key={item.key}> - {item.name}</Typography>
              ))} 
            </div>
          </Col>
        </Row>
      </Modal>
    )
  } 
}

const mapdispatchtoprops = { 
  deleteRessources, 
  hideDeleteRessources,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible_modal,
    typeRes: state.messages.type,
    currentPage: state.ressources.page,
    ressources: state.ressources.list,
    modalVisible: state.modal.deleteRessources,
    count: state.ressources.count,
    itemArray: state.modal.itemArray,
  }
}
export default connect(mapStateToProps, mapdispatchtoprops)(DeleteRessource)