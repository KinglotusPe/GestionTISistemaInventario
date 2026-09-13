package com.jireh.Sistema.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*");
    }

    @Override
    public void addViewControllers(org.springframework.web.servlet.config.annotation.ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve frontend files directly from ../frontend directory
        File frontendDir = new File("../frontend");
        if (frontendDir.exists()) {
            String location = frontendDir.toURI().toString();
            if (!location.endsWith("/")) {
                location += "/";
            }
            registry.addResourceHandler("/**")
                    .addResourceLocations(location, "classpath:/static/", "classpath:/public/");
        }
    }
}
