package nl.damienx3.webshop.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    @JsonProperty
    private boolean success;

    @JsonProperty
    private String message;

    @JsonProperty
    private Object data;

    public Response(String message) {
        this.message = message;
    }

    public Response(String message, Object data) {
        this(message);
        this.data = data;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static Response success(String message) {
        Response response = new Response(message);
        response.setSuccess(true);

        return response;
    }

    public static Response success(String message, Object data) {
        Response response = success(message);
        response.setData(data);

        return response;
    }

    public static Response error(String message) {
        Response response = new Response(message);
        response.setSuccess(false);

        return response;
    }

    public static Response error(String message, Object data) {
        Response response = error(message);
        response.setData(data);

        return response;
    }
}
