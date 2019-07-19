import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchActs } from '../../actions/acts';


class Act extends Component {
  componentDidMount = () => {
    asyncFetchActs()
  }

  render() {
    const { title, description, picture, actArtists } = this.props;
    return (
      <div className="Act" style={{ backgroundImage: `url(${picture})`, backgroundSize: 'cover', backgroundPosition: '50% 10%'}}>
        <div className="artist">
          {' Artistes : '}
          {actArtists ?
            actArtists.map(artist => artist.fullname).join(', ')
            : ''
          }
        </div>
        <div className="title">
          <h4>
            {title}
          </h4>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  acts: state.acts.acts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchActs
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Act);