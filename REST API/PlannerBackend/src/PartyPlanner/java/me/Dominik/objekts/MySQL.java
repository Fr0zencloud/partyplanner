package me.Dominik.objekts;

import me.Dominik.main.Main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQL {

    private Connection con;
    private String hostname;
    private String database;
    private String username;
    private String password;

    public MySQL() {
        this.hostname = "dd39432.kasserver.com";
        this.database = "d02c4b50";
        this.username = "d02c4b50";
        this.password = "X:6D9#5=(7673445JV-E";
        try {
            Connection c = DriverManager.getConnection("jdbc:mysql://" + this.hostname + "/" + this.database + "?autoReconnect=true", this.username, this.password);
            con = c;
            Main.message("Connection to MySQL is successfully open...");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public Boolean getMySQLState() {
        try {
            return !this.con.isClosed();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    public Connection getConnection() {
        return this.con;
    }
}
