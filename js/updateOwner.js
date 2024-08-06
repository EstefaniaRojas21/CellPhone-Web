let cell = "";

function loadOwner() {
    let localStorageOwner = localStorage.getItem("ownerData");
    let ownerData = JSON.parse(localStorageOwner);
    cell = ownerData.cell;

    document.getElementById("input-name-owner").value = ownerData.name;
    document.getElementById("input-lastName-owner").value = ownerData.lastName;
    document.getElementById("input-country-owner").value = ownerData.country;
    document.getElementById("input-age-owner").value = ownerData.age;
}

loadOwner();

function updateOwner() {
    let name = document.getElementById("input-name-owner").value;
    let lastName = document.getElementById("input-lastName-owner").value;
    let country = document.getElementById("input-country-owner").value;
    let age = document.getElementById("input-age-owner").value;

    let ownerData = {
        cell: cell,
        name: name,
        lastName: lastName,
        country: country,
        age: age,
    };

    let url = 'http://localhost:8080/Cell/rest/ManagementOwnerCellPhone/updateOwnerByAtribute';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ownerData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        if (response.status === 200) {
            alert("Owner updated successfully.");
            window.location.href = "./dashboard.html";
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert("Owner updated successfully.");
            window.location.href = "./dashboard.html";
        } else {
            alert("Owner not found or update failed.");
        }
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
