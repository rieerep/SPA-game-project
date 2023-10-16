import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';



function Profile() {

	const [user, setUser] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const token = await authService.getAccessToken();
				const response = await fetch('/api/profile', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				const data = await response.json();
				setUser(data)
			} catch (error) {
				console.error('Error!!!: ', error);
			}
		}
		console.log(user);
		getUser();
	},[]);

	

	return (
		<>
			<h1>User: {user.gamerTag}</h1>
			<h2>Stats</h2>
			<h3>Games played: {user.gamesPlayed}</h3>
			<h3>Wins: {user.wins}</h3>
			<h3>Losses: {user.losses}</h3>

		</>
		
	)
}

export default Profile;