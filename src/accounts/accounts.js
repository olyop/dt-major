import React from 'react'

import axios from 'axios'
import moment from 'moment'
import accountTemplate from '../database/account-template'
import makeId from '../common/make-id'

import CreateAccount from './create-account'
import Loading from '../common/loading'

import './accounts.css'

class Accounts extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			newAccountScreen: false,
      accounts: null
		}
		
		this.toggleCreateAccountScreen = this.toggleCreateAccountScreen.bind(this)
    this.addAccount = this.addAccount.bind(this)
	}
	
	toggleCreateAccountScreen() {
		this.setState({ newAccountScreen: !this.state.newAccountScreen })
	}
  
	// Recieve Accounts from API
  componentDidMount() {
    axios.get('http://localhost:3001/users')
      .then(res => {
        const accounts = res.data
        this.setState({ accounts })
      })
      .catch(error => {
        console.log(error)
        this.setState({ accounts: 'error' })
      })
  }
  
  addAccount(name, surname, experience) {
		
		let newAccount = accountTemplate
		
		newAccount.id = makeId()
		newAccount.name = name
		newAccount.surname = surname
		newAccount.experience = experience
		newAccount.dateJoined = moment().format('DD/MM/YYYY')
		
    axios.post('http://localhost:3001/users', newAccount)
    	.then(response => this.setState({ accounts: this.state.accounts.concat([response.data]) }))
    	.catch(error => {
      	console.log(error)
				this.setState({ accounts: 'error' })
    	})
  }
	
	render() {
    
		// Determine and render the status of the accounts data
    let accountList
    if (this.state.accounts === null) {
      accountList = <Loading />
    } else if (this.state.accounts === 'error') {
      accountList = (
        <p>Error</p>
      )
    } else if (this.state.accounts.length === 0) {
      accountList = (
        <h5>No accounts.</h5>
      )
    } else if (this.state.accounts.length > 0) {
      accountList = this.state.accounts.map(account => (
				<div key={account.id}
					onClick={() => this.props.logIn(account)}
					className="account-list-item">
					<i className="material-icons">account_circle</i>
					<div className="account-list-item-content">
						<h2>{account.name} {account.surname	}</h2>
						<h4>{this.props.globalText.accounts.expLevels[account.experience]}</h4>
					</div>
				</div>
      ))
    }
     
		return (
			<div id="account">
				<div className="account-screen">
					
					<h1>{this.props.globalText.accounts.heading}</h1>
					<p>{this.props.globalText.accounts.subtitle}</p>
					
					{this.state.newAccountScreen ? (
						<CreateAccount
							globalText={this.props.globalText}
							toggleCreateAccountScreen={this.toggleCreateAccountScreen}
              addAccount={this.addAccount} />
					) : (
						<div className="account-list">
              
              {accountList}
							
							{Array.isArray(this.state.accounts) ? (
								<div className="account-list-item"
									onClick={this.toggleCreateAccountScreen}>
									<i className="material-icons">add</i>
									<div className="account-list-item-content">
										<h3>{this.props.globalText.accounts.addNewAccountButton}</h3>
									</div>
								</div>
							) : null}
							
						</div>
					)}
					
				</div>
			</div>
		)
	}
}

export default Accounts