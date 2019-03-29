import React from 'react'
import diskun from './images/diskun.png'

const goToGithub = () => {
  window.location.href = 'https://github.com/a-n-d-r-3-w/ping-pong-ladder'
}

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isRulesShowing: false,
    }
    this.handleToggleRulesButtonClick = this.handleToggleRulesButtonClick.bind(this);
  }

  handleToggleRulesButtonClick () {
    this.setState(state => ({ isRulesShowing: !state.isRulesShowing }));
  }

  render() {
    return (
      <div style={{ marginBottom: '1em' }}>
        <h1 style={{ margin: '1em 0', textAlign: 'center' }}>
          <img src={diskun} alt="diskun" />
          Ping-Pong Ladder
        </h1>
        <button
          className="btn btn-sm btn-link"
          onClick={this.handleToggleRulesButtonClick}
        >
          {this.state.isRulesShowing ? 'Hide' : 'Show'} rules
        </button>
        <button
          className="btn btn-sm btn-link"
          onClick={goToGithub}
          style={{ marginLeft: "2em" }}
        >
          Github
        </button>
        {
          this.state.isRulesShowing &&
          <ul style={{margin: '1em 0'}}>
            <li>Any player/team can challenge a player/team <em>within 5 rungs above</em> them on the ladder.</li>
            <li>These challenges generally should not or can not be declined.</li>
            <li>If the lower-placed player/team wins the match, then the two players/teams swap places on the ladder.</li>
            <li>
              If the lower-placed player/team loses, then they may not challenge the same player/team again without
              challenging a different player/team first.
            </li>
            <li>Have fun!</li>
          </ul>
        }
      </div>
    )
  }
}

export default Header
