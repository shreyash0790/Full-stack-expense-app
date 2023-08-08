const myForm = document.querySelector('#my-form');
const EmailInput = document.querySelector('#email');
const PasswordInput = document.querySelector('#pass');
const userEx = document.querySelector('#userEx');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const Email = EmailInput.value;
    const Password = PasswordInput.value;
    if ( Email === '' || Password=== '') {
        alert("input all fields");
    }
    else {
        const formData = { Email: Email, Password: Password, };
        getFormData(formData); 
        clearFields();
    }
  }

  async function getFormData(formData) {
    try {
        console.log(formData);
        const response = await axios.get('http://localhost:5000/GetUser', { params: formData });
        const responseData = response.data;

            alert("Login successful");
       
       
    } catch (err) {
        if (err.response && err.response.status === 400) {
            const h3 = document.createElement('h3');
            h3.className = 'h3';
            h3.textContent = 'User Not Found !';
            userEx.appendChild(h3); 
            clearFields();
        }else{
            userEx.innerText = 'An error occurred';
        }
    }
}
function clearFields() {
    EmailInput.value='';
     PasswordInput.value='';
    
}
