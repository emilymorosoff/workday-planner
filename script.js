$(document).ready(function() {
  var today = moment().format('dddd, MMMM Do');
  $('#currentDay').text(today);

  function updateTimeBlockColors() {
      var currentHour = moment().hour(); 
      $('.time-block').each(function() {
          var blockHour = parseInt($(this).data('hour'));
          if (blockHour < currentHour) {
              $(this).addClass('past').removeClass('present future');
          } else if (blockHour === currentHour) {
              $(this).addClass('present').removeClass('past future');
          } else {
              $(this).addClass('future').removeClass('past present');
          }
      });
  }

  updateTimeBlockColors();

  function saveEvent(hour, eventData) {
      localStorage.setItem('event-' + hour, eventData);
  }

  function loadSavedEvents() {
      $('.time-block').each(function() {
          var hour = $(this).data('hour');
          var savedEvent = localStorage.getItem('event-' + hour);
          if (savedEvent) {
              $(this).find('.event-input').val(savedEvent);
          }
      });
  }

  loadSavedEvents();

  $(document).on('click', '.save-btn', function() {
      var hour = $(this).closest('.time-block').data('hour');
      var eventData = $(this).siblings('.event-input').val();
      saveEvent(hour, eventData);
  });
});