console.log("test");

var iota = new IOTA({ 'provider': 'http://46.101.225.64:14265' })

var run = function() {
    
    // Initialise MAM State - PUBLIC
    var mamState = Mam.init(iota)
    
    // Publish to tangle
    const publish = async packet => {
        // Create MAM Payload - STRING OF TRYTES
        var message = Mam.create(mamState, packet)
        //console.log(message)
        // Save new mamState
        mamState = message.state
        // Attach the payload.
        console.log('Root: ', message.root)
        console.log('Address: ', message.address)
        await Mam.attach(message.payload, message.address)
        
        // Fetch Stream Async to Test
        //var resp = await Mam.fetch(message.root, 'public', null, console.log)
        //console.log(resp)
    }
    
    let i = 0;
    
    const main = async () => {
        //while(1) {
            let payload = iota.utils.toTrytes('POTATO' + i++)
            console.log(payload)
            await publish(payload)
        //}
    }

    main();
}

window.setTimeout(run, 3000);
