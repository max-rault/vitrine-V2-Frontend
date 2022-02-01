import React from "react";
import {connect} from "react-redux"
import { hideMessage } from "../../store/actions/messages";
import MaggyThink from "../../components/displayData/MaggyThink";
import SearchList from "../../components/search/SearchList";
import Message from "../../components/displayData/Message";

const SearchListLoading = MaggyThink(SearchList)

class Search extends React.Component{

  state={
    load: true,
  }

  componentDidMount(){
    this.props.hideMessage()
    console.log('toto tata titi')

    // const { location } = this.props
    // this.props.searchProject(location.search)

    this.setState({
      load: false,
    })
  }

  componentDidUpdate(prevProps, prevState){
  
    const { location } = this.props

    if(location.search !== prevProps.location.search){

      this.setState({load: true})
      this.props.searchProject(location.search)

      this.setState({
        load: false,
      })
    }
  }

  render() {
    const { load } = this.state
    const { visible } = this.props
    return(
      <div>
        <Message visible={visible} typeMessage="container"/>
        <SearchListLoading
          isLoading={load}
        />
      </div>
    )
  }
}

const mapdispatchtoprops = {
  hideMessage
}

function mapStateToProps(state) {
  return {
    // searchRes: state.projects.searchRes,
    visible: state.messages.visible,
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Search)