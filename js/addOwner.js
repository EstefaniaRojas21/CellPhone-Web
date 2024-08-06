function addOwner() {
    let documento = document.getElementById("input-document-owner").value;
    let name = document.getElementById("input-name-owner").value;
    let lastName = document.getElementById("input-lastName-owner").value;
    let country = document.getElementById("input-country-owner").value;
    let age = document.getElementById("input-age-owner").value;
    let cell = document.getElementById("input-cell-owner").value;

    if (!documento || !name || !lastName || !country || !age || !cell) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let ownerData = {
        name: name,
        lastName: lastName,
        document: documento,
        country: country,
        age: age,
        cell: cell,
    };

    let url = 'http://localhost:8080/Cell/rest/ManagementOwnerCellPhone/createOwner';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ownerData)
    })
    .then(response => {
        console.log("Fetch response: ", response);
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data: ", data);
        if (data) {
            alert("Propietario añadido exitosamente.");
        } else {
            alert("No se pudo añadir el propietario. El celular podría no estar disponible o ya asignado.");
        }
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
    
}
