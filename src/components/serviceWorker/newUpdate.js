import React from "react";
import { Drawer, Avatar, Button, Row, Result } from "antd";
import { connect } from 'react-redux';
import { setNewUpdate } from "../../store/actions/serviceWorker";
import Happy from "../../../public/Maggy_Happy-no-bg.png"

const maggyHappy = <img src={Happy}/>

class NewUpdate extends React.Component {

  update = async () =>{
    await setNewUpdate(false)
    window.location.reload()
  }
 
  render() {
    const { visible } = this.props
    return (
      <div>
        <Drawer
          placement="right"
          width={700}
          visible={visible}
          closable={false}
          destroyOnClose={true}
        >
          <Row className="CenterRow">
            <Result
              title="Il y a une nouvelle mise à jour !!!!"
              icon={
                <Avatar icon={maggyHappy} size={225} className="MaggyHappyStyle"/>
              }
            />
          </Row>
          <Row className="CenterRow">
            <Button
              size="middle"
              type="primary"
              onClick={() => this.update()}
            >
              Mettre à jour
            </Button>
          </Row>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible: state.sw.newUpdate
  }
}

const mapdispatchtoprops = {
  setNewUpdate
}

export default connect(mapStateToProps, mapdispatchtoprops)(NewUpdate)