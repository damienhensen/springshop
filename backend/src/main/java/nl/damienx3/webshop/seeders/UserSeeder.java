package nl.damienx3.webshop.seeders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import nl.damienx3.webshop.models.User;
import nl.damienx3.webshop.models.User.Role;
import nl.damienx3.webshop.repositories.UserRepository;

@Component
public class UserSeeder implements CommandLineRunner {
    private final UserRepository userRepository;

    @Autowired
    public UserSeeder(UserRepository userRepository) {
        System.out.println("Seeding users...");
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User admin = new User("damien@damienx3.nl", "123123123", Role.ADMIN);
        User customer = new User("customer@damienx3.nl", "123123123");
        List<User> users = List.of(admin, customer);

        userRepository.saveAll(users);

        System.out.println("Users seeded");
    }
}
