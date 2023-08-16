const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
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

    const dateCell = document.createElement('td');
    dateCell.textContent = '';
   
    dateCell.style.fontSize = '15px'; 
    dateCell.style.backgroundColor = 'skyblue';
   dateCell.style.fontWeight = 'bold';

  
    const amountCell = document.createElement('td');
    amountCell.textContent = user.Amount;
    amountCell.style.color = 'black'; 
    amountCell.style.fontSize = '15px'; 
    amountCell.style.backgroundColor = 'skyblue';
    amountCell.style.fontWeight = 'bold';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = user.Description;
    descriptionCell.style.color = 'black'; 
    descriptionCell.style.fontSize = '15px'; 
   descriptionCell.style.backgroundColor = 'skyblue';
  descriptionCell.style.fontWeight = 'bold';

    const categoryCell = document.createElement('td');
    categoryCell.textContent = user.Category;
    categoryCell.style.color = 'black'; 
    categoryCell.style.fontSize = '15px'; 
    categoryCell.style.backgroundColor = 'skyblue';
   categoryCell.style.fontWeight = 'bold';

   const incomeCell = document.createElement('td');
    incomeCell.style.backgroundColor = 'skyblue';

    const actionCell = document.createElement('td');
    actionCell.style.backgroundColor = 'skyblue';

   
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

            if (response.status === 200) {
              tr.remove(); // Remove the row from the table
          }
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

    tr.appendChild(dateCell);
    tr.appendChild(amountCell);
    tr.appendChild(descriptionCell);
    tr.appendChild(categoryCell);
    tr.appendChild(incomeCell);
    tr.appendChild(actionCell);

    table.appendChild(tr);
}


window.addEventListener('DOMContentLoaded', async () => {

    try {
        const token=localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/GetExpense', {headers:{"Authorization":token}});
        const expenses = response.data.Expenses;

        for (const expense of expenses) {
            createListItem(expense);
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
 document.getElementById('razorPay').onclick=async function(e){
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
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/Purchase/getUsers', { headers: { "Authorization": token } });
    console.log(response.data);
    
    const isPremiumUser = response.data.isPremiumUser;
    const Username=response.data.Username
  
    // Select the button element
    const razorPayButton = document.getElementById('razorPay');
    const LoginButton = document.getElementById('login-btn');
    const LogOutButton = document.getElementById('logOut-btn');
    const leaderButton = document.getElementById('leader-b');
    const DownloadButton = document.getElementById('Download-b');
  
    // Update button text based on premium status
    if (isPremiumUser) {
      razorPayButton.textContent = 'Premium User';
          razorPayButton.disabled = true;
            
          leaderButton.textContent='Show Leader Board';
          DownloadButton.textContent='Download';

    } else {
      razorPayButton.textContent = 'Buy Premium';
      razorPayButton.disabled = false;
      leaderButton.disabled=true;
      DownloadButton.disabled=true;
    }
    // Update button text based on premium status
    if (Username) {
        LoginButton.textContent = ` User:${Username}`;
            LoginButton.disabled = true;
            LogOutButton.textContent = 'Log Out';

      } else {
       LoginButton.textContent = 'Login';
       LoginButton.disabled = false;
       LogOutButton.textContent = "";
      }


    
  });




  document.getElementById('leader-b').onclick=async function(e){
    const token=localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/Premium/getleader', {headers:{"Authorization":token}});
  console.log(response)
       

  const leaderList = document.getElementById('leader');

    // Clear any previous list items
    leaderList.innerHTML = '';
    leaderList.style.display = 'none';
    

    response.data.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${entry.Name}: ${entry.TotalExpense} Rs` ;
        leaderList.appendChild(li);
        leaderList.style.display = 'block';
    });
  }







