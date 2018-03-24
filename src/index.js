// Import React
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

// Import Functions
import axios from 'axios'
import pull from 'lodash/pull'
import includes from 'lodash/includes'

 // eslint-disable-next-line
import accountTemplate from './database/account-template'
 // eslint-disable-next-line
import createAdminAccount from './functions/create-admin-account'

// Import Data
import IMPORT_globalText from './database/global-text'
import IMPORT_scalesDatabase from './database/scales-database'
import IMPORT_theoryDatabase from './database/theory-database'

// Import Pages
import Header from './header/header'
import Menu from './menu/menu'
import Accounts from './accounts/accounts'
import Search from './search/search'
import Help from './help/help'
import Testing from './pages/testing/testing'
import Home from './pages/home/home'
import Guitar from './pages/guitar/guitar'
import Bass from './pages/bass/bass'
import Theory from './pages/theory/theory'
import AccountPage from './pages/account-page/account-page'

// Import Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter, Route } from 'react-router-dom'

// Import CSS
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './header/hamburger/hamburgers.min.css'
import './index.css'

// Root Index Component
class Index extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			account: createAdminAccount(accountTemplate),
//      account: null,
			menu: false
		}
		
		this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
		this.handleHamburger = this.handleHamburger.bind(this)
    this.updateProgressChords = this.updateProgressChords.bind(this)
	}
	
	// Account Functions
	logIn(account) { this.setState({ account }) } 
  logOut() { this.setState({ account: null }) }
  
	// Handle Navigation Menu
	handleHamburger() { this.setState({ menu: !this.state.menu }) }
  
  // Progress Functions
  updateProgressChords(chordId) {
    
    const config = {
      method: 'put',
      url: `http://localhost:3001/users/${this.state.account.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: this.state.accoudnt
    }
    
    if (includes(config.data.progress.guitar.chords, chordId)) {
      config.data.progress.guitar.chords = pull(config.data.progress.guitar.chords, chordId)
    } else {
      config.data.progress.guitar.chords.push(chordId)
    }
    
    axios(config)
      .then(response => this.setState({ account: response.data }) )
      .catch(error => console.log(error))
  }
	
	render() {
    
		const appState = this.state
		const globalText = this.props.globalText
		
		// Check if account is logged in
		let isAccountLoggedIn
		if (appState.account === null) {
			isAccountLoggedIn = false
		} else if (typeof appState.account === 'object') {
			isAccountLoggedIn = true
		}
		
		return (
			<BrowserRouter>
        <MuiThemeProvider>
          <div id="index">

            <Header appState={appState}
							globalText={globalText}
							isAccountLoggedIn={isAccountLoggedIn}
              handleHamburger={this.handleHamburger} />

            {appState.menu ? (
              <Menu appState={appState}
								globalText={globalText}
								handleHamburger={this.handleHamburger} />
            ) : null}

            {isAccountLoggedIn ? (
              <div id="content">
							
								<Route path="/" exact
									render={ ({ match, location }) => {
										
										return (
											<Home location={location} />
										)
									}} />
								
								<Route path="/account" exact render={ () => (
                  <AccountPage appState={appState}
										globalText={globalText}
                    logOut={this.logOut}
                    deleteAccount={this.deleteAccount} />		
                )} />
								
								<Route path="/testing" exact render={ () => (
									<Testing appState={appState}
										globalText={globalText} />
								)} />
                
                <Route path="/help" exact render={ () => (
                  <Help appState={appState}
                    globalText={globalText} />
                )} />
                
                <Route path="/search" exact render={ () => (
                  <Search appState={appState}
                    globalText={globalText} />
                )} />
								
								<Route path="/guitar" render={ ({ match }) => (
                  <Guitar match={match}
										appState={appState}
										globalText={globalText}
										scalesData={this.props.scalesData}
                    theoryData={this.props.theoryData}
                    updateProgressChords={this.updateProgressChords} />		
                )} />
								
								<Route path="/bass" exact render={ () => (
                  <Bass appState={appState}
										globalText={globalText} />		
                )} />
								
								<Route path="/theory" exact render={ () => (
                  <Theory appState={appState}
										globalText={globalText} />		
                )} />
							
							</div>
            ) : (
							<Accounts appState={appState}
								globalText={globalText}
								logIn={this.logIn} />
						)}

          </div>
        </MuiThemeProvider>
      </BrowserRouter>
		)
	}
}

ReactDOM.render(
	<Index globalText={IMPORT_globalText}
		scalesData={IMPORT_scalesDatabase}
    theoryData={IMPORT_theoryDatabase} />,
	document.getElementById('root')
)

registerServiceWorker()