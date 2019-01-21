package de.frozencloud.responses;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import de.frozencloud.main.Main;
import de.frozencloud.objekts.JSON;

import java.io.*;
import java.net.URLDecoder;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetLogin implements HttpHandler {

    private String username;
    private String vorname;
    private String nachname;
    private String password;
    private String email;
    private String allow;

    @Override
    public void handle(HttpExchange t) throws IOException {
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
        this.loadData();
        JSON json = new JSON();
        if(this.allow == "true") {
            json.addArgument("username", this.username);
            json.addArgument("name", this.vorname);
            json.addArgument("lastname", this.nachname);
            json.addArgument("email", this.email);
            json.addArgument("acces", this.allow);
            Main.message("Client: " + t.getLocalAddress().getHostName() + " | acces allow!");
        } else {
            json.addArgument("acces", "false");
            Main.message("Client: " + t.getLocalAddress().getHostName() + " | acces deny!");
        }
        String jsonresponse = json.build();
        jsonresponse = URLDecoder.decode(jsonresponse, "UTF-8");
        t.sendResponseHeaders(200, jsonresponse.length());
        OutputStream os = t.getResponseBody();
        os.write(jsonresponse.getBytes());
        os.close();
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
