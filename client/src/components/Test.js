import React from 'react'
import './Test.css'

function Test({ title, image, link }) {
	return (
		<div className="test">
			<div className="test_title">
				{title}
			</div>

			<div className="test_image">
				<img onClick={link} src={image} alt="" />
			</div>
		</div>
	)
}

export default Test
