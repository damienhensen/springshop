package nl.damienx3.webshop.controllers;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import nl.damienx3.webshop.DTOs.ProductDTO;
import nl.damienx3.webshop.models.Product;
import nl.damienx3.webshop.models.Response;
import nl.damienx3.webshop.repositories.ProductRepository;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductRepository productRepository;

    @Autowired
    private Environment env;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<Response> getProducts() {
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            return ResponseEntity.ok(Response.error("No products"));
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

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("Product doesn't exist"));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Response> saveProduct(@ModelAttribute @Valid ProductDTO product) throws IOException {
        if (product == null) {
            return ResponseEntity
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .body(Response.error("Product information is missing"));
        }

        try {
            if (product.getSku() == null || product.getSku().isBlank()) {
                long id = productRepository.getNextId();
                product.generateSku(id);
            }

            String key = "products/" + LocalDateTime.now().getNano()
                    + "." + FilenameUtils.getExtension(product.getImage().getOriginalFilename());

            if (product.getImage().getSize() > 0) {
                String accessKeyId = env.getProperty("aws.access_key");
                String secretAccessKey = env.getProperty("aws.secret_key");
                String bucketName = env.getProperty("aws.bucket_name");

                AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);

                S3Client s3Client = S3Client.builder()
                        .region(Region.EU_WEST_2)
                        .credentialsProvider(StaticCredentialsProvider.create(credentials))
                        .build();

                File file = product.getImageFile();

                s3Client.putObject(PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build(), file.toPath());
            }

            Product realProduct = product.toProduct();

            if (product.getImage().getSize() > 0) {
                realProduct.setImage(env.getProperty("aws.cloudfront_url") + key);
            }

            realProduct = productRepository.save(realProduct);

            if (realProduct.getId() > 0) {
                return ResponseEntity.ok(Response.success("Product saved", realProduct));
            }
        } catch (DataIntegrityViolationException e) {
            HashMap<Object, String> errors = new HashMap<>();

            if (product.getTitle() == null || product.getTitle().isBlank()) {
                errors.put("title", "Product must have a title");
            }

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Response.error("Failed to save product", errors));
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("Failed to save product"));
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

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("Product doesn't exist"));
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

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error("Product doesn't exist"));
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
