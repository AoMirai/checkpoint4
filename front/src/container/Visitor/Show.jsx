import React, { Component } from 'react';
import { Button } from 'reactstrap';


class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      adult: 0,
      child: 0,
      tribune: 'Familiale',
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { city, date } = this.props;
    const { collapse, adult, child, tribune } = this.state;
    const more10 = ((Number(adult) + Number(child)) >= 10);
    let price = 0;
    if (!more10) {
      switch (tribune) {
        case 'Familiale':
          price = (Number(adult) * 10) + (Number(child) * 7);
          break;
        case 'Honneur' :
          price = (Number(adult) * 15) + (Number(child) * 10.50);
          break;
        case 'Privilège' :
          price = (Number(adult) * 20) + (Number(child) * 14);
          break;
        case 'Loges' :
          price = (Number(adult) * 25) + (Number(child) * 17.50);
          break;
        default:
          break;
      }
    } else {
      switch (tribune) {
        case 'Familiale':
          price = (Number(adult) + Number(child)) * 7.5;
          break;
        case 'Honneur' :
            price = (Number(adult) + Number(child)) * 11.25;
          break;
        case 'Privilège' :
            price = (Number(adult) + Number(child)) * 15;
          break;
        case 'Loges' :
            price = (Number(adult) + Number(child)) * 18.75;
          break;
        default:
          break;
      }
    }
    return (
      <div className="Show">
            <div className="title">
            <h4>
              {city}
              {' '}
              {date}
            </h4>
              <Button color="success" onClick={this.toggle}>Réserver</Button>
            </div>
        {
          collapse ?
            <div className="reserver">
              <form>
              <label htmlFor="tribune">Tribune :
              <select name="tribune" id="tribune" onChange={this.handleChange}>
                <option value="Familiale">Familiale</option>
                <option value="Honneur">Honneur</option>
                <option value="Privilège">Privilège</option>
                <option value="Loges">Loges</option>
              </select>
              </label>
              <label htmlFor="adult">Adulte
              <input
                type="number"
                id="adult"
                name="adult"
                value={adult}
                onChange={this.handleChange}
              />
              </label>
              <label htmlFor="child">Enfants
              <input
                type="number"
                id="child"
                name="child"
                value={child}
                onChange={this.handleChange}
              />
              </label>
            </form>
            Prix : {price} €
            </div>
            :
            ''
        }
      </div>
    )
  }
}

export default Show;