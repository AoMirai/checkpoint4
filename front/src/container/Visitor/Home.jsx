import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchActs } from '../../actions/acts';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idAct: 0,
    }
  }
  componentDidMount = () => {
    const { asyncFetchActs } = this.props;
    asyncFetchActs();
    this.boucle();
  }
  boucle = () => {
    const { idAct } = this.state
    const { acts } = this.props
    this.setState({ idAct: acts && acts[idAct + 1 ] ? idAct + 1 : 0 }, () => {
      setTimeout(() => {
        this.boucle()
      }, 3000);
    });
  };

  render() {
    const { acts } = this.props;
    const { idAct } = this.state
    return (
      <div className="Home">
        {acts && acts[idAct] ? <img src={acts[idAct].picture} alt="" /> : ''}
        <div className="bienvenue">
        <h3>Bienvenue au Wild Circus !</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione illo, cum sapiente eaque voluptate officia cumque quaerat veniam beatae quae nam autem perspiciatis perferendis veritatis repellendus aut iusto. Accusamus, consequuntur.</p>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);