package nl.damienx3.webshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.damienx3.webshop.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Additional methods can be added here if needed
}