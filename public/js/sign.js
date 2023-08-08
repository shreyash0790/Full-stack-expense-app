const myForm = document.querySelector('#my-form');
const NameInput = document.querySelector('#name');
const EmailInput = document.querySelector('#email');
const PasswordInput = document.querySelector('#pass');
const userEx = document.querySelector('#userEx');


myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const Name = NameInput.value;
    const Email = EmailInput.value;
    const Password = PasswordInput.value;
    if (Name === '' || Email === '' || Password=== '') {
        alert("input all fields");
    }
    else {
        const formData = { Name: Name, Email: Email, Password: Password, };
        postFormData(formData); 
    }
  }
  async function postFormData(formData) {
    try {
        console.log(formData);
        const response = await axios.post('http://localhost:5000/SignUp', formData);
        const user = response.data.User;
        console.log(user);

       
        clearFields();
        userEx.innerText = ''; 
    } catch (err) {
        if (err.response && err.response.status === 400) {
            const h3 = document.createElement('h3');
            h3.className = 'h3';
            h3.textContent = 'User already exists !';
            userEx.appendChild(h3); 
            clearFields();
        } else {
            userEx.innerText = 'An error occurred';
        }
    }
}
function clearFields() {
    NameInput.value = '';
    EmailInput.value = '';
    PasswordInput.value ='';
}
