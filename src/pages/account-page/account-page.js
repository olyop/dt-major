import React from 'react'

import axios from 'axios'

import Heading from '../../common/heading'
import RaisedButton from 'material-ui/RaisedButton'

import './account-page.css'

class AccountPage extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			accountDeleteLoading: false,
			content1: true,
			content2: true,
			content3: true
		}
		
    this.deleteAccount = this.deleteAccount.bind(this)
		this.toggleContent1 = this.toggleContent1.bind(this)
		this.toggleContent2 = this.toggleContent2.bind(this)
		this.toggleContent3 = this.toggleContent3.bind(this)
	}
	
	deleteAccount() {
		this.setState(
			{ accountDeleteLoading: true },
			() => {
			
				const axiosConfig = {
					method: 'delete',
					url: `http://localhost:3001/users/${this.props.appState.account.id}`,
					headers: { 'Content-Type': 'application/json' }
				}

				axios(axiosConfig)
					.then(response => {
						this.setState({ accountDeleteLoading: false })
						this.props.logOut()
					})
					.catch(error => console.log(error))
			}
		)
  }
	
	toggleContent1() { this.setState({ content1: !this.state.content1 }) }
	toggleContent2() { this.setState({ content2: !this.state.content2 }) }
	toggleContent3() { this.setState({ content3: !this.state.content3 }) }
	
	render() {
		return (
			<div id="account-page">

				<div className="account-page-header">
					<div className="account-page-account">

						<div className="account-page-info">
							<i className="material-icons">account_circle</i>
							<div className="account-page-content">
								<h3>{`${this.props.appState.account.name} ${this.props.appState.account.surname}`}</h3>
							</div>
						</div>

						<div className="account-page-percent">
							<p>50%</p>
							<h3>Completed</h3>
						</div>

					</div>
				</div>

				<div className="container account-page-section">
					
					<div className="account-page-content">
            
						<Heading onClick={this.toggleContent1}
							active={this.state.content1}>Overview</Heading>
            
						{this.state.content1 ? (
							<div className="account-page-content account-page-overview">
                
                <div className="account-page-overview-info">
                  <b>Public ID:</b>
                  <h5>{this.props.appState.account.id}</h5>
                </div>
								
								<div className="account-page-overview-info">
                  <b>Name:</b>
                  <h5>{this.props.appState.account.name}</h5>
                </div>
                
                <div className="account-page-overview-info">
                  <b>Surname:</b>
                  <h5>{this.props.appState.account.surname}</h5>
                </div>
                
                <div className="account-page-overview-info">
                  <b>Experience:</b>
                  <h5>{this.props.globalText.accounts.expLevels[this.props.appState.account.experience]}</h5>
                </div>
                
                <div className="account-page-overview-info">
                  <b>Date Joined:</b>
                  <h5>{this.props.appState.account.dateJoined}</h5>
                </div>
                
							</div>
						) : null}
            
					</div>
					
					<div className="account-page-content">
						<Heading onClick={this.toggleContent2}
							active={this.state.content2}>Progress</Heading>
						{this.state.content2 ? (
							<div className="account-page-content account-page-progress">
								Progress
							</div>
						) : null}
					</div>
					
					<div className="account-page-content">
						<Heading onClick={this.toggleContent3}
							active={this.state.content3}>Setttings</Heading>
						{this.state.content3 ? (
							<div className="account-page-content account-page-settings">
								<RaisedButton onClick={this.deleteAccount}
                  backgroundColor="#F44336"
                  labelColor="#fff"
									disabled={this.state.accountDeleteLoading}
                  label={this.state.accountDeleteLoading ? 'Deleting...' : 'Delete Account'} />
							</div>
						) : null}
					</div>
					
				</div>

				<div className="account-page-sign-out">
					<RaisedButton onClick={this.props.logOut}
            backgroundColor="#F44336"
            labelColor="#fff"
						disabled={this.state.accountDeleteLoading}
						label="Sign Out" />
				</div>

			</div>
		)
	}
}

export default AccountPage