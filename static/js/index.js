//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
fetch('/auth/me')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Please login');
    }
  })
  .then((data) => {
    const greetingElement = document.getElementById('greeting');
    greetingElement.textContent = `Welcome back! ${data.user.nickname}`;
  })
  .catch((error) => {
    alert(error.message);
    window.open('/login.html', '_self');
  });

function logout() {
  document.getElementById('logoutButton').addEventListener('click', () => {
    const confirmLogout = confirm('Confirm to logout?');
    if (confirmLogout) {
      fetch('/logout', {
        method: 'POST',
      })
        .then(() => {
          window.open('/login.html', '_self');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    }
  });
}

var idleTimeout = 10 * 60;
var idleTimer;

function resetTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(logout, idleTimeout);
}

function idlelogout() {
  alert('You have been logged out due to inactivity, please login again.');
  window.location.href = '/login.html';
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('click', resetTimer);

resetTimer();
