import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchShow } from '../../actions/show';
import Show from './Show';
import './Show.scss'

class Shows extends Component {

  componentDidMount = () => {
    const { asyncFetchShow } = this.props
    asyncFetchShow();
  }

  render() {
    const { shows } = this.props
    return (
      <div className="Shows">
          <h3 className="title">Représentations</h3>
          <div className="tribune">

          <img src="https://static.ticketmaster.fr/static/images/plans/m_466892.gif" alt="" />
          <table class="price">
            <thead>
              <th class="bot">Place</th><th class="top">Prix</th>
              <th>Adulte</th>
              <th>Enfant<br></br> </th>
              <th>Groupe de + de<br></br>10 personnes</th>
            </thead>
            <tbody>
              <tr>
                <th colspan={2} class="btop">Familiale</th>
                <td>10€</td>
                <td>7€</td>
                <td>7.5€</td>
              </tr>
              <tr>
                <th colspan={2} class="btop">Honneur</th>
                <td>15€</td>
                <td>10.50€</td>
                <td>9€</td>
              </tr>
              <tr>
                <th colspan={2} class="btop">Privilège</th>
                <td>20€</td>
                <td>14€</td>
                <td>15€</td>
              </tr>
              <tr>
                <th colspan={2} class="btop">Loges</th>
                <td>25€</td>
                <td>17.50€</td>
                <td>18.75€</td>
              </tr>
            </tbody>
          </table>
          </div>
          {shows ? shows.map(show =>
            <Show
              key={show.id}
              id={show.id}
              city={show.city}
              date={show.date}
              id_city={show.id_city}
            />
          ) : ''}
      
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  shows: state.shows.shows,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchShow,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Shows)
