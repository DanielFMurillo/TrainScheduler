$(document).ready(function(){
  console.log("ready");	


	$("#add-train").on("click", function() {
		console.log("click");
		event.preventDefault();

		
		var trainName = $("#train-input").val();
		var destination = $("#destination-input").val();
		var firstTrain = $("#train-time-input").val();
		var freq = $("#frequent-input").val();

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

		//var minutesLeft = moment().diff(moment(firstTrain,'HH:mm'), "minutes");
				//console.log(minutesLeft);

		var trainNames_td = $("<td>").text(trainName);
		var destination_td = $("<td>").text(destination);
		var firstTrain_td = $("<td>").text(firstTrain);
		var freq_td = $("<td>").text(freq);
	
		var trainSchedule_tr = $("<tr>").append(trainNames_td)
										.append(destination_td)
										.append(firstTrain_td)
										.append(freq_td);
									
			console.log(trainSchedule_tr);

		$("#trains > tbody").append(trainSchedule_tr);

})

