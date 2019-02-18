package de.frozencloud.responses;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import de.frozencloud.main.Main;
import java.io.IOException;
import java.io.OutputStream;

public class HttpResponse implements HttpHandler {

        public void handle(HttpExchange t) throws IOException {
            String response = "{\"Connection\": true, \"SQL\": " + Main.mysql.getMySQLState() + "}";
            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
}
