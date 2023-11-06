$(function () {
  // Attach click event listener to save button
  $('.save-button').on('click', function () {
    // Get the parent time-block element and its ID
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // Get the user input from the description input field
    var description = $(this).siblings('.description').val();

    // Save the description in local storage using the time-block ID as the key
    localStorage.setItem(timeBlockId, description);
  });

  let findHour = document.querySelectorAll(".time-block");
  const currentHour = dayjs().hour();

  findHour.forEach((div) => {
    const hourVal = div.id.split("-");
    const divHour = Number(hourVal[1]);

    if (currentHour > divHour) {
      $(div).addClass('past');
      $(div).removeClass('present');
      $(div).removeClass('future');
    } else if (currentHour === divHour) {
      $(div).addClass('present');
      $(div).removeClass('past');
      $(div).removeClass('future');
    } else if (currentHour < divHour) {
      $(div).addClass('future');
      $(div).removeClass('past');
      $(div).removeClass('present');
    }
  })

  // Retrieve saved user input from localStorage and set textarea values
  for (let i = 9; i <= 17; i++) {
    const blockId = "hour-" + i;
    const savedInput = localStorage.getItem(blockId);
    $("#" + blockId).children("textarea").val(savedInput)
  }

  const currentDay = dayjs().format('MMMM DD, YYYY');
  $('#currentDay').text(currentDay);
});


