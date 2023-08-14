const EmailInput = document.querySelector('#email');

document.getElementById('LoginButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
  
    submitButton.addEventListener('click', async function(e) {
      e.preventDefault();

      const Email = EmailInput.value;
      
      if (Email === '') {
          alert("Input all fields");
      } else {
        const response = await axios.get('http://localhost:5000/password/forgotpassword');
      console.log(response)
      alert("Reset link send ");
        
         
      }
  

    });
  });