package nl.damienx3.webshop.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3 {
    private final Environment env;
    private final S3Client s3Client;
    private final String bucketName;

    @Autowired
    public S3(Environment env) {
        this.env = env;
        String accessKeyId = env.getProperty("aws.access_key");
        String secretAccessKey = env.getProperty("aws.secret_key");
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);

        this.s3Client = S3Client.builder()
                .region(Region.EU_WEST_2)
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();

        this.bucketName = env.getProperty("aws.bucket_name");
    }

    public String saveObject(MultipartFile object, String folder) throws IOException {
        File file = convertToFile(object);
        String newFilename = LocalDateTime.now().getNano()
                + "." + FilenameUtils.getExtension(object.getOriginalFilename());
        String key = newFilename;

        if (!folder.isBlank()) {
            key = folder + "/" + key;
        }

        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build(), file.toPath());

        return env.getProperty("aws.cloudfront_url") + key;
    }

    private File convertToFile(MultipartFile multipartFile) throws IOException {
        // Create a temporary file
        File file = File.createTempFile("temp", null);

        // Copy the contents of the MultipartFile to the temporary file
        try {
            Files.copy(multipartFile.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return file;
        } catch (IOException e) {
            // Handle the exception, e.g., log it or throw a custom exception
            e.printStackTrace();
            throw e;
        }
    }
}
