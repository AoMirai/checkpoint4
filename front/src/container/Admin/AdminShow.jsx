import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { asyncFetchShow } from '../../actions/show'
import { Button } from 'reactstrap';


class AdminShow extends Component {
  constructor(props) {
    super(props);
    const { city, date, id_city } = this.props
    this.state = {
      collapse: false,
      city,
      date,
      id_city,
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { asyncFetchShow, id } = this.props;
    const { collapse, city, ...show } = this.state;
    fetch(`http://localhost:5000/api/show/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(show)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de la modification de la représentation`, 2000);
        this.toggle();
        asyncFetchShow();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de la modification de la représentation.", 3000);
        throw new Error();
      });
  }

  supprShow = () => {
    const { asyncFetchShow, id } = this.props;
    fetch(`http://localhost:5000/api/show/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        NotificationManager.success('', `Suppression de la représentation `, 2000);
        this.toggle();
        asyncFetchShow();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression de la représentation", 3000);
        throw new Error();
      });
  }

  render() {
    const { citys } = this.props
    const { city, date, collapse, id_city } = this.state
    return (
      <div className="AdminShow">
        {
          collapse ?
            <form   className="modif" onSubmit={this.submitForm}>
              <select name="id_city" id="id_city" onChange={this.handleChange} defaultValue={id_city}>
                {citys.map(city => (
                  <option key={city.id} id={city.id} value={city.id} name={city.id}>
                    {city.name}
                  </option>
                ))}
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
            :
            <h4>
              {city}
              {' '}
              {date}
            </h4>
        }
            <div className="modif" >
              <Button color="success" onClick={this.toggle}>Modifier la représentation</Button>
              <Button color="danger" onClick={this.supprShow}>Supprimer la représentation</Button>
            </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  citys: state.citys.citys,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchShow
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminShow);