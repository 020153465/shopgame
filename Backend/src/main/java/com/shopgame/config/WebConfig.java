package com.shopgame.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${COVER_UPLOAD_PATH:/app/static/assets/covers/}")
    private String coverUploadDir;
    
    @Value("${MUSIC_UPLOAD_PATH:/app/static/assets/music/}")
    private String musicUploadDir;
    
    @Bean
    public StandardServletMultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter());
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static assets from classpath (existing seeded images)
        registry.addResourceHandler("/api/assets/**")
                .addResourceLocations("classpath:/static/assets/");
        
        // Serve uploaded cover images (overrides classpath for new uploads)
        registry.addResourceHandler("/api/assets/covers/**")
                .addResourceLocations("file:" + coverUploadDir, "classpath:/static/assets/covers/");
        
        // Serve uploaded music files (overrides classpath for new uploads)
        registry.addResourceHandler("/api/assets/music/**")
                .addResourceLocations("file:" + musicUploadDir, "classpath:/static/assets/music/");
    }
} 