const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const incomeInput = document.getElementById('Income');
const tableDaily = document.getElementById('DailyEx')
const tableMonthly = document.getElementById('MonthlyEx')

const razorPayButton = document.getElementById('razorPay');
const LoginButton = document.getElementById('login-btn');
const LogOutButton = document.getElementById('logOut-btn');
const leaderButton = document.getElementById('leader-b');
const DownloadButton = document.getElementById('Download-b');
const DownloadButtonold = document.getElementById('Download-old');
const pagination=document.getElementById('pagination');

myForm.addEventListener('submit', onSubmit);



function onSubmit(e) {
  e.preventDefault();
  const amount = amountInput.value;
  const description = disInput.value;
  const category = catInput.value;
  const Income = incomeInput.value
  if (amountInput.value === '' || disInput.value === '' || catInput.value === '') {
    alert("input all fields");
  } else {
    const formData = { Amount: amount, Description: description, Category: category, Income: Income };
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

const monthlyRows = {};
async function createListItem(user) {

  
  const trd = document.createElement('tr');
  const trm = document.createElement('tr');

  


  //daily expense.....>

  const dateCell = document.createElement('td');
  const createdAt = new Date(user.createdAt); // Convert createdAt string to Date object
  const formattedDate = createdAt.toLocaleDateString();
  dateCell.textContent = formattedDate;
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
  incomeCell.textContent = user.Income;
  incomeCell.style.color = 'black';
  incomeCell.style.fontSize = '15px';
  incomeCell.style.backgroundColor = 'skyblue';
  incomeCell.style.fontWeight = 'bold';


  const actionCell = document.createElement('td');
  actionCell.style.backgroundColor = 'skyblue';


  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-warning btn-sm small-button';
  editBtn.textContent = 'Edit';
  editBtn.style.backgroundColor = 'orange';
  editBtn.style.color = 'white';
  editBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    amountInput.value = user.Amount;
    disInput.value = user.Description;
    catInput.value = user.Category;
    incomeInput.value = user.Income;

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

  UpdateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Amount:", amountInput.value);
    console.log("Description:", disInput.value);
    console.log("Category:", catInput.value);


    const userId = user.id;
    const updatedamount = amountInput.value;
    const updateddiscription = disInput.value;
    const updatedcategory = catInput.value;
    const updatedIncome = incomeInput.value;

    const updatedUser = {
      id: userId,
      Amount: updatedamount,
      Description: updateddiscription,
      Category: updatedcategory,
      Income:updatedIncome
    };


    const parentRow = UpdateBtn.closest('tr');
    const cells = parentRow.cells;
    cells[1].textContent = updatedamount;
    cells[2].textContent = updateddiscription;
    cells[3].textContent = updatedcategory;
    cells[4].textContent = updatedIncome;


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


  //monthly expense....>>>
  const Monthcell = document.createElement('td')
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[createdAt.getMonth()];
  const year = createdAt.getFullYear(); // Get the year from the date
  Monthcell.textContent = `${monthName} /${year}`;
  Monthcell.style.color = 'black';
  Monthcell.style.fontSize = '15px';
  Monthcell.style.backgroundColor = 'skyblue';
  Monthcell.style.fontWeight = 'bold';

  const TotalExpensecell = document.createElement('td')
  const monthIndex = createdAt.getMonth() + 1;
  const { totalExpense, totalIncome, totalSavings } = await calculateTotal(monthIndex);
 
  TotalExpensecell.textContent = totalExpense
  TotalExpensecell.style.color = 'black';
  TotalExpensecell.style.fontSize = '15px';
  TotalExpensecell.style.backgroundColor = 'skyblue';
  TotalExpensecell.style.fontWeight = 'bold';

  const Savingscell = document.createElement('td')
  Savingscell.textContent = totalSavings;
  Savingscell.style.color = 'black';
  Savingscell.style.fontSize = '15px';
  Savingscell.style.backgroundColor = 'skyblue';
  Savingscell.style.fontWeight = 'bold';

  const totalIncomecell = document.createElement('td')
  totalIncomecell.textContent = totalIncome;
  totalIncomecell.style.color = 'black';
  totalIncomecell.style.fontSize = '15px';
  totalIncomecell.style.backgroundColor = 'skyblue';
  totalIncomecell.style.fontWeight = 'bold';

  //....>

  actionCell.appendChild(editBtn);
  actionCell.appendChild(deleteBtn);
  actionCell.appendChild(UpdateBtn);

  trd.appendChild(dateCell);
  trd.appendChild(amountCell);
  trd.appendChild(descriptionCell);
  trd.appendChild(categoryCell);
  trd.appendChild(incomeCell);
  trd.appendChild(actionCell);

  const monthIdentifier = `${year}-${monthIndex.toString().padStart(2, '0')}`;

  if (!monthlyRows[monthIdentifier]) {
    // Create a new row for this month.
    const trm = document.createElement('tr');
    // ... create cells and content as you did before ...
    trm.appendChild(Monthcell);
    trm.appendChild(TotalExpensecell);
    trm.appendChild(totalIncomecell);
    trm.appendChild(Savingscell);

    // Add the new row to the tableMonthly and the data structure.
    tableMonthly.appendChild(trm);
    monthlyRows[monthIdentifier] = trm;
  } else {
    // Update the content of the existing row for this month.
    const existingRow = monthlyRows[monthIdentifier];
    // Update the cell contents as needed...
    existingRow.cells[1].textContent = totalExpense;
    existingRow.cells[2].textContent = totalIncome;
    existingRow.cells[3].textContent = totalSavings;
  }




  tableDaily.appendChild(trd);
  tableMonthly.appendChild(trm);



}
async function calculateTotal(month) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/GetExpense', { headers: { "Authorization": token } });
    const expenses = response.data.Expenses;
    let totalExpense = 0;
    let totalIncome = 0;
   

    for (const expense of expenses) {
      const createdAt = new Date(expense.createdAt);//converting date string to object 
      if (createdAt.getMonth() + 1 === month) { // Adding 1 because getMonth() returns 0-based index
        totalExpense +=  expense.Amount;
        totalIncome +=  expense.Income;
      }
    }
    const totalSavings = totalIncome - totalExpense;



    return { totalExpense, totalIncome, totalSavings };
     
  } catch {
    console.log(err)

  }
}
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const applyItemsPerPageBtn = document.getElementById('applyItemsPerPage');

