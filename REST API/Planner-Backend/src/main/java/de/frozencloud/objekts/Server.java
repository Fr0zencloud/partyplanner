package de.frozencloud.objekts;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Server {

    private Integer port;
    private HttpServer httpserver;

    public Server() {
        this.port = 80;
        httpserver = null;
        try {
            httpserver = HttpServer.create(new InetSocketAddress(this.port), 0);
        } catch (IOException e) {
            e.printStackTrace();
        }
        httpserver.setExecutor(null);
    }
    public void start() {
        this.httpserver.start();
    }
    public void stop() {
        this.httpserver.stop(0);
    }
    public void addContext(String arg0, HttpHandler arg1) {
        this.httpserver.createContext(arg0, arg1);
    }
}
