package de.frozencloud.main;

import de.frozencloud.objekts.MySQL;
import de.frozencloud.objekts.Server;
import de.frozencloud.responses.GetLogin;
import de.frozencloud.responses.HttpResponse;

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
