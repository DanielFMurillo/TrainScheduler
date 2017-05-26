$(document).ready(function(){
  console.log("ready");	



//current time
var currentTime = moment().format('h:mm A');
$("#currentTime").html("The time is: " + currentTime);

	$("#add-train").on("click", function() {
		console.log("click");
		event.preventDefault();

		//input from form
		var trainName = $("#train-input").val();
		var destination = $("#destination-input").val();
		var firstTrain = $("#train-time-input").val();
		var freq = $("#frequent-input").val();
		//store the input into firebase
		database.ref().push({
			"trainName": trainName,
			"destination": destination,
			"firstTrain": firstTrain,
			"freq": freq				
		});
	});
});


//select
database.ref().on("child_added", function(snapshot, prevChildKey){
		var newPost = snapshot.val();

		var trainName = newPost.trainName;
		var destination = newPost.destination;
		var firstTrain = newPost.firstTrain; 
		var freq = newPost.freq;

		var minutesLeft = moment().diff(moment(firstTrain,'HH:mm'), "minutes");
		    var lastArrival = minutesLeft % freq; //minutes ago
	        var minutesAway = freq - lastArrival; //in minutes calculating for minutes away
	        var nextTrain = moment().add(minutesAway, "minutes");
	        //var nextTrain = moment().add(minutesAway), "minutes";
	        console.log('firstTrain', firstTrain);
	        console.log('nextArrival', minutesAway + " minutes away");

	    //creating the row and fetching the text from firebase
		var trainNames_td = $("<td>").text(trainName);
		var destination_td = $("<td>").text(destination);
		var firstTrain_td = $("<td>").text(moment(nextTrain).format("hh:mm A"));
		var freq_td = $("<td>").text("Every " + freq + " minutes");
		var minutesAway_td = $("<td>").text(minutesAway + " minutes");
		//append to the rows in the browser
		var trainSchedule_tr = $("<tr>").append(trainNames_td)
										.append(destination_td)
										.append(freq_td)										
										.append(firstTrain_td)	
										.append(minutesAway_td);
									
			console.log(trainSchedule_tr);

		$("#trains > tbody").append(trainSchedule_tr);

})


