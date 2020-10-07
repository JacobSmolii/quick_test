import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Test from './Test'
import './Home.css'

function Home() {
	const [data, setData] = useState([])

	useEffect(() => {
		axiosWithAuth()
			.get('/api/tests')
			.then(response => {
				setData(response.data)
			})
			.catch(err => console.log('home', err))
	}, [])

	// console.log(data)

	return (
		<div className="home">
			<h1>Welcome to Quiz</h1>
			<div className="home_row">

				< Test
					id="1"
					title="Physics"
					image="https://soyuzmash.ru/upload/iblock/ac4/ac49bf3af819c461500677ab18d7a934.jpeg"
					link={() => window.location = '/physics'}
				/>




				< Test
					id="2"
					title="Maths"
					image="https://scx2.b-cdn.net/gfx/news/hires/2019/howtoovercom.jpg"
					link={() => window.location = '/math'}
				/>


				< Test
					id="3"
					title="Astronomy"
					image="https://skyandtelescope.org/wp-content/uploads/Solar-system-NASA_S-630x338.jpg"
					link={() => window.location = '/astronomy'}
				/>

			</div>
			<div className="score">
				<div className="first">
					<p>You passed this quiz {data.physicsCounter} times</p>
					<p>{data.physicsLastTest}</p>
				</div>
				<div className="second">
					<p>You passed this quiz {data.mathCounter} times</p>
					<p>{data.mathLastTest}</p>
				</div>
				<div className="third">
					<p>You passed this quiz {data.astronomyCounter} times</p>
					<p>{data.astronomyLastTest}</p>
				</div>
			</div>
		</div>
	)
}

export default Home
