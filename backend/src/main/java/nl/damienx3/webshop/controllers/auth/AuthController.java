package nl.damienx3.webshop.controllers.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.damienx3.webshop.config.Security;
import nl.damienx3.webshop.models.Response;
import nl.damienx3.webshop.models.User;
import nl.damienx3.webshop.repositories.UserRepository;
import nl.damienx3.webshop.services.JWT;

@RestController
@RequestMapping("/api")
public class AuthController {
    private UserRepository userRepository;
    private BCryptPasswordEncoder encoder;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.encoder = new Security().getEncoder();
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isEmpty()) {
            user.setPassword(encoder.encode(user.getPassword()));
            user = userRepository.save(user);

            String jwtToken = JWT.generateToken(user.getId(), user.getRole());
            return ResponseEntity.ok(Response.success("Registered successfully", jwtToken));
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("User already registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            boolean correctPassword = encoder.matches(user.getPassword(), foundUser.getPassword());

            if (correctPassword) {
                String jwtToken = JWT.generateToken(foundUser.getId(), foundUser.getRole());
                return ResponseEntity.ok(Response.success("Logged in successfully", jwtToken));
            }
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("Something went wrong"));
    }
}