applyItemsPerPageBtn.addEventListener('click', () => {
  const selectedItemsPerPage = parseInt(itemsPerPageSelect.value);
  localStorage.setItem('itemsPerPage', selectedItemsPerPage);
  console.log(localStorage.getItem('itemsPerPage'))
  getExpenses(1,localStorage.getItem('itemsPerPage'));
});

  window.addEventListener('DOMContentLoaded',  () => {
    if (!localStorage.getItem('itemsPerPage')) {
      localStorage.setItem('itemsPerPage', '4');
      getExpenses(1,4)
    }
    else{
    getExpenses(1,localStorage.getItem('itemsPerPage'));
    }

  });


async function getExpenses(page,itemsPerPage) {
  try {
    const token = localStorage.getItem('token');
 
    const response = await axios.get(`http://localhost:5000/GetExpense?page=${page}&itemsPerPage=${itemsPerPage}`, { headers: { "Authorization": token } });
    const expenses = response.data.Expenses;
    const pagedata = response.data.pagedata;
    console.log(pagedata);
    tableDaily.innerHTML = ''

    for (const expense of expenses) {
      createListItem(expense);
    }
    showpagination(pagedata);
  } catch (err) {
    console.log(err);
  }
}


function showpagination({
  currentPage,
  previousPage,
  nextPage,
  haspreviousPage,
  hasnextPage,
}) {
  pagination.innerHTML = '';

  if (haspreviousPage) {
    const pagebtn0 = createPageButton(previousPage);
    pagination.appendChild(pagebtn0);
  }

  const pagebtn1 = createPageButton(currentPage);
  pagination.appendChild(pagebtn1);

  if (hasnextPage) {
    const pagebtn2 = createPageButton(nextPage);
    pagination.appendChild(pagebtn2);
  }
}

function createPageButton(pageNumber) {
  const pageButton = document.createElement('button');
  pageButton.textContent = `${pageNumber}`;
  pageButton.className = 'btn btn-primary btn-sm small-button';
  pageButton.style.marginRight = '10px';
  pageButton.addEventListener('click', () => getExpenses(pageNumber));
  return pageButton;
}

function clearFields() {
  amountInput.value = '';
  disInput.value = '';
  catInput.value = 0;
  incomeInput.value = '';
}
document.getElementById('razorPay').onclick = async function (e) {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/Purchase/BuyPremium', { headers: { "Authorization": token } });
  console.log(response);

  var options = {
    "key": response.data.key_id,
    "order_id": response.data.order.id,
    "handler": async function (response) {
      await axios.post('http://localhost:5000/Purchase/UpdateTransctionStat',
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id
        },

        { headers: { "Authorization": token } })


      alert('You are a Premium User now !')


    },
  };

  const rzp1 = new Razorpay(options)
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response) {
    alert('Transaction failed!');
  });

}
document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/Purchase/getUsers', { headers: { "Authorization": token } });


  const isPremiumUser = response.data.isPremiumUser;
  const Username = response.data.Username

  // Select the button element


  // Update button text based on premium status
  if (isPremiumUser) {
    razorPayButton.textContent = 'Premium User';
    razorPayButton.disabled = true;

    leaderButton.textContent = 'Show Leader Board';
    DownloadButton.textContent = 'Download Report';
    DownloadButtonold.textContent='Show Old Reports'

  } else {
    razorPayButton.textContent = 'Buy Premium';
    razorPayButton.disabled = false;
    leaderButton.disabled = true;
    DownloadButton.disabled = true;
    DownloadButtonold.disabled=true;
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




document.getElementById('leader-b').onclick = async function (e) {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/Premium/getleader', { headers: { "Authorization": token } });



  const leaderList = document.getElementById('leader');

  // Clear any previous list items
  leaderList.innerHTML = '';
  leaderList.style.display = 'none';


  response.data.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${entry.Name}: ${entry.TotalExpense} Rs`;
    leaderList.appendChild(li);
    leaderList.style.display = 'block';
  });
}


DownloadButton.onclick= async function (e){
  e.preventDefault()
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/download', { headers: { "Authorization": token } });
  console.log(response)
if(response.status===200){
    const a = document.createElement("a");
    a.href =response.data.fileUrl ;
    a.download ='Expense Report.csv'
    a.click();
}
else{
  throw new Error(response.data.message)
}

}
DownloadButtonold.onclick=async function (e){
  e.preventDefault()
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/reports', { headers: { "Authorization": token } });
console.log(response)
const OldRep=response.data.reports

const reportList = document.getElementById('oldReports');
reportList.innerHTML = '';
reportList.style.display = 'none';
OldRep.forEach(entry => {
  const li=document.createElement('li');
  const link = document.createElement('a');

  li.className = 'list-group1';
  

  link.textContent = `Report : ${entry.ExpenseReport}`;
  link.href = `${entry.ExpenseReport}`; 
  link.download="Expense Report.csv";

  li.addEventListener('click', () => {
    link.click(); 
  });

  li.appendChild(link);
  reportList.appendChild(li);
  reportList.style.display = 'block';

})
}












