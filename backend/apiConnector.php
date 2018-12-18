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
     * @return bool
     * @throws Exception
     */
    function test(){
        try{
            if($this->getRequest("/test")){
                return true;
            }
        }catch (Exception $e){
            throw new Exception($e->getMessage());
        }
        return false;
    }

    /**
     * @throws Exception
     * @return string
     * @param string
     */
    function getRequest($data){
        curl_setopt($this->curl, CURLOPT_URL, $this->server . $data);
        curl_setopt($this->curl, CURLOPT_PORT, $this->port);
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->curl, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($this->curl, CURLOPT_TIMEOUT, 5);
        $curl = curl_exec($this->curl);
        if(curl_errno($this->curl) > 0){
            throw new Exception(curl_error($this->curl));
        }else{
            return $curl;
        }
    }

    function post($_data){

    }

}