class apiConnector{
    constructor(server, port, timeout, port_override){
        this.server = server;
        this.timeout = timeout;

        if(server.substr(0, 5) === "https" && port_override){
            this.port = 443;
        }else if(server.substr(0, 4) === "http" && port_override){
            this.port = 80;
        }else{
            this.port = port;
        }
    }

    getRequest(data){
        //here standard request
    }

    testConnection(){
        //get request and give true or false back
    }
}