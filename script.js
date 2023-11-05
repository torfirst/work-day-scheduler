// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?

  // Attach click event listener to save button
  $('.save-button').on('click', function () {
    // Get the parent time-block element and its id
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // Get the user input from the description input field
    var description = $(this).siblings('.description').val();

    // Save the description in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, description);
  });

  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?
  //

  let findHour = document.querySelectorAll(".time-block");
  const currentHour = dayjs().hour();
  // console.log('currentHour: ', currentHour);

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


  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?
  //

  // Retrieve saved user input from localStorage and set textarea values
  for (let i = 9; i <= 17; i++) {
    const blockId = "hour-" + i;
    const textareaId = "textarea-" + i;

    const savedInput = localStorage.getItem(blockId);
    $("#" + textareaId).val(savedInput);
  }

  // TODO: Add code to display the current date in the header of the page.
  const currentDay = dayjs().format('MMMM DD, YYYY');
  $('#currentDay').text(currentDay);
});
