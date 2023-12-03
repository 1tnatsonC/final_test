//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->

$(document).ready(function () {
  // || [] means IF no such key found in localStorage, store an empty array to this variable
  var bookingStatus = JSON.parse(localStorage.getItem('bookedseat')) || [];

  var seatSelected = '';


  // Keep update of seat that based on localStorage when Refreshed
  $('.seat').each(function () {
    var seatId = $(this).attr('id');

    if (bookingStatus.includes(seatId)) {
      $(this).addClass('booked');
    }
  });

  $('.seat').click(function () {
    var seatId = $(this).attr('id');

    if ($(this).hasClass('booked')) {
      alert('This seat is already booked');
    } else if (!$(this).hasClass('booked')) {
      document.getElementById('selected-seat').innerHTML = 'Do you want to book ' + seatId + '?';
      $('#ConfirmButton').show();
      $('#DismissButton').show();
      $('#ConfirmButton').removeClass('d-none');
      $('#DismissButton').removeClass('d-none');
      

      $('#ConfirmButton').click(function () {
        bookingStatus.push(seatId);
        window.location.href = '/payment.html';

        localStorage.setItem('bookedseat', JSON.stringify([...new Set(bookingStatus)]));

        $(this).addClass('booked');

        $('.seat').each(function () {
          var seatId = $(this).attr('id');

          if (bookingStatus.includes(seatId)) {
            $(this).addClass('booked');
          }
        });

        $('#ConfirmButton').hide();
        $('#DismissButton').hide();
        document.getElementById('selected-seat').innerHTML = 'Click a Seat to book';
      });

      $('#DismissButton').click(function () {
        $('#ConfirmButton').hide();
        $('#DismissButton').hide();
        document.getElementById('selected-seat').innerHTML = 'Click a Seat to book';
      });
    }
  });

    // Get all the booked seats and count them
    const bookedCount = bookingStatus.length;

    // Get all the seats and count them
    const seats = document.getElementsByClassName('seat');
    const seatCount = seats.length - bookingStatus.length;


    // Update the seat count and booked seat count 
    document.getElementById('seatCount').textContent = `Available: ${seatCount}`;
    document.getElementById('bookedCount').textContent = `Occupied: ${bookedCount}`;
});


