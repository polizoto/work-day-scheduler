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
console.log(newTime.format("H A"));
console.log(newTime3.format("H A"));

var getEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
  
    // if nothing in localStorage, create a new object to track all event storage arrays
    if (!events) {
      events = {
        day: [date],
        action: ["", "", "", "", "", "", "", "", "", "", ""],
      };
    }
    // console.log(events);
}

var getArrayIndex = function(timeblock) {
    timeInt = parseInt(timeblock)
    if (timeInt === 8) {
        return arrayIndex = 0;
    }
  };


var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
  };

var addEvents = function() {
var eventIndex = 0;
for (var i = 8; i < 18; i++) {
    // console.log(events.action[eventIndex]);
    var note = events.action[eventIndex].text
    var newRow = $("<div>")
    .attr('id', 'timeblock_' + i)
    .addClass("row")
    var getTime = moment().set("hour", i).format("h A")
    var newTimeBlock = $("<div>")
    .addClass("time-block col-sm-12 col-md-3 col-lg-1 p-3 d-flex")
    var timeBlock = $("<p>")
    .text(getTime);
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
}

// Edit task function
$(".description").on("click", "p", function() {
    console.log("Hello World");
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
  // get the parent ul's id attribute
    var index = $(this)
    .closest(".row")
    .attr("id")
    .replace("timeblock_", "");
    var arrayIndex = getArrayIndex(index); 
    events.action[arrayIndex] = text;
    saveEvents();
    var noteP = $("<p>")
      .addClass("note")
      .attr("id", "note_" + index)
      .text(text);
    // replace textarea with p element
    $(this).replaceWith(noteP);
    });

$("#currentDay").text(date)
getEvents();
addEvents();