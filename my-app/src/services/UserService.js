
export async function getAllUsers() {

    try{
        const response = await fetch('https://localhost/api/users', {headers: {"Access-Control-Allow-Origin": "*" }});
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createUser(data) {
    const response = await fetch(`https://localhost/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}