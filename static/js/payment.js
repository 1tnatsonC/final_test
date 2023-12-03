//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
function payment() {
  document.getElementById('submitButton').addEventListener('click', async (event) => {
    //event.preventDefault();
    var paymentSelect = document.getElementById('paymentSelect').value;
    var firstName = document.getElementById('fName').value;
    var lastName = document.getElementById('lName').value;
    var cardNumber = document.getElementById('cardNumber').value;
    var validDate = document.getElementById('validDate').value;
    var cvs = document.getElementById('cvs').value;
    //var ticketSelected = document.getElementById('seat');

    if (paymentSelect != 'creditCard' && paymentSelect != 'debitCard') {
      alert('Please select a payment method.');
      return;
    }

    if (!firstName || !lastName) {
      alert('First name or last name cannot be empty!');
      return;
    }

    if (!cardNumber) {
      alert('Please enter your card number.');
      return;
    }

    if (!validDate) {
      alert("Please enter your card's valid date.");
      return;
    }

    if (!cvs) {
      alert("Please enter your card's CVS.");
      return;
    }
    alert('payment successful!\nseat price: $40');
    window.location.href = '/dashboard.html';
  });
}
