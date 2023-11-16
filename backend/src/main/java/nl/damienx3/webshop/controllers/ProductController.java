package nl.damienx3.webshop.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import nl.damienx3.webshop.models.Product;
import nl.damienx3.webshop.models.Response;
import nl.damienx3.webshop.repositories.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<Response> getProducts() {
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Response.error("No products found"));
        }

        return ResponseEntity.ok(Response.success("Got products", products));
    }

    @GetMapping("{id}")
    public ResponseEntity<Response> getProduct(@PathVariable long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            String message = String.format("Product (%d) found", id);

            return ResponseEntity.ok(Response.success(message, product));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error("Product doesn't exist"));
    }

    @PostMapping
    public ResponseEntity<Response> saveProduct(@Valid @RequestBody(required = false) Product product,
            BindingResult bindingResult) {
        try {
            if (product == null) {
                return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED)
                        .body(Response.error("Product information is missing"));
            }

            // TODO: Fix error handling
            if (bindingResult.hasFieldErrors()) {
                List<String> errors = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getField() + " " + error.getDefaultMessage())
                        .collect(Collectors.toList());

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Response.error("Failed to save product", errors));
            }

            product = productRepository.save(product);

            if (product.getId() > 0) {
                return ResponseEntity.ok(Response.success("Product saved", product));
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Response.error("Failed to save product", e.getMessage()));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error("Failed to save product"));
    }

    @PutMapping("{id}")
    @Transactional
    public ResponseEntity<Response> updateProduct(@PathVariable long id, @RequestBody Product request) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            updateFields(product, request);
            productRepository.save(product);

            String message = String.format("Product (%d) updated", id);
            return ResponseEntity.ok(Response.success(message, product));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error("Product doesn't exist"));
    }

    @DeleteMapping("{id}")
    @Transactional
    public ResponseEntity<Response> deleteProduct(@PathVariable long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            productRepository.delete(product);

            return ResponseEntity.ok(Response.success("Product deleted"));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error("Product doesn't exist"));
    }

    private void updateFields(Product product, Product request) {
        product.setSku(request.getSku());

        product.setImage(request.getImage());
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());

        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setStatus(request.getStatus());
        product.setPublishAt(request.getPublishAt());

        product.setWeight(request.getWeight());
        product.setWidth(request.getWidth());
        product.setLength(request.getLength());
        product.setHeight(request.getHeight());

        product.setSalePrice(request.getSalePrice());
        product.setSaleStart(request.getSaleStart());
        product.setSaleEnd(request.getSaleEnd());
    }
}
