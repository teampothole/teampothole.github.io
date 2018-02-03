function startPolling(){
    // var provider = 'http://46.101.225.64:14265';
    var provider = "http://iota.love:16000";
    var iota = new IOTA({ 'provider': provider })

    function getRoot(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "https://api.keyvalue.xyz/96a61ef1/potholeID", false ); // false for synchronous request
	xmlHttp.send( null );
	console.log("this is my root", xmlHttp.responseText.trim())
	return JSON.parse(xmlHttp.responseText.trim()).root;
    }
    
    // Init State
    let root = getRoot();// 'MNYYHAEFBBFWOXAKQMJEKNVGYQZSEHSUESFQSDCZVTTIAAIFRJYHQNCDMUCDTOYJGJGOAYMOUQPU9QZYY';
    console.log("root", root);
    //let root = "BMIPCCK99IVTWJBHCAOGGIBTSASFWFNZEYGCGORWLJCDUFGYLZFIDEWCUVTTQYNRYOEVPCJWWRJ9LKRAV"
    
    // Initialise MAM State
    var mamState = Mam.init(iota)

    // Callback used to pass data out of the fetch
    const logData = data => {
	var payload = JSON.parse(iota.utils.fromTrytes(data))
	console.log(payload)
	notifyBump(payload.message, payload.latitude);
    }

    const execute = async (root) => {
	///////////////////////////////////
	// Fetch the messages syncronously
	var resp = await Mam.fetch(root, 'public', null, logData)
	return resp
    }

    const main = async () => {
	while(1) {
	    let resp = await execute(root)
	    if (resp.nextRoot !== root) {		
		console.log('next root => ' + resp.nextRoot)
		root = resp.nextRoot
	    }
	}
    }

    main()
}

window.setTimeout(startPolling, 1000);
