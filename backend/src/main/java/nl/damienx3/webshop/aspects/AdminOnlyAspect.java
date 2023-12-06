package nl.damienx3.webshop.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import nl.damienx3.webshop.exceptions.UnauthorizedException;
import nl.damienx3.webshop.models.User.Role;
import nl.damienx3.webshop.services.JWT;

@Aspect
@Component
public class AdminOnlyAspect {
    @Before("@annotation(nl.damienx3.webshop.annotations.AdminOnly)")
    public void beforeAdminOnly(JoinPoint joinPoint) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String authHeader = request.getHeader("Authorization");

            if (authHeader == null) {
                throw new UnauthorizedException("Missing Bearer token");
            }

            String jwtToken = authHeader.substring("Bearer ".length());
            String roleString = String.valueOf(JWT.getClaims(jwtToken).get("role"));
            Role role = Role.valueOf(roleString);

            if (!role.equals(Role.ADMIN)) {
                throw new UnauthorizedException("You are unauthorized to consume this service");
            }
        }
    }
}
