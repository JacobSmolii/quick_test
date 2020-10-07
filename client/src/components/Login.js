import React from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'

function Login() {
	const [input, setInput] = useState({
		name: '',
		password: ''
	})

	const changeHandler = (event) => {
		setInput({ ...input, [event.target.name]: event.target.value })
	}

	const signIn = e => {
		e.preventDefault();
		console.log(input);
		axios.post('http://localhost:5000/api/login/', input)
			.then(response => {
				console.log(response);
				localStorage.setItem('token', response.data.token)
				window.location = '/';
			})
			.catch(err => console.log(err))
	}

	const register = e => {
		console.log(input);
		e.preventDefault();

		axios.post('http://localhost:5000/api/register/', input)
			.then(response => {
				alert("Account has been created, please Sign In")
				window.location = '/';
				// console.log('wow', response);
			})
			.catch(err => {
				console.log('login', err);
			})
	}


	return (
		<div className="login">
			<div className="login_container">
				<h1>Sign In</h1>
				<form>
					<h5>Name</h5>
					<input
						type="text"
						name='name'
						value={input.name}
						onChange={changeHandler}
					/>

					<h5>Password</h5>
					<input
						type="password"
						name="password"
						value={input.password}
						onChange={changeHandler}
					/>
					<button onClick={signIn} type="submit" className="login_signInButton">Sign In</button>
				</form>

				<p>Don't have an accout</p>
				<button onClick={register} type="submit" className="login_registerButton">Create new Account</button>
			</div>
		</div>
	)
}

export default Login
