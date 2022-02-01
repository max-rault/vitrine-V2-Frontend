import React from "react";
import { List } from 'antd';
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import db from "../../utils/db";


class SearchList extends React.Component{

  state = {
    data: [],
    user: {},
    load: true  
  }

  componentDidMount(){
    db.user.get(1)
    .then((user) =>{
      this.setState({
        user: user.data,
        load: false
      })
    })
    .catch((err) => console.log(err))
    this.setState({data: this.props.searchRes})
  }

  componentDidUpdate(prevProps){

    if(this.props.searchRes !== prevProps.searchRes){
      this.setState({data: this.props.searchRes})
    }  

  }

  render() {
    const { data, user, load } = this.state
    return(
      <List
        loading={load}
        itemLayout="vertical"
        dataSource={data}
        pagination={{
          pageSize: 3,
        }}
        size="large"
        renderItem={item => {
          const editVisible = user.id === item.UserId
          if(editVisible === true){
            return(
              <List.Item
                key="itemID"
                // actions={[
                //   <Link 
                //     to="project_details"
                //     key="button_action" 
                //     onClick={() =>{
                //       db.table("project").clear()
                //       db.table("project").add({ uid: 1, data : item})            
                //     }}
                //   >
                //     <EyeOutlined /> Détails
                //   </Link>,
                //   <Link
                //     visible={editVisible.toString()}
                //     to="/project_params"
                //     onClick={() =>{
                //       db.table("project").clear()
                //       db.table("project").add({ uid: 1, data : item})            
                //     }}
                //   >
                //     <EditOutlined/> Editer
                //   </Link>            
                // ]}          
              >
                <List.Item.Meta
                  title="item name"
                  description="item date"
                />
                Describe Ressource
              </List.Item>          
            )          
          } else {
            return(
              <List.Item
                key="itemID"
                // actions={[
                //   <Link 
                //     to="project_details"
                //     key="button_action" 
                //     onClick={() =>{
                //       db.table("project").clear()
                //       db.table("project").add({ uid: 1, data : item})            
                //     }}
                //   >
                //     <EyeOutlined /> Détails
                //   </Link>
                // ]}          
              >
                <List.Item.Meta
                  title="test"
                  description="date"
                />
                Description ressource
              </List.Item>               
            )
          }
        }}
      />       
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     searchRes: state.projects.searchRes,
//   }
// }

export default connect()(SearchList)