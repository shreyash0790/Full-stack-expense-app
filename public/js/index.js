const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const Totalexp = document.querySelector('#exp');
const table = document.querySelector('.table-bordered');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const amount = amountInput.value;
    const description = disInput.value;
    const category = catInput.value;
    if (amountInput.value === '' || disInput.value === '' || catInput.value === '') {
        alert("input all fields");
    } else {
        const formData = { Amount: amount, Description: description, Category: category, };
        postFormData(formData);
    }
}

async function postFormData(formData) {
    try {
        console.log(formData);
        const response = await axios.post('http://localhost:5000/AddExpense', formData);
        const user = response.data.Expense
        createListItem(user); // Create and append list item

        clearFields(); // Clear input fields
    } catch (err) {
        console.log(err);
    }
}

function createListItem(user) {
    const tr = document.createElement('tr');

    // Create cells for each column
    const amountCell = document.createElement('td');
    amountCell.textContent = user.Amount;
    amountCell.style.color = 'white'; // Example color
    amountCell.style.fontSize = '20px'; // Example font size

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = user.Description;
    descriptionCell.style.color = 'white'; // Example color
    descriptionCell.style.fontSize = '20px'; // Example font size

    const categoryCell = document.createElement('td');
    categoryCell.textContent = user.Category;
    categoryCell.style.color = 'white'; // Example color
    categoryCell.style.fontSize = '20px'; // Example font size

    const actionCell = document.createElement('td');

    // Create buttons for edit and delete actions
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-warning btn-sm small-button';
    editBtn.textContent = 'Edit';
    editBtn.style.backgroundColor = 'orange'; // Example background color
    editBtn.style.color = 'white'; // Example text color
    editBtn.addEventListener('click', async (e) => {
        // Your edit button logic here
        e.preventDefault();

        const userId = user.id;
        amountInput.value = user.Amount;
        disInput.value = user.Description;
        catInput.value = user.Category;

    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm small-button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red'; // Example background color
    deleteBtn.style.color = 'white'; // Example text color
    deleteBtn.addEventListener('click', async (e) => {
        // Your delete button logic here
        e.preventDefault();
        try {
            const userId = user.id;
            const response = await axios.delete(`http://localhost:5000/delete/${userId}`);
            console.log(response);
            tr.remove();
        } catch (error) {
            console.log(error);
        }
    });

    // Create update button
    const UpdateBtn = document.createElement('button');
    UpdateBtn.className = ' btn btn-primary btn-sm  small-button';
    UpdateBtn.textContent = 'Update';
    UpdateBtn.style.backgroundColor = 'Blue'; // Example background color
    UpdateBtn.style.color = 'white'; // Example text color

    UpdateBtn.addEventListener('click',  async(e) => {
        e.preventDefault();
        console.log("Amount:", amountInput.value);
        console.log("Description:", disInput.value);
        console.log("Category:", catInput.value);
        

        const userId = user.id;
        const updatedamount = amountInput.value;
        const updateddiscription = disInput.value;
        const updatedcategory = catInput.value;
      

        console.log("updatedamount:", updatedamount);
        console.log("updateddiscription:", updateddiscription);
        console.log("updatedcategory:", updatedcategory);

        const updatedUser = {
            id: userId,
            Amount: updatedamount,
            Description: updateddiscription,
            Category: updatedcategory
        };


        const parentRow = UpdateBtn.closest('tr');
        const cells = parentRow.cells;
        cells[0].textContent = updatedamount;
        cells[1].textContent = updateddiscription;
        cells[2].textContent = updatedcategory;


        try {

            const response = await axios.put(`http://localhost:5000/edit/${userId}`, updatedUser);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
        clearFields();
    });


    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    actionCell.appendChild(UpdateBtn);


    tr.appendChild(amountCell);
    tr.appendChild(descriptionCell);
    tr.appendChild(categoryCell);
    tr.appendChild(actionCell);

    table.appendChild(tr);
}

let totalExpenseAmount
window.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await axios.get('http://localhost:5000/GetExpense');
        const expenses = response.data.Expenses;



        // Iterate over each user and create list items
        totalExpenseAmount = 0;
        for (const expense of expenses) {
            createListItem(expense);
            totalExpenseAmount += parseFloat(expense.Amount);
            console.log(totalExpenseAmount);
        }
        const totalExpenseItem = document.createElement('h1');
        totalExpenseItem.className = "container text-center my-3  text-white";
        totalExpenseItem.textContent = `Total Expense: ${totalExpenseAmount}`;
        if (Totalexp) {
            Totalexp.appendChild(totalExpenseItem); // Append totalExpenseItem to Totalexp
        } else {
            console.log("Totalexp element not found");
        }

    } catch (err) {
        console.log(err);
    }
});

function clearFields() {
    amountInput.value = '';
    disInput.value = '';
    catInput.value = 0;
}
