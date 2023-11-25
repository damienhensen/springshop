package nl.damienx3.webshop.DTOs;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import org.springframework.web.multipart.MultipartFile;

import nl.damienx3.webshop.models.Product;

public class ProductDTO {
    private long id;
    private String sku;
    private String title;
    private String description;
    private double price;
    private int stock;
    private Product.Status status;
    private double weight;
    private double width;
    private double length;
    private double height;
    private double salePrice;

    @Nullable
    private MultipartFile image;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime publishAt;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime saleStart;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime saleEnd;

    public ProductDTO() {
        this.status = Product.Status.HIDDEN;
    }

    public void generateSku(long id) {
        this.sku = String.format("P%05d", id);
    }

    public long getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public MultipartFile getImage() {
        return image;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public Product.Status getStatus() {
        return status;
    }

    public LocalDateTime getPublishAt() {
        return publishAt;
    }

    public double getWeight() {
        return weight;
    }

    public double getWidth() {
        return width;
    }

    public double getLength() {
        return length;
    }

    public double getHeight() {
        return height;
    }

    public double getSalePrice() {
        return salePrice;
    }

    public LocalDateTime getSaleStart() {
        return saleStart;
    }

    public LocalDateTime getSaleEnd() {
        return saleEnd;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setStatus(Product.Status status) {
        this.status = status;
    }

    public void setPublishAt(LocalDateTime publishAt) {
        this.publishAt = publishAt;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }

    public void setSaleStart(LocalDateTime saleStart) {
        this.saleStart = saleStart;
    }

    public void setSaleEnd(LocalDateTime saleEnd) {
        this.saleEnd = saleEnd;
    }

    public Product toProduct() {
        Product product = new Product();
        product.setSku(sku);
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setStatus(status);
        product.setPublishAt(publishAt);
        product.setWeight(weight);
        product.setWidth(width);
        product.setLength(length);
        product.setHeight(height);
        product.setSalePrice(salePrice);
        product.setSaleStart(saleStart);
        product.setSaleEnd(saleEnd);

        return product;
    }

    public File getImageFile() throws IOException {
        // Create a temporary file
        File file = File.createTempFile("temp", null);

        // Copy the contents of the MultipartFile to the temporary file
        try {
            Files.copy(image.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return file;
        } catch (IOException e) {
            // Handle the exception, e.g., log it or throw a custom exception
            e.printStackTrace();
            throw e;
        }
    }
}
