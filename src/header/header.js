import React from 'react'

import './header.css'

const Header = props => (
	<div id="header">
		<div className="header-inner"
      style={{ justifyContent: props.appState.loggedIn ? 'space-between' : 'center' }}>
			
			{props.appState.loggedIn ? (
        <div className="header-section header-left">
          <div className="hamburger-container">

            <button
              className={'hamburger hamburger--3dx' + (props.appState.menu ? ' is-active' : '')}
              onClick={props.handleHamburger}
              type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>

          </div>
          <div className="header-text">Home</div>
        </div>
      ) : null}

			<div className="header-section header-middle">
				<a href="/">
					<h1><b>G</b>uitar <b>G</b>uides</h1>
				</a>
			</div>

      {props.appState.loggedIn ? (
        <div className="header-section header-right">

          <div className="header-search">
            <div className="header-icon">
              <i className="material-icons">search</i>
            </div>
            <div className="header-search-text">Search...</div>
          </div>

          <div className="header-account">
            <div className="header-icon">
              <i className="material-icons">account_circle</i>
            </div>
          </div>

        </div>
      ) : null}
			
		</div>
	</div>
)

export default Header