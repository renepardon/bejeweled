/* VISUAL DEBUGGER */
$( document ).ready( function() {
	if (typeof console  != "undefined") 
		if (typeof console.log != 'undefined')
			console.olog = console.log;
		else
			console.olog = function() {};

	console.log = function(message) {
		console.olog(message);
		$('#info').append(message + '</br>');
	};
	console.error = console.debug = console.info =  console.log
});

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'l':
            event.preventDefault();
            $("#info").html("");
            break;

		case 'b':
			console.log("bejeweled here!");
			break;
		}
    }
});
