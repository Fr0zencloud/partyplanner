package me.Dominik.responses;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import me.Dominik.main.Main;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class HttpResponse implements HttpHandler {

        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "{\"Connection\": true, \"SQL\": " + Main.mysql.getMySQLState() + "}";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
}
