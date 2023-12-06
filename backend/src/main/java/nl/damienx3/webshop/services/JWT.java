package nl.damienx3.webshop.services;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import nl.damienx3.webshop.models.User.Role;

@Service
@PropertySource("classpath:secrets.properties")
public class JWT {
    private static String SECRET_KEY;
    private static final long EXPIRATION_TIME = 1 * 1000 * 3600 * 24;

    @Value("${SECRET_KEY}")
    public void setSecretKey(String secretKey) {
        JWT.SECRET_KEY = secretKey;
    }

    public static String generateToken(long id, Role role) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);
        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
                .subject(Long.toString(id))
                .claim("role", role)
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    public static Claims getClaims(String jwtToken) {
        SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();
    }
}
