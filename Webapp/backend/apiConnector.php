<?php
class apiConnector{

    var $server = "";
    var $port = 0;
    var $timeout = 0;
    var $curl;

    /**
     * apiConnector constructor.
     * @param $server string
     * @param $port int
     * @param $timeout int
     */
    function __construct($server, $port, $timeout){
        $this->server = $server;
        $this->port = $port;
        $this->timeout = $timeout;
        $this->curl = curl_init();
    }

    function __destruct()
    {
        $this->server = "";
        $this->port = 0;
        curl_close($this->curl);
    }

    /**
     * @return string
     * @throws Exception
     */
    function testConnection(){
        try{
            $test = $this->getRequest("/test");
            if($test != false){
                return $test;
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
        curl_setopt($this->curl, CURLOPT_TIMEOUT, $this->timeout);
        $curl = curl_exec($this->curl);
        if(curl_errno($this->curl) > 0){
            throw new Exception(curl_error($this->curl));
        }else{
            return $curl;
        }
    }

    function post($data){

    }

}