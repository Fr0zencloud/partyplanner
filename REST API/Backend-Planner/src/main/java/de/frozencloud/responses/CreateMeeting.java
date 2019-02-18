package de.frozencloud.responses;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Date;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class CreateMeeting implements HttpHandler {
	
	private String meetingname;
	private String meetingid;
	private String street;
	private Integer plz;
	private Date begin_date;
	private Date end_date;
	
	public void handle(HttpExchange t) throws IOException {
		InputStream input = t.getRequestBody();
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        String inputstring = reader.readLine();
        
        end_date = new Date(System.currentTimeMillis());
    }

}
