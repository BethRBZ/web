package com.example.springwebapp.controller;

import com.example.springwebapp.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by Denis on 2/20/2016.
 */

@Controller
public class Home {
    @RequestMapping("/")
    public String homeWithSession(Model model, HttpSession session, HttpServletRequest req) throws UnsupportedEncodingException {
        Cookie[] cookie = req.getCookies();
        String sid = session.getId();
        String cityValue = cookie[0].getValue();
        model.addAttribute("sid", sid);

        Product product = new Product();
        ArrayList<Product> products = product.getProduct();
        model.addAttribute("products", products);
        cityValue = URLDecoder.decode(cityValue, StandardCharsets.UTF_8.toString());
        model.addAttribute("cityCookie", cityValue);
        return "index";
    }
}
