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
				console.log(data.gamerTag)
				setUser(data)
			} catch (error) {
				console.error('Error!!!: ', error);
			}
		}
		console.log(user);
		getUser();
	});

	

	return (
		<>
			<h1>Profile</h1>
			<h2>{user.gamerTag}</h2>
		<h3>Placeholder-GamerTag</h3>
		<h3>Placeholder-Games played</h3>
			<h3>{user.wins}</h3>
		</>
		
	)
}

export default Profile;