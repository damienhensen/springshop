package nl.damienx3.webshop.models;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Product must have an SKU")
    private String sku;

    private String image;

    @Column(nullable = false)
    @NotBlank(message = "Product must have a title")
    private String title;
    private String description;

    private double price;
    private int stock;

    @Column(nullable = false)
    private Status status;
    private LocalDateTime publishAt;

    private double weight;
    private double width;
    private double length;
    private double height;

    private double salePrice;
    private LocalDateTime saleStart;
    private LocalDateTime saleEnd;

    private enum Status {
        HIDDEN,
        PUBLIC
    };

    public Product() {
        this.status = Status.HIDDEN;
    }

    public long getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public String getImage() {
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

    public Status getStatus() {
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

    public void setImage(String image) {
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

    public void setStatus(Status status) {
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
}
