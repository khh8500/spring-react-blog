package shop.mtcoding.blog._core.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import shop.mtcoding.blog._core.filter.CorsFilter;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {

    @Value("${allow.host}")
    private String host;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter(){
        System.out.println("CORS 필터 등록");
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(host));
        bean.addUrlPatterns("/*");
        bean.setOrder(0); // 낮은 번호부터 실행됨.
        return bean;
    }
}