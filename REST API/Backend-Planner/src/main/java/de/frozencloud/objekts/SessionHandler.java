package de.frozencloud.objekts;

import java.util.List;

public class SessionHandler {
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	private static int sessionIdLength = 25;
	private List<String> sessionList;
	
	//TODO fill the SessionId in Database with given UserId
	//TODO have a list from all active sessions and check if the newly created is unique
	public String createSession() {
		StringBuilder builder = new StringBuilder();
		while (sessionIdLength-- != 0) {
			int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}
}
