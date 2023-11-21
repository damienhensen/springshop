package nl.damienx3.webshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import nl.damienx3.webshop.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Additional methods can be added here if needed
    @Query(value = "SELECT LAST_INSERT_ID() + 1")
    public long getNextId();
}