$(document).ready(function() {
    var allPast = false; 
    var allFuture = false; 
    var currentDay = dayjs();
    var selectedDay = currentDay;
    var arrowClicked = false;

    function updateCurrentDayDisplay() {
        $('#currentDay').text(selectedDay.format('dddd, MMMM D'));
        updateTimeBlockClasses();
        loadSavedData();
    }

    function updateTimeBlockClasses() {
        var now = dayjs();
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''));
            $(this).removeClass('past present future');
    
            if (allPast) {
                $(this).addClass('past');
            } else if (allFuture) {
                $(this).addClass('future');
            } else {

                if (selectedDay.isSame(now, 'day')) {
                    if (blockHour < now.hour()) {
                        $(this).addClass('past');
                    } else if (blockHour === now.hour()) {
                        $(this).addClass('present');
                    } else {
                        $(this).addClass('future');
                    }
                } else if (selectedDay.isBefore(now, 'day')) {
                    $(this).addClass('past');
                } else if (selectedDay.isAfter(now, 'day')) {
                    $(this).addClass('future');
                }
            }
        });
    }
    
    function saveData(hourId, data) {
        localStorage.setItem(selectedDay.format('YYYY-MM-DD') + '-' + hourId, data);
    }

    $('.saveBtn').click(function() {
        var hourId = $(this).closest('.time-block').attr('id');
        var data = $(this).siblings('.description').val();
        saveData(hourId, data);
    });

    function loadSavedData() {
        var date = selectedDay.format('YYYY-MM-DD');
        $('.time-block').each(function() {
            var hourId = $(this).attr('id');
            var savedData = localStorage.getItem(date + '-' + hourId);
            if (savedData) {
                $(this).find('.description').val(savedData);
            } else {
                $(this).find('.description').val('');
            }
        });
    }

    $('#leftArrow').click(function() {
        selectedDay = selectedDay.subtract(1, 'day');
        allPast = !selectedDay.isSame(dayjs(), 'day');
        allFuture = false;
        updateCurrentDayDisplay();
    });
    
    $('#rightArrow').click(function() {
        selectedDay = selectedDay.add(1, 'day');
        allFuture = !selectedDay.isSame(dayjs(), 'day');
        allPast = false;
        updateCurrentDayDisplay();
    });

    updateCurrentDayDisplay();
});

