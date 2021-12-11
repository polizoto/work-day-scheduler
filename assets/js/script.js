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

for (var i = 8; i < 18; i++) {
    var newRow = $("<div>")
    .attr('id', 'timeblock' + i)
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
    .addClass("note")
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

$("#currentDay").text(date)