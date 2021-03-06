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
public class Sort {
    @GetMapping("/sort/{ascending}")
    public String sortAscending(Model model, HttpSession session) {
        Product product = new Product();
        ArrayList<Product> products = product.getSort();
        model.addAttribute("products", products);
        return "index:: .main-content";
    }
    @GetMapping("/sort/{descending}")
    public String sortDescending(Model model, HttpSession session) {
        Product product = new Product();
        ArrayList<Product> products = product.getSortInv();
        model.addAttribute("products", products);
        return "index:: .main-content";
    }
}