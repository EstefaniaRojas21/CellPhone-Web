function addUser() {
    let username = document.getElementById("input-username").value;
    let password = document.getElementById("input-password").value;

    // Verifica si los campos están vacíos
    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    let userData = {
        user: username,
        password: password,
    };

    let url = 'http://localhost:8080/Cell/rest/ManagementUser/createUser';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json(); // Asegúrate de que el servidor responda con JSON
    })
    .then(data => {
        alert("User added successfully.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
