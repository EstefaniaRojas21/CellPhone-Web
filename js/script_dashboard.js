document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.getElementById('button-cellPhone').addEventListener('click', function(event) {
        event.preventDefault();
        loadCellPhone();
    });

    document.getElementById('button-owner').addEventListener('click', function(event) {
        event.preventDefault();
        loadOwners();
    });

    document.getElementById('button-user').addEventListener('click', function(event) {
        event.preventDefault();
        loadUsers();
    });

    loadCellPhone(); // Asegúrate de llamar a loadCellPhone solo después de que el DOM esté listo
});

function loadCellPhone() {
    const content = document.getElementById('content');
    content.innerHTML = ""; // Limpiar contenido antes de agregar nuevos elementos

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addCellPhone.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resources/icons/addCellPhone.png';

    imgAdd.style.width = '80px';
    imgAdd.style.height = '80px';

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Add a new cell phone!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/Cell/rest/ManagementCellPhone/getCells')
        .then(response => response.json())
        .then((data) => {
            data.forEach(cellPhone => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const id = document.createElement('h2');
                id.className = 'card-title';
                id.textContent = `ID: ${cellPhone.id}`;

                const model = document.createElement('p');
                model.className = 'card-text';
                model.textContent = `Model: ${cellPhone.model}`;

                const cellPhoneNumber = document.createElement('p');
                cellPhoneNumber.className = 'card-text';
                cellPhoneNumber.textContent = `Cell Phone Number: ${cellPhone.cellPhoneNumber}`;

                const memory = document.createElement('p');
                memory.className = 'card-text';
                memory.textContent = `Memory: ${cellPhone.memory}`;

                const color = document.createElement('p');
                color.className = 'card-text';
                color.textContent = `Color: ${cellPhone.color}`;

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.id = `btn-delete-${cellPhone.id}`;
                btnDelete.textContent = 'Delete';
                btnDelete.setAttribute('data-code', cellPhone.id);

                btnDelete.addEventListener('click', function() {
                    const cellPhoneId = this.getAttribute('data-code');
                    deleteCellPhoneById(cellPhoneId);
                });

                const btnUpdate = document.createElement('a');
                btnUpdate.className = 'btn btn-success margin';
                btnUpdate.id = `btn-update-${cellPhone.id}`;
                btnUpdate.textContent = 'Update';

                btnUpdate.addEventListener('click', function() {
                    localStorage.setItem("cellPhoneData", JSON.stringify(cellPhone));
                    window.location.href = "./updateCellPhone.html";
                });

                cardBody.appendChild(id);
                cardBody.appendChild(model);
                cardBody.appendChild(cellPhoneNumber);
                cardBody.appendChild(memory);
                cardBody.appendChild(color);
                cardBody.appendChild(btnDelete);
                cardBody.appendChild(btnUpdate);

                card.appendChild(cardBody);
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}

function cleanContent() {
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteCellPhoneById(id) {
    let url = 'http://localhost:8080/Cell/rest/ManagementCellPhone/deleteCell?code=' + id;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Cell phone deleted");
        cleanContent();
        loadCellPhone();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}

function loadUsers() {
    const content = document.getElementById('content');
    content.innerHTML = ""; 

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addUser.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resources/icons/addUser.png';

    imgAdd.style.width = '80px';
    imgAdd.style.height = '80px';

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Add a new user!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/Cell/rest/ManagementUser/getUsers')
        .then(response => response.json())
        .then((data) => {
            data.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const userName = document.createElement('p');
                userName.className = 'card-text';
                userName.textContent = `UserName: ${user.user}`;

                const password = document.createElement('p');
                password.className = 'card-text';
                password.textContent = `Password: ***********`;

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.id = `btn-delete-${user.user}`;
                btnDelete.textContent = 'Delete';
                btnDelete.setAttribute('data-user', user.user);

                btnDelete.addEventListener('click', function() {
                    const userName = this.getAttribute('data-user');
                    deleteUserByUserName(userName);
                });

                cardBody.appendChild(userName);
                cardBody.appendChild(password);
                cardBody.appendChild(btnDelete);

                card.appendChild(cardBody);
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteUserByUserName(userName) {
    let url = 'http://localhost:8080/Cell/rest/ManagementUser/deleteUser?user=' + userName;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("User deleted");
        cleanContent();
        loadUsers();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}

function loadOwners() {
    const content = document.getElementById('content');
    content.innerHTML = ""; 

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addOwner.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resources/icons/addOwner.png';

    imgAdd.style.width = '80px';
    imgAdd.style.height = '80px';

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Add a new owner!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/Cell/rest/ManagementOwnerCellPhone/getOwners')
        .then(response => response.json())
        .then((data) => {
            data.forEach(owner => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const ownerDocument = document.createElement('p');
                ownerDocument.className = 'card-title';
                ownerDocument.textContent = `Document owner: ${owner.document}`;

                const name = document.createElement('p');
                name.className = 'card-text';
                name.textContent = `Name: ${owner.name}`;

                const lastName = document.createElement('p');
                lastName.className = 'card-text';
                lastName.textContent = `Last name: ${owner.lastName}`;

                const country = document.createElement('p');
                country.className = 'card-text';
                country.textContent = `Country: ${owner.country}`;

                const age = document.createElement('p');
                age.className = 'card-text';
                age.textContent = `Age: ${owner.age}`;

                const cell = document.createElement('p');
                cell.className = 'card-text';
                cell.textContent = `Cell: ${owner.cell}`;

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.id = `btn-delete-${owner.document}`;
                btnDelete.textContent = 'Delete';
                btnDelete.setAttribute('data-code', owner.document);

                btnDelete.addEventListener('click', function() {
                    const document = this.getAttribute('data-code');
                    deleteOwnerByDocument(document);
                });

                const btnUpdate = document.createElement('a');
                btnUpdate.className = 'btn btn-success margin';
                btnUpdate.id = `btn-update-${owner.document}`;
                btnUpdate.textContent = 'Update';

                btnUpdate.addEventListener('click', function() {
                    localStorage.setItem("OwnerData", JSON.stringify(owner));
                    window.location.href = "./updateOwner.html";
                });

                cardBody.appendChild(ownerDocument);
                cardBody.appendChild(name);
                cardBody.appendChild(lastName);
                cardBody.appendChild(country);
                cardBody.appendChild(age);
                cardBody.appendChild(cell);
                cardBody.appendChild(btnDelete);
                cardBody.appendChild(btnUpdate);

                card.appendChild(cardBody);
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteOwnerById(ownerId) {
    let url = 'http://localhost:8080/Cell/rest/ManagementOwnerCellPhone/deleteOwner?ownerId=' + ownerId;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Owner deleted");
        cleanContent();
        loadOwners();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
