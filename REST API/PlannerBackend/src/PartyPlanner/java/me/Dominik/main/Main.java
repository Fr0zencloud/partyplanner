package me.Dominik.main;

import me.Dominik.responses.GetLogin;
import me.Dominik.responses.HttpResponse;
import me.Dominik.objekts.MySQL;
import me.Dominik.objekts.Server;

public class Main {

    private static String prefix = "[SYSTEM] ";
    public static Server server;
    public static MySQL mysql;

    public static void main(String[] args) throws Exception {
        mysql = new MySQL();
        server = new Server();
        server.addContext("/test", new HttpResponse());
        server.addContext("/login", new GetLogin());
        server.start();
        message("HTTPServer start successfully...");
    }
    public static void message(String arg0) {
        System.out.println(prefix + arg0);
    }
}
