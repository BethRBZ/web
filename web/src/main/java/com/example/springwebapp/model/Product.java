package com.example.springwebapp.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class Product {

    private Integer id;
    private String title;
    private String description;
    private Integer price;
    private String img;
    private String category;

    private String HOST = "jdbc:postgresql://localhost:5432/DBzak";

    private String userName = "postgres";
    private String password = "6742";
    private Connection connection;

    public Product() {
        id = 0;
        title = "";
        description = "";
        price = 0;
        img = "";
        category = "";
    }

    public Product(final Integer id, final String title,
                   final String description, final Integer price, final String img, final String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
        this.category = category;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setPrice(final Integer price) {
        this.price = price;
    }

    public String getImg() {
        return this.img;
    }

    public void setImg(final String img) {
        this.img = img;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(final String category) {
        this.category = category;
    }

    public ArrayList<Product> getProduct() {
        ArrayList<Product> products = new ArrayList<>();
        Product product;
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM shop");
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                int price = rs.getInt("price");
                String img = rs.getString("img");
                String category = rs.getString("category");
                product = new Product(id, title, description, price, img, category);
                products.add(product);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }
    public ArrayList<Product> getSort() {
        ArrayList<Product> products = new ArrayList<>();
        Product product;
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM shop order by price");
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                int price = rs.getInt("price");
                String img = rs.getString("img");
                String category = rs.getString("category");
                product = new Product(id, title, description, price, img, category);
                products.add(product);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }
    public ArrayList<Product> getSortInv() {
        ArrayList<Product> products = new ArrayList<>();
        Product product;
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM shop order by price DESC");
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                int price = rs.getInt("price");
                String img = rs.getString("img");
                String category = rs.getString("category");
                product = new Product(id, title, description, price, img, category);
                products.add(product);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }
    public ArrayList<Product> getFood() {
        ArrayList<Product> products = new ArrayList<>();
        Product product;
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM shop where category = 'Food'");
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                int price = rs.getInt("price");
                String img = rs.getString("img");
                String category = rs.getString("category");
                product = new Product(id, title, description, price, img, category);
                products.add(product);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }
    public ArrayList<Product> getNotFood() {
        ArrayList<Product> products = new ArrayList<>();
        Product product;
        try{
            connection = DriverManager.getConnection(HOST, userName, password);
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM shop where category = 'Not Food'");
            while (rs.next()) {
                int id = rs.getInt("id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                int price = rs.getInt("price");
                String img = rs.getString("img");
                String category = rs.getString("category");
                product = new Product(id, title, description, price, img, category);
                products.add(product);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }


}
