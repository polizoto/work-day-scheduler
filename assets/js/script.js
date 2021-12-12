var events = {};
var date = moment().format('dddd, MMMM Do');
var currentTime = moment().format("HH:mm A")
var result8 = '08:00 AM'
var result10 = '05:00 PM'
var time = moment(currentTime, "HH:mm A")
var newTime = moment(result8, "HH:mm A")
var newTime2 = moment(result10, "HH:mm A")
var newTime3 = moment().set("hour", 8)

if (moment(newTime2).isAfter(moment(time))) {
    console.log(newTime2 + " is after " + time);
}
else {
    console.log(newTime2 + " is earlier than " + time);
}
// console.log(newTime.format("H A"));
// console.log(newTime3.format("H A"));

var getEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
  
    // if nothing in localStorage, create a new object to track all event storage arrays
    if (!events) {
      events = {
        day: [date],
        action: ["", "", "", "", "", "", "", "", "", ""],
      };
    }
}

var getArrayIndex = function(timeblock) {
    timeInt = parseInt(timeblock)
    return arrayIndex = (timeInt - 8);
  };


var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
  };

var eventIndex = 0;
for (var i = 8; i < 18; i++) {
    getEvents();
    var note = events.action[eventIndex]
    var newRow = $("<div>")
    .attr('id', 'timeblock_' + i)
    .addClass("row")
    var getTime = moment().set("hour", i).format("h A")
    var newTimeBlock = $("<div>")
    .addClass("time-block col-sm-12 col-md-3 col-lg-1 p-3 d-flex")
    var timeBlock = $("<p>")
    .attr('id', i + ":00")
    .text(getTime)
    .addClass("time");
    newTimeBlock.append(timeBlock)
    var newEventBlock = $("<div>")
    .addClass("description col-sm-12 col-md-6 col-lg-10 bg-light p-2 d-flex")
    var eventBlock = $("<p>")
    .attr('id', 'note_' + i)
    .addClass("note")
    .text(note);
    newEventBlock.append(eventBlock)
    var newSaveBlock = $("<div>")
    .addClass("p-4 saveBtn col-sm-12 col-md-3 col-lg-1 d-flex justify-content-center")
    var newButton = $("<button>")
    .attr("title", "Save")
    .addClass("px-2 d-flex")
    var newIcon = $("<i>")
    .addClass("fas fa-save")
    newButton.append(newIcon)
    newSaveBlock.append(newButton)
    newRow.append(newTimeBlock, newEventBlock, newSaveBlock)
    $("#container").append(newRow);
    eventIndex++
}


// Edit task function
$(".description").on("click", "p", function() {
    var text = $(this).text().trim();;
    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
  });

  $(".description").on("blur", "textarea", function() {
    // get the textarea's current value/text
    var text = $(this)
      .val()
      .trim();
  // get the parent row's id attribute
    var index = $(this)
    .closest(".row")
    .attr("id")
    .replace("timeblock_", "");
    // var arrayIndex = getArrayIndex(index); 
    // events.action[arrayIndex] = text
    // saveEvents();
    var noteP = $("<p>")
      .addClass("note")
      .attr("id", "note_" + index)
      .text(text);
    // replace textarea with p element
    $(this).replaceWith(noteP);
    });

    // Edit task function
$(".saveBtn").on("click", "button", function() {
    var row = $(this)
    .closest(".row")
    .children().eq(1)
    var text = $(row)
    .children()
    .first()
    .text()
    .trim()
    var index = $(this)
    .closest(".row")
    .attr("id")
    .replace("timeblock_", "");
    var arrayIndex = getArrayIndex(index); 
    events.action[arrayIndex] = text
    saveEvents();
    // console.log(events);
  });

// Create function to check time slot against current time; apply CSS to display status (before, during, after current time)

var auditTime = function(el) {
// console.log(el);
var hour = $(el)
.attr('id')
var calendarTime = moment(hour, "HH:mm")
// var presentTime = calendarTime.add(1, "hours")
// console.log("The calendar time is: " + calendarTime + " and the present time is: " + presentTime);
if (moment(calendarTime).isAfter(moment(time))) {
        var rowClass = $(el)
            .closest(".row")
            .children().eq(1)
            .attr('class', 'description col-sm-12 col-md-6 col-lg-10 future p-2 d-flex')
    }
else {
    var rowClass = $(el)
            .closest(".row")
            .children().eq(1)
            .attr('class', 'description col-sm-12 col-md-6 col-lg-10 past p-2 d-flex')
}
}

setInterval(function() {
    $(".time").each(function(index, el) {
        auditTime(el);
      });
  }, (1000 * 10));


$("#currentDay").text(date)
