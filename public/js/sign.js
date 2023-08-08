const myForm = document.querySelector('#my-form');
const NameInput = document.querySelector('#name');
const EmailInput = document.querySelector('#email');
const PasswordInput = document.querySelector('#pass');


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
        const user = response.data.User
       console.log(user)
        
        clearFields(); // Clear input fields
    } catch (err) {
        console.log(err);
    }
}
function clearFields() {
    NameInput.value = '';
    EmailInput.value = '';
    PasswordInput.value ='';
}
