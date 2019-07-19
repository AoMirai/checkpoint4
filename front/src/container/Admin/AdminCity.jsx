import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { asyncFetchCity } from '../../actions/city'
import { Button } from 'reactstrap';


class AdminCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseModif: false,
      collapseAdd: false,
      name: '',
      id: 1,
    }
  }  

  toggleModif = () => {
    const { citys } = this.props;
    const { id } = this.state;
    this.setState(state => ({ collapseModif: !state.collapseModif, nameMofif : citys && citys[id - 1] ? citys[id-1].name : '' }));
  }

  toggleAdd = () => {
    this.setState(state => ({ collapseAdd: !state.collapseAdd }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitFormModif = (event) => {
    event.preventDefault();
    const { asyncFetchCity } = this.props;
    const { nameMofif, id } = this.state;
    const show = {name : nameMofif, id,}
    fetch(`http://localhost:5000/api/city/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(show)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de la modification de la ville de ${nameMofif}`, 2000);
        this.toggleModif();
        asyncFetchCity();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de la modification de la ville.", 3000);
        throw new Error();
      });
  }

  submitFormAdd = (event) => {
    event.preventDefault();
    const { asyncFetchCity } = this.props;
    const { collapseAdd, collapseModif, id, ...name } = this.state;
    fetch('http://localhost:5000/api/city', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de la ville de ${name}`, 1000);
        this.toggleAdd();
        asyncFetchCity();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de la ville.", 3000);
        throw new Error();
      });
  }

  supprCity = () => {
    const { asyncFetchCity } = this.props;
    const { id } = this.state;
    fetch(`http://localhost:5000/api/city/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        NotificationManager.success('', `Suppression de la ville `, 2000);
        asyncFetchCity();
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression de la ville", 3000);
        throw new Error();
      });
  }

  render() {
    const { citys } = this.props
    const { name, collapseModif, collapseAdd, id, nameMofif } = this.state
    return (
      <div className="AdminCity">
        <h3>Admin Villes</h3>
        <Button color="success" onClick={this.toggleAdd}>Ajouter une ville</Button>
        {
          collapseAdd ?             
          <form onSubmit={this.submitFormAdd} >
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Nom de la ville"
            onChange={this.handleChange}
          />
          <Button color="success" type="submit">Enregistrer</Button>
          <Button onClick={this.toggleAdd}>Annuler</Button>

        </form> : ''
        }
        {
          collapseModif ?
            <form onSubmit={this.submitFormModif}>
              <input
                type="text"
                id="nameMofif"
                name="nameMofif"
                value={nameMofif}
                onChange={this.handleChange}
              />
              <Button color="success" type="submit">Enregistrer</Button>
              <Button onClick={this.toggleModif}>Annuler</Button>
            </form>
            :
            <h4>
              <select name="id" id="id" onChange={this.handleChange}>
                {citys ? citys.map(city => (
                  <option key={city.id} id={city.id} value={city.id} name={city.id}>
                    {city.name}
                  </option>
                )) : ''}
              </select>
              <Button color="success" onClick={this.toggleModif}>Modifier la ville</Button>
              <Button color="danger" onClick={this.supprCity}>Supprimer la ville</Button>
            </h4>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  citys: state.citys.citys,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchCity
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminCity);