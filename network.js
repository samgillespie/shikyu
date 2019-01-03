/**
 * Created by Enigma on 22/05/2015.
 */
//
function ConnectAddress(address)
{
	function returnResponse(response)
    {
        return response
    }

	jQuery.ajax = (function(_ajax){
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }

    return function(o) {

        var url = o.url;

        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {

            // Manipulate options so that JSONP-x request is made to YQL

            o.url = YQL;
            o.dataType = 'json';

            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };

            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }

            o.success = (function(_success){
                return function(data) {

                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }

                };
            })(o.success);

        }

        return _ajax.apply(this, arguments);

    };

})(jQuery.ajax);


	var jqXHR = $.ajax({
		url: address,
		type: 'GET',
		async: false,
		success: function(res) {
			console.log(res)
            returnResponse(res)
		}
	});
	
	/*
	jQuery.ajax ({
		url: address+"?callback=?",
		type: "GET",
		callback: '?',
		dataType: "jsonp",
		crossDomain: true,
		contentType: "application/json; charset=utf-8",
        success: function() { alert("Success"); },
        error: function(data) { test = data},
	});
	*/
	//var test1 = $.getJSON(address+"?callback=?", function(result){
	//	//response data are now in the result variable
	//	result = JSON.parse(result);
	//	result.jobs.map(function (v) {
	//		console.log(v.data);});
	//});
}
