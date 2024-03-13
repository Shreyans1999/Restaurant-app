const apiUrl = 'https://crudcrud.com/api/628cc0b3079a43fa9371e3bf572329d0/rest';

function addToBill() {
    const price = document.getElementById('price').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;

    const item = { price, dish, table };

    axios.post(apiUrl, item)
        .then(() => {
            // Add item to table orders
            const tableOrdersList = document.getElementById(`${table}`);
            const li = document.createElement('li');
            li.textContent = `${price} - ${table} - ${dish}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteItem(item._id, li);
            });
            li.appendChild(deleteBtn);
            tableOrdersList.appendChild(li);
        })
        .catch(error => console.error('Error adding item:', error));
}

function deleteItem(itemId, itemElement) {
    axios.delete(`${apiUrl}/${itemId}`)
        .then(() => {
            itemElement.remove();
        })
        .catch(error => console.error('Error deleting item:', error));
}

// Load existing items from CRUD CRUD
axios.get(apiUrl)
    .then(response => {
        response.data.forEach(item => {
            const tableOrdersList = document.getElementById(`${item.table}`);
            const li = document.createElement('li');
            li.textContent = `${item.price} - ${item.table} - ${item.dish}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteItem(item._id, li);
            });
            li.appendChild(deleteBtn);
            tableOrdersList.appendChild(li);
        });
    })
    .catch(error => console.error('Error loading items:', error));
