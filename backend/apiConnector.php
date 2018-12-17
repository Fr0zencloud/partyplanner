<?php
class apiConnector{

    var $server = "";
    var $port = 0;
    var $curl;

    function __construct($server, $port){
        $this->server = $server;
        $this->port = $port;
        $this->curl = curl_init();
    }

    function __destruct()
    {
        $this->server = "";
        $this->port = 0;
        curl_close($this->curl);
    }

    /**
     * @throws Exception
     * @return string
     */
    function test(){
        curl_setopt($this->curl, CURLOPT_URL, $this->server . "/");
        curl_setopt($this->curl, CURLOPT_PORT, $this->port);
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->curl, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($this->curl, CURLOPT_TIMEOUT, 5);
        curl_exec($this->curl);
        if(curl_errno($this->curl) > 0){
            throw new Exception(curl_error($this->curl));
        }else{
            return true;
        }
    }

    function get($_data){
        $http_get = http_get($this->server . ":" . $this->port . "/" . $_data);
        if(!$http_get){
            error_log("Could not get from Server");
            return false;
        }else{
            return json_decode($http_get);
        }
    }

    function post($_data){

    }

}