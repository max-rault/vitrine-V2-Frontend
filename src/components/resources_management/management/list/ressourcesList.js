import React from "react";
import { Table, Button, Tag, Popover, Row} from "antd";
import { Link } from "react-router-dom";
import { 
  EditOutlined,
  EyeOutlined, 
  SettingOutlined, 
  DeleteOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import DetailsList from "./DetailsList";
import db from "../../../../utils/db";

const { Column } = Table;

class RessourcesList extends React.Component {

  state = {
    load: true,
  }

 rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.props.onSelectChange(selectedRowKeys, selectedRows)
        },
        getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    }

  ContentPopOver = (props) =>{
  
    let recordArray = []
    recordArray.push(props.record)

    return(
      <div>
        <Row>
          <Button
            type="text"
            icon={props.expanded ? <EyeInvisibleOutlined />:<EyeOutlined/>}
            onClick={e => {
              props.callBack(props.record, e)
            }}
          >
          {props.expanded ? "Masquer les détails":"Afficher les Détails"}
          </Button>
        </Row>
        <Row>
          <Button
            type="text"
            onClick={() =>{
              db.table("ressource").clear()
              db.table("ressource").add({ uid: 1, data : props.record})  
            }}
          >
            <Link to='/Edit_Ressource'>
              <EditOutlined/> Éditer
            </Link>
          </Button>
        </Row>
        <Row>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => this.props.showDeleteRessources(recordArray)}
          >
            Supprimer
          </Button>
        </Row>
      </div>
    )
  }

  onChange = async page => {
    this.props.resetSelectedRow()
    
    const { getRessources } = this.props
    
    let offset = (page - 1) * 10
    
    await getRessources(offset, 10)

  };

  render() {
    const { 
      ressources, 
      currentPage,
      count } = this.props
    return (
      <Table 
        dataSource={ressources}
        style={{margin: "0 2em 0 2em"}}
        bordered
        expandable={{
          expandedRowRender: record => <DetailsList ressource={record} />,
          expandIcon: ({expanded, onExpand, record }) => {
            return(
              <Popover
                placement="right"
                trigger="hover"
                content={<this.ContentPopOver expanded={expanded} callBack={onExpand} record={record}/>}
              >
                <SettingOutlined/>
              </Popover> 
            )
          }
        }}
        rowSelection={{
          type: "checkbox",
          ...this.rowSelection,
          selectedRowKeys: this.props.rowKeys
        }}
        pagination={{
            current: currentPage, 
            onChange: this.onChange, 
            total: count, 
            pageSize: 10,
            className:"PaginationStyle"
        }}
      >
        <Column title="Nom" dataIndex="name" key="name" />
        <Column 
          title="Type de ressource" 
          dataIndex="type" 
          key="type"
          render={type =>{
            switch (type) {
              case "apps_link":
                return("Application (Liens vers site externe)")

              case "apps_file":
                return("Application (Executable)")

              case "online_service":
                return("Service en ligne")

              case "docs":
                return("Procédure")
              default:
                break;
            }
          }}
        />
        <Column 
          title="Taille" 
          dataIndex="file_size"
          key="file_size"
          defaultSortOrder='descend'
          sorter={(a, b) => a.id - b.id}
          render={size =>(
            !size ? "n/c":`${parseFloat(`${size}`).toFixed(2)} Mio`
          )}
        />
        <Column 
          title="Date de création" 
          dataIndex="createdDate" 
          key="createdDate"
          defaultSortOrder='descend'
          sorter={(a, b) => a.id - b.id}
        />
        <Column 
          title="Date de modification" 
          dataIndex="updatedDate" 
          key="updatedDate" 
          defaultSortOrder='descend'
          sorter={(a, b) => a.id - b.id}
          render={update => (
            <div>{!update ? "Aucune mise à jour":update}</div>
          )}
        />
      </Table> 
    );
  }
}

export default RessourcesList