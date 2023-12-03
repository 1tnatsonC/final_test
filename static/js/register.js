//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
function Reg() {
  document.getElementById('RegisterButton_Register').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    var usernameInput = document.getElementById('username');
    var nicknameInput = document.getElementById('nickname');
    var passwordInput = document.getElementById('password');
    var password_repeatInput = document.getElementById('password_repeat');
    var roleInput = document.getElementById('role');
    var emailInput = document.getElementById('email');
    var dateInput = document.getElementById('birthdate');

    var username = usernameInput.value.trim();
    var nickname = nicknameInput.value.trim();
    var password = passwordInput.value;
    var password_repeat = password_repeatInput.value;
    var role = roleInput.value;
    var email = emailInput.value;
    var date = dateInput.value;

    // Check if username and password are provided
    if (username === '' || password === '') {
      alert('Username or password cannot be empty');
      return;
    }

    // Check if the repeated password matches
    if (password !== password_repeat) {
      alert('Password mismatch!');
      return;
    }

    // Check if a role is selected
    if (role === 'blank') {
      alert('Please select your role');
      return;
    }

    // Create a FormData object to store the form data
    var formData = new FormData();
    formData.append('username', username);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('birthdate', date);

    // Send form data to the server using fetch
    fetch('/auth/register', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.status === 'success') {
          alert('Welcome, ' + username + '!\nYou can login with your account now!');
          window.location.href = '/login.html';
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        alert('An error occurred during registration');
      });
  });
}
