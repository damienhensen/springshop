package nl.damienx3.webshop.models;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import nl.damienx3.webshop.config.Security;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public enum Role {
        CUSTOMER,
        ADMIN
    };

    public User() {
        setRole(Role.CUSTOMER);
    }

    public User(String email, String password) {
        this();

        BCryptPasswordEncoder encoder = new Security().getEncoder();

        setEmail(email);
        setPassword(encoder.encode(password));
    }

    public User(String email, String password, Role role) {
        this(email, password);

        setRole(role);
    }

    public User(String email, String password, Role role, String firstname, String lastname) {
        this(email, password, role);

        setFirstname(firstname);
        setLastname(lastname);
    }

    public long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}