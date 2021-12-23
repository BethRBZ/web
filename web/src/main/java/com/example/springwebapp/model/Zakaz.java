package com.example.springwebapp.model;

import java.sql.*;
import java.util.ArrayList;

public class Zakaz {

    private Integer id;
    private Integer kolvo;
    private String city;
    private String time;

    private String HOST = "jdbc:postgresql://localhost:5432/DBzak";

    private String userName = "postgres";
    private String password = "6742";
    private Connection connection;

    public Zakaz() {
        id = 0;
        kolvo = 0;
        city = "";
        time = "";
    }

    public Zakaz(final Integer id, final Integer kolvo,
                 final String city, final String time) {
        this.id = id;
        this.kolvo = kolvo;
        this.city = city;
        this.time = time;
    }
    public void setZakaz(){
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            String sql = ("INSERT INTO public.zakaz(\n" +
                    "\tid, kolvo, city, \"time\")\n" +
                    "\tVALUES (?, ?, ?, ?);");
            PreparedStatement preparedStmt = connection.prepareStatement(sql);
            preparedStmt.setInt(1, id);
            preparedStmt.setInt(2, kolvo);
            preparedStmt.setString(3, city);
            preparedStmt.setString(4, time);
            preparedStmt.executeUpdate();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
