package com.example.springwebapp.controller;

import com.example.springwebapp.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collections;

@Controller
public class Category {
    @GetMapping("/category/{food}")
    public String getFood(Model model, HttpSession session) {
        Product product = new Product();
        ArrayList<Product> products = product.getFood();
        model.addAttribute("products", products);
        return "index:: .main-content";
    }
    @GetMapping("/category/{notFood}")
    public String getNotFood(Model model, HttpSession session) {
        Product product = new Product();
        ArrayList<Product> products = product.getNotFood();
        model.addAttribute("products", products);
        return "index:: .main-content";
    }
}
