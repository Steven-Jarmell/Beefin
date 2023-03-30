package com.beefin.services.filter;

import com.beefin.services.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private RestTemplate template;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            // Check if the route is secured or not
            if (validator.isSecured.test(exchange.getRequest())) {
                // If the route is secured, check if header contains the token or not
                if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Missing authorization header");
                }

                // If the token is there, get it
                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                // Once we get the token, check if its valid
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    // Remove empty space at the start of the token
                    authHeader = authHeader.substring(7);
                }

                try {
                    // Rather than make a network call, we can copy the logic over from the auth-service
                    // Making a call to the auth-service for validation can be exploited
                    jwtUtil.validateToken(authHeader);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException("Token is not valid");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {

    }
}
