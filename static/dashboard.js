//Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)
$(document).ready(function () {
  $.get('assets\\event-dashboard.json', function (data) {
    // Success case handling here
    //alert("Success: " + data );
    console.log('Fetched data:', data);

    data.forEach(function (event) {
      var event_cardHtml = `
            <div class="col-lg-3 col-md-5 col-sm-10">
                <div class="card">
                <img src="${event.image}" class="card-img-top" alt="${event.name}"   >
                <div class="btn-group-sm p-3">
                    <h5 class="text-body-dark fw-bold">${event.name}</h5>
                    <h6 class="text-body-dark fw-bold">${event.location}</h6>
                    <h6 class="text-body-dark fw-bold">Time: ${event.depart_arriveTime}</h6>
                    <p class="card-text fs-6">Price: ${event.price}</p>
                    <p class="btn btn-success mb-2">${event.type}</p>
                    
                </div>
                </div>
                <p><br></p>
            </div>
            `;
      $('#event-dashboard').append(event_cardHtml);
    });
  }).fail(function (error) {
    // Fail Case Handling Here
    //alert("Failed:" + error);
    $('#menuFailed').removeClass('d-none').html('Failed to fetch event menu. Please try again later.');
    console.log('Failed to fetch data. An error occurred:', error);
  });
});
