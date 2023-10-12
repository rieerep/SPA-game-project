import React, { useState } from 'react';



function Profile() {

	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const response = await fetch('/api/profile/', { method: 'GET' });
			const data = await response.json();
			setUser(data.user)
			console.log("user is: ", user)
		} catch (error) {
			console.error('Error!!!: ', error);
		}

		return <h2>{user}</h2>
	}

	return (
		<>
			<h1>Profile</h1>
			<h2>{getUser}</h2>
		<h3>Placeholder-GamerTag</h3>
		<h3>Placeholder-Games played</h3>
		<h3>Placeholder-Wins</h3>
		</>
		
	)
}

export default Profile;