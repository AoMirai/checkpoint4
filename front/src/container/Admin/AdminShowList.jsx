import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { bindActionCreators } from 'redux';
import { asyncFetchShow } from '../../actions/show';
import { asyncFetchCity } from '../../actions/city';
import AdminShow from './AdminShow';
import AdminCity from './AdminCity';
import { Button } from 'reactstrap';
import './AdminShow.scss'

class AdminShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      id_city: '',
      date: ''
    }
  }

  componentDidMount = () => {
    const { asyncFetchShow, asyncFetchCity } = this.props
    asyncFetchShow();
    asyncFetchCity();
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitFormShow = (event) => {
    event.preventDefault();
    const { asyncFetchShow } = this.props;
    const { collapse, ...show } = this.state;
    fetch('http://localhost:5000/api/show', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(show)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement du numéro ${show.title}`, 1000);
        this.toggle();
        this.setState({ id_city: '', date: '' })
        asyncFetchShow();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement du numéro.", 3000);
        throw new Error();
      });
  }

  render() {
    const { collapse, date } = this.state
    const { citys, shows } = this.props
    return (
      <div className="AdminShowList">
        <div className="AdminActList">
          <h3 className="title">Admin Représentations </h3>
          <Button color="success" onClick={this.toggle}>Ajouter une représentation</Button>
          {collapse ?
            <form onSubmit={this.submitFormShow}>
              <select name="id_city" id="id_city" onChange={this.handleChange}>
                {citys ? citys.map(city => (
                  <option key={city.id} id={city.id} value={city.id} name={city.id}>
                    {city.name}
                  </option>
                )): ''}
              </select>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={this.handleChange}
              />
              <Button color="success" type="submit">Enregistrer</Button>
              <Button onClick={this.toggle}>Annuler</Button>
            </form>
            : ''
          }

          
          
          {shows ? shows.map(show =>
            <AdminShow
              key={show.id}
              id={show.id}
              city={show.city}
              date={show.date}
              id_city={show.id_city}
            />
          ): ''}
          
          <AdminCity/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shows: state.shows.shows,
  citys: state.citys.citys,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchShow, asyncFetchCity
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminShowList)
