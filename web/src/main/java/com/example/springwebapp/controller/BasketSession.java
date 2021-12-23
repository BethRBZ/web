package com.example.springwebapp.controller;

import com.example.springwebapp.model.Zakaz;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

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
    @PostMapping("/checkout")
    public List checkout(@RequestBody Map<String,Object> data, HttpSession session) {
        int i=1;
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd").format(Calendar.getInstance().getTime());
        for(String key: data.keySet()) {
            List list = (List) data.get(key);
            Zakaz zakaz = new Zakaz((int)list.get(i-1),(int)list.get(i), (String)list.get(i+1), timeStamp);
            zakaz.setZakaz();
            //
        }
        return null;
    }
}