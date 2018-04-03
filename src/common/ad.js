import React from 'react'

import './css/ad.css'

import ad1 from '../media/ads/1.jpg'

const Ad = props => {
	return (
		<div className="ad">
			<div className="ad-info">Advertisement</div>
			<img src={ad1} />
			<i className="material-icons">info</i>
		</div>
	)
}

export default Ad