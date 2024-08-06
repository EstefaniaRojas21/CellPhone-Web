function addCellPhone() {
    let id = document.getElementById("input-id-cellPhone").value;
    let model = document.getElementById("input-model-cellPhone").value;
    let cellPhoneNumber = document.getElementById("input-cellPhoneNumber-cellPhone").value;
    let memory = document.getElementById("input-memory-cellPhone").value;
    let color = document.getElementById("input-color-cellPhone").value;
    let cellPhoneData = {
        id: id,
        model: model,
        cellPhoneNumber: cellPhoneNumber,
        memory: memory,
        color: color,
    };

    let url = 'http://localhost:8080/Cell/rest/ManagementCellPhone/createCell';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cellPhoneData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Cell phone added successfully.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
