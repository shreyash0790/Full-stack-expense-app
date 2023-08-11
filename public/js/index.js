const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const Totalexp = document.querySelector('#exp');
const table = document.querySelector('.table-bordered');

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
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:5000/AddExpense', formData, {
        headers: {
          "Authorization": token
        }
      });
  
      const user = response.data.Expense;
      createListItem(user);
      clearFields();
    } catch (err) {
      console.log(err);
    }
  }

function createListItem(user) {
    const tr = document.createElement('tr');

  
    const amountCell = document.createElement('td');
    amountCell.textContent = user.Amount;
    amountCell.style.color = 'white'; 
    amountCell.style.fontSize = '15px'; 

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = user.Description;
    descriptionCell.style.color = 'white'; 
    descriptionCell.style.fontSize = '15px'; 

    const categoryCell = document.createElement('td');
    categoryCell.textContent = user.Category;
    categoryCell.style.color = 'white'; 
    categoryCell.style.fontSize = '15px'; 

    const actionCell = document.createElement('td');

   
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-warning btn-sm small-button';
    editBtn.textContent = 'Edit';
    editBtn.style.backgroundColor = 'orange'; 
    editBtn.style.color = 'white'; 
    editBtn.addEventListener('click', async (e) => {
       
        e.preventDefault();

        const userId = user.id;
        amountInput.value = user.Amount;
        disInput.value = user.Description;
        catInput.value = user.Category;

    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm small-button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red'; 
    deleteBtn.style.color = 'white'; 
    deleteBtn.addEventListener('click', async (e) => {
       
        e.preventDefault();
        try {
            const userId = user.id;
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/delete/${userId}`, {
              headers: {
                "Authorization": token
              }
            });

            console.log(response);
            tr.remove();
        } catch (error) {
            console.log(error);
        }
    });


    const UpdateBtn = document.createElement('button');
    UpdateBtn.className = ' btn btn-primary btn-sm  small-button';
    UpdateBtn.textContent = 'Update';
    UpdateBtn.style.backgroundColor = 'Blue';
    UpdateBtn.style.color = 'white'; 

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

            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/edit/${userId}`, updatedUser, {
              headers: {
                "Authorization": token
              }
            });
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
        const token=localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/GetExpense', {headers:{"Authorization":token}});
        const expenses = response.data.Expenses;



        totalExpenseAmount = 0;
        for (const expense of expenses) {
            createListItem(expense);
            totalExpenseAmount += parseFloat(expense.Amount);
        }
        const totalExpenseItem = document.createElement('h1');
        totalExpenseItem.className = "container text-center my-3  text-white";
        totalExpenseItem.textContent = `Total Expense: ${totalExpenseAmount}`;
        if (Totalexp) {
            Totalexp.appendChild(totalExpenseItem); 
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

 document.getElementById('razorPay').onClick=async function(e){
    const token=localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/Purchase/BuyPremium', {headers:{"Authorization":token}});
    console.log(response);

    var options={
       "key": response.data.key_id,
       "order_id":response.data.order.id,
       "handler": async function (response){
        await axios.post('http://localhost:5000/Purchase/UpdateTransctionStat',
       { order_id: options.order_id,
        payment_id:response.razorpay_payment_id},

         {headers:{"Authorization":token}})
        alert('You are a Premium User now !')
       },
    };

const rzp1= new Razorpay(options)
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed',function(response){
    alert('Transaction failed!');
});

}

