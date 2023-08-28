
const passwordInput = document.getElementById('new-pass');


document.addEventListener('DOMContentLoaded', function() {
    const ConfirmButton = document.getElementById('Confirm-btn');
  
    ConfirmButton.addEventListener('click', async function(e) {
      e.preventDefault();

      const Password = passwordInput.value;
const updateid = new URLSearchParams(window.location.search).get('id');

      
      if (Password === '') {
          alert("Input all fields");
      } else {
        const Data={updateid:updateid,Password:Password}
       Datafetch(Data)
       clearfield() ;
         
      }
  

    });
  });


  async function Datafetch(Data) {
    try {
        const id=Data.updateid
        const response = await axios.put(`http://13.234.20.97:5000/password/updatepass/${id}`, Data );
        
  

        if (response.status === 201) {
          console.log(response)
          alert("Password Reset Successfully ");
            window.location.href = 'http://13.234.20.97:5000/html/login.html'
        }

    } catch (err) {
       console.log(err)
    }
  }

  function clearfield(){
    passwordInput.value='';
  }

