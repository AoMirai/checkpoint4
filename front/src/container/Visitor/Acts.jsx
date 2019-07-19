import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchActs } from '../../actions/acts';
import Act from './Act';
import './Act.scss';

class Acts extends Component {

  componentDidMount = () =>{
    const { asyncFetchActs } = this.props;
    asyncFetchActs();
  }
  
  render() {
    const { acts } = this.props;
    return (
      <div className="Acts">
        <h3>Voici nos numéros !</h3>
        {
          acts ? acts.map(act => 
          <Act
          key={act.id}
          id={act.id}
          title={act.title}
          description={act.description}
          actArtists={act.artists ? act.artists : []}
          picture={act.picture}
        />
        ) : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  acts: state.acts.acts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchActs
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Acts);