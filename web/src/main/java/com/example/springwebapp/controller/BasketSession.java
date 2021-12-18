package com.example.springwebapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BasketSession {
    @PostMapping("/cart")
    public List<Integer> cart(@RequestParam int id, HttpSession session) {
        Integer i = id;
        String sid = session.getId();
        Object obj = session.getAttribute("cart");
        List<Integer> cart;
        if (obj == null) {

            cart = new ArrayList<>();
        } else {
            cart = (List<Integer>) obj;
        }
        cart.add(i);
        session.setAttribute("cart", cart);
        return cart;
    }

}