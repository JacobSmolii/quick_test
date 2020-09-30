import React from 'react'
import './Login.css'
import { useState } from 'react'

function Login() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const signIn = e => {
		e.preventDefaul();

	}

	const register = e => {
		e.preventDefaul();

	}


	return (
		<div className="login">
			<div className="login_container">
				<h1>Sign In</h1>
				<form>
					<h5>Name</h5>
					<input
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
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
