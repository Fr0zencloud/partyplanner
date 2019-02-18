package de.frozencloud.main;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import de.frozencloud.objekts.MySQL;
import de.frozencloud.objekts.Server;
import de.frozencloud.responses.GetLogin;
import de.frozencloud.responses.HttpResponse;

public class Main {

    private static String prefix = "[SYSTEM] ";
    public static Server server;
    public static MySQL mysql;

    public static void main(String[] args) throws Exception {
    	message("\n" +
                "  ____            _         ____  _                             \n" +
                " |  _ \\ __ _ _ __| |_ _   _|  _ \\| | __ _ _ __  _ __   ___ _ __ \n" +
                " | |_) / _` | '__| __| | | | |_) | |/ _` | '_ \\| '_ \\ / _ \\ '__|\n" +
                " |  __/ (_| | |  | |_| |_| |  __/| | (_| | | | | | | |  __/ |   \n" +
                " |_|   \\__,_|_|   \\__|\\__, |_|   |_|\\__,_|_| |_|_| |_|\\___|_|   \n" +
                "                      |___/  	Project by Niklas and Dominik");
    	message("Loading ressources and configuartion files...");
        mysql = new MySQL();
        server = new Server();
        server.addContext("/test", new HttpResponse());
        server.addContext("/login", new GetLogin());
        server.start();
        message("HTTPServer start successfully...");
    }
    public static void message(String arg0) {
    	SimpleDateFormat df = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" ); 
        System.out.println("[" + df.format(new Date()).toString() + "] " + prefix + arg0);
    }
    public static double round(double betrag) { 
      double round = Math.round(betrag*10000); 
      round = round / 10000; 
      round = Math.round(round*1000); 
      round = round / 1000; 
      round = Math.round(round*100); 
      return round / 100; 
    }
}
