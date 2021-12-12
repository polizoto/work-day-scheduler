var events = {};
var date = moment().format('dddd, MMMM Do');
var currentTime = moment().format("HH:mm A")
var time = moment(currentTime, "HH:mm A")

var getEvents = function() {
    // if no "events" object is in localStorage, create a new object
    if (localStorage.getItem("events") === null) {
        events = {
            day: [date],
            action: ["", "", "", "", "", "", "", "", "", ""],
        };
    }
    else {
        events = JSON.parse(localStorage.getItem("events"));
    }
    //    Check if the local storage contains an events object for the current day; if so, keep; if not, remove from local storage and create a new object based on current day
    if (events.day[0] !== date) {
        console.log("hello world");
        localStorage.removeItem("events")
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
    .addClass("time")
    newTimeBlock.append(timeBlock)
    var newEventBlock = $("<div>")
    .addClass("description col-sm-12 col-md-6 col-lg-10 bg-light p-2 d-flex")
    var eventBlock = $("<p>")
    .attr('id', 'note_' + i)
    .addClass("note")
    .text(note)
    .attr('tabindex', "0");
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
$(".description").on("click keypress", "p", function() {
    var text = $(this).text().trim();;
    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
  });

$(".description").on({
    blur: function(e) {
        if (!$(this).hasClass('keyupping')) {
        var text = $(this)
      .val()
      .trim();
  // get the parent row's id attribute
    var index = $(this)
    .closest(".row")
    .attr("id")
    .replace("timeblock_", "");
    //   Optional
    // var arrayIndex = getArrayIndex(index); 
    // events.action[arrayIndex] = text
    // saveEvents();
    var noteP = $("<p>")
      .addClass("note")
      .attr("id", "note_" + index)
      .attr('tabindex', "0")
      .text(text);
    // replace textarea with p element
    $(this).replaceWith(noteP);
        }
    },
    keyup: function(event) {
        $(this).addClass('keyupping');
        if ((event.key === "Escape")) {
        var text = $(this)
        .val()
        .trim();
    // get the parent row's id attribute
      var index = $(this)
      .closest(".row")
      .attr("id")
      .replace("timeblock_", "");
    //   Optional
      // var arrayIndex = getArrayIndex(index); 
      // events.action[arrayIndex] = text
      // saveEvents();
      var noteP = $("<p>")
        .addClass("note")
        .attr("id", "note_" + index)
        .attr('tabindex', "0")
        .text(text);
      // replace textarea with p element
      $(this).replaceWith(noteP);
        }
    $(this).removeClass('keyupping');
    }
}, "textarea");


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
  });

// Create function to check time slot against current time; apply CSS to display status (before, during, after current time)

var auditTime = function(el) {
var hour = $(el)
.attr('id')
var format = 'HH:mm'
var currentHour = moment(hour, format)
var addHour = currentHour.add(1, "hours").format("HH:mm")
var now = moment().format(format)
var presentTime = moment(now, format)
if (presentTime.isBetween(moment(hour, format), moment(addHour, format))) {
    var rowClass = $(el)
    .closest(".row")
    .children().eq(1)
    .attr('class', 'description col-sm-12 col-md-6 col-lg-10 present p-2 d-flex')
  } else if (presentTime.isSame(moment(hour, format))){
    var rowClass = $(el)
    .closest(".row")
    .children().eq(1)
    .attr('class', 'description col-sm-12 col-md-6 col-lg-10 present p-2 d-flex')
} else if (presentTime.isSame(moment(addHour, format))){
    var rowClass = $(el)
        .closest(".row")
        .children().eq(1)
        .attr('class', 'description col-sm-12 col-md-6 col-lg-10 past p-2 d-flex')
} else if (presentTime.isAfter(moment(addHour, format))){
        var rowClass = $(el)
            .closest(".row")
            .children().eq(1)
            .attr('class', 'description col-sm-12 col-md-6 col-lg-10 past p-2 d-flex')
  } else {
    var rowClass = $(el)
        .closest(".row")
        .children().eq(1)
        .attr('class', 'description col-sm-12 col-md-6 col-lg-10 future p-2 d-flex')
  }
}

setInterval(function() {
    $(".time").each(function(index, el) {
        auditTime(el);
      });
  }, 1000 );


$("#currentDay").text(date)
