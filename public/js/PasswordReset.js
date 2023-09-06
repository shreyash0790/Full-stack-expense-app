const EmailInput = document.getElementById('email');

document.getElementById('LoginButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const ResetButton = document.getElementById('Reset-btn');
  
    ResetButton.addEventListener('click', async function(e) {
      e.preventDefault();

      const Email = EmailInput.value;
      
      if (Email === '') {
          alert("Input all fields");
      } else {
        const Data={Email:Email}
       Datafetch(Data)
       clearfield() ;
         
      }
  

    });
  });


  async function Datafetch(Data) {
    try {
     
        const response = await axios.post('http://43.205.214.215:5000/password/forgotpassword', Data );
        
        const responseData = response.data;

        if (response.status === 200) {
          console.log(response)
          alert("Reset link send ");
            window.location.href = 'login.html'
        }

    } catch (err) {
       console.log(err)
    }
  }

  function clearfield(){
    EmailInput.value='';
  }