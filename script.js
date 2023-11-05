$(document).ready(function() {
  var today = moment().format('dddd, MMMM Do');
  $('#currentDay').text(today);
});

function updateTimeBlockColors() {
  var currentHour = moment().hour(); 

  $('.time-block').each(function() {
      var blockHour = parseInt($(this).data('hour'));

      if (blockHour < currentHour) {
          $(this).addClass('past');
      } else if (blockHour === currentHour) {
          $(this).addClass('present');
      } else {
          $(this).addClass('future');
      }
  });
}

$(document).ready(function() {
  updateTimeBlockColors();
});

function saveEvent(hour, eventData) {
  localStorage.setItem('event-' + hour, eventData);
}

$(document).on('click', '.save-btn', function() {
  var hour = $(this).closest('.time-block').data('hour');
  var eventData = $(this).siblings('.event-input').val();
  saveEvent(hour, eventData);
});