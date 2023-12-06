package nl.damienx3.webshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Security {
    protected BCryptPasswordEncoder encoder;

    public Security() {
        encoder = new BCryptPasswordEncoder(16);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz.requestMatchers("/**").permitAll())
                .csrf((csrf) -> csrf.disable())
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    public BCryptPasswordEncoder getEncoder() {
        return encoder;
    }
}
