import React from "react";
import { Drawer } from "antd";
import {connect} from "react-redux"
import { hideMessage } from "../../store/actions/messages";

class NetworkError extends React.Component{

  render() {
    const {visible} = this.props
    return(
        <div className="UserInfoStyle">
          <Drawer
            title="Problème réseau"
            placement="right"
            width={700}
            onClose={() => this.props.hideMessage()}
            visible={visible}
            key="right"
          >
            test
          </Drawer>
        </div>
    );
  }
}

const mapdispatchtoprops = {
  hideMessage,
}

// function mapStateToProps(state) {
//   return {
//     visible: state.modal.email
//   }
// }

export default connect(null, mapdispatchtoprops)(NetworkError)