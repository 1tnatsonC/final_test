//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
function login() {
  document.getElementById('loginButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      var response = await fetch('/auth/login', {
        method: 'POST',
        body: formData,
      });

      var data = await response.json();

      if (response.status === 200 && data.status === 'success') {
        alert(`Logged as ${data.user.nickname}`);
        window.location.href = '/index.html';
      } else if (data.message) {
        alert(data.message);
      } else {
        alert('Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  });
}
