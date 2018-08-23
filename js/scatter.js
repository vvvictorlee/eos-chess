function Scatter(){
    
    const CHAIN_PROTOCOL = 'http';
    const CHAIN_HOST = '127.0.0.1'; //'mainnet.eoscalgary.io' //'nodes.get-scatter.com' //'br.eosrio.io'
    const CHAIN_PORT = '8888' //8080' //80
    const CHAIN_ADDRESS = CHAIN_PROTOCOL + '://' + CHAIN_HOST + ':' + CHAIN_PORT;
    const CHAIN_ID = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
    /* Eos and Scatter Setup */
    const network = {
        protocol: CHAIN_PROTOCOL,
        blockchain: 'eos',
        host: CHAIN_HOST,
        port: CHAIN_PORT,
        chainId: CHAIN_ID,
        broadcast: true,
        sign: true
    }
    
    document.getElementById("scatterLogin").addEventListener('click', scatterExtension => {
        const scatter = window.scatter;
        window.scatter = null;

        scatter.getIdentity({
            accounts:[network]
            }).then(identity => {
            
                // This would give back an object with the required fields such as `firstname` and `lastname`
                // as well as add a permission for your domain or origin to the user's Scatter to allow deeper
                // requests such as requesting blockchain signatures, or authentication of identities.
                console.log(identity);
            
            }).catch(error => {
                console.log(error);
        });

        if (scatter.identity) {
        
            const user = {
                eosAccount: scatter.identity.accounts[0].name,
                publicKey: scatter.identity.publicKey
            }
        }
    })
    
   
    document.getElementById("scatterLogout").addEventListener('click', function() {
        scatter.forgetIdentity();
        alert("logged out of scatter");
    })
    
    // SCATTER TEST
    document.getElementById("scatterTest").addEventListener('click', function() {
        const eos = scatter.eos( network, Eos );
        const options = { authorization: [{ actor:scatter.identity.accounts[0].name, permission: scatter.identity.accounts[0].authority }] }
        console.log(scatter.identity.accounts)
        eos.contract('eosio').then(contract => { // or .then(
            console.log(Object.keys(contract))
            contract.getplayer('test', (scatter.identity.accounts[0].name, options))
        })
    })

    return {
        // logout:function(){
        //     scatter.forgetIdentity();
        // },
        getIdentityScatter:function(){
            return scatter.eos( network, Eos );
        }
    }
}