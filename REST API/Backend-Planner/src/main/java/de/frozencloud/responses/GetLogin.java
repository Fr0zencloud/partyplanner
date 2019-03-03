package de.frozencloud.responses;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import de.frozencloud.main.Main;
import de.frozencloud.objekts.JSON;
import de.frozencloud.objekts.SessionHandler;

import java.io.*;
import java.net.URLDecoder;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.NumberFormat;

public class GetLogin implements HttpHandler {

    private String username;
    private String vorname;
    private String nachname;
    private String password;
    private int userId;
    private String email;
    private String allow;
    private String sessionId = "";

    public void handle(HttpExchange t) throws IOException {
    	Main.message("Client connected (Host: " + t.getRemoteAddress().getHostName() + ", RequestType: '/login')");
    	Long logintime = System.currentTimeMillis();
    	SessionHandler sessionHandler = new SessionHandler();
        this.allow = "false";
        InputStream input = t.getRequestBody();
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        String test = reader.readLine();
        String test1 = test.replaceAll("email=", "");
        String[] data = test1.split("&password=");
        
        this.email = data[0];
        this.password = data[1];
        this.email = URLDecoder.decode(this.email, "UTF-8");
        this.password = URLDecoder.decode(this.password, "UTF-8");
        this.sessionId = sessionHandler.createSession();
        this.loadData();
        
        JSON json = new JSON();
        if(this.allow == "true") {
        	json.addArgument("userId", String.valueOf(this.userId));
        	json.addArgument("sessionId", this.sessionId);
            json.addArgument("username", this.username);
            json.addArgument("name", this.vorname);
            json.addArgument("lastname", this.nachname);
            json.addArgument("email", this.email);
            json.addArgument("access", this.allow);
            Main.message("Client: " + t.getLocalAddress().getHostName() + " | acces allow!");
        } else {
            json.addArgument("acces", "false");
        }
        String jsonresponse = json.build();
        jsonresponse = URLDecoder.decode(jsonresponse, "UTF-8");
        t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        t.sendResponseHeaders(200, jsonresponse.length());
        OutputStream os = t.getResponseBody();
        os.write(jsonresponse.getBytes());
        os.close();
        Long currenttime = System.currentTimeMillis();
        double seconds = (double) (currenttime - logintime) /1000D;
        Main.message("Client conection closed (Host: " + t.getRemoteAddress().getHostName() + ", LoginAccept: " + this.allow + ") [time: " + Main.round(seconds) + "]");
    }
    private void loadData() {
        try {
            PreparedStatement ps = Main.mysql.getConnection().prepareStatement("SELECT * FROM users WHERE email = '" + this.email + "'");
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                if(this.password.equals(rs.getString("password"))) {
                    this.username = rs.getString("username");
                    this.vorname = rs.getString("name");
                    this.nachname = rs.getString("surname");
                    this.userId = rs.getInt("id");
                    if(this.vorname == null) {
                        this.vorname = " ";
                    }
                    if(this.nachname == null) {
                        this.nachname = " ";
                    }
                    this.allow = "true";
                } else {
                    this.allow = "false";
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
