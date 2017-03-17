$(document).ready(function(){
	var FREQ = 10000;
	var repeat = true;

	function startAJAXcalls() {
		if (repeat) {
			setTimeout(function() {
				//getXMLRacers();
				getDBRacers(); //New call instead of using finishers.xml to get data
				console.log("Inside setTimeout function of startAJAXcalls");
				startAJAXcalls();
				}, FREQ
			);
		}
	};

	//getXMLRacers(); //called to make sure page has content when initially loaded
	getDBRacers(); // New call instead of above call.
	startAJAXcalls();

	function getXMLRacers() {
		$.ajax({
			url: "finishers.xml",
			cache: false,
			dataType: "xml",
			success: function(xml) {
				// Clear the existing entries
				$("#finishers_m").empty();
				$("#finishers_f").empty();
				$("#finishers_all").empty();

				$(xml).find("runner").each(function() {
					var info = "<li>Name: " + $(this).find("fname").text() + " " + $(this).find("lname").text() +
						". Time: " + $(this).find("time").text() + "</li>";
					if ( $(this).find("gender").text() == "m") {
						$("#finishers_m").append(info);
					} else if ( $(this).find("gender").text() == "f") {
						$("#finishers_f").append(info);
					}
					$("#finishers_all").append(info);
				});
				getTimeAjax();
			}
		});
	}

	//getXMLRacers();

	/* Here is the new function to get the data, from service.php instead of
	 * from finishers.xml
	 */
	function getDBRacers() {
		$.getJSON("service.php", function(json) {
			alert(json.runners.length);
			console.log("Getting json.runners.length", json.runners.length);
		})
		.error(function(jqXHR, textStatus, errorThrown) { console.log("error", jqXHR.responseText, textStatus, errorThrown); })
		getTimeAjax();
	}

	/* getTime() isn't needed b/c of ajax version below: getTimeAjax().
	 * But it is handy to use in place of getTimeAjax() if using a webserver that
	 * doesn't run php files, such as python's SimpleHTTPServer.
	 */
	function getTime(){
        var a_p = "";
        var d = new Date();
        var curr_hour = d.getHours();

        (curr_hour < 12) ? a_p = "AM" : a_p = "PM";
        (curr_hour == 0) ? curr_hour = 12 : curr_hour = curr_hour;
        (curr_hour > 12) ? curr_hour = curr_hour - 12 : curr_hour = curr_hour;

        var curr_min = d.getMinutes().toString();
        var curr_sec = d.getSeconds().toString();

        if (curr_min.length == 1) { curr_min = "0" + curr_min; }
        if (curr_sec.length == 1) { curr_sec = "0" + curr_sec; }

        $('#updatedTime').html(curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p );
    }

		function showFrequency() {
			$("#freq").html("Page refreshes every " + FREQ/1000 + " second(s).");
		}

		function getTimeAjax() {
			$("#updatedTime").load("time.php");
		}

		$("#btnStop").click(function() {
			repeat = false;
			$("#freq").html("Updates paused.");
			$(this).toggle();
			$("#btnStart").toggle();
		});

		$("#btnStart").click(function() {
			repeat = true;
			startAJAXcalls();
			showFrequency();
			$(this).toggle();
			$("#btnStop").toggle();
		});

    $("#btnSave").click(function() {
      var data = $("#addRunner:input").serializeArray();
      $.post($("#addRunner").attr("action"), data, function(json) {
        if (json.status == "fail") {
          alert(json.message);
        }
        if (json.status == "success") {
          alert(json.message);
          clearInputs();
        }
      }, "json");
    });

    function clearInputs() {
      $("#addRunner:input:not(:hidden)").each(function(i) {
        $(this).val("");
      });
    }

    /* To cancel the default submit action of the form to allow the jQuery code
     * in the button click event to take care of sending the data:
     */
    $("#addRunner").submit(function() {
      return false;
    });

});
