package com.utils;

import java.net.URI;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;
@Component
public class CustomAuthenticationHandler implements ServerAuthenticationSuccessHandler {


	@Override
	public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
		Set<String> roles=AuthorityUtils.authorityListToSet(authentication.getAuthorities());
		System.out.println(roles);
		ServerWebExchange exchange=webFilterExchange.getExchange();
		String redirectUrl;
		if(roles.contains("Customer")) {
			redirectUrl="/customer";
		}
		else if(roles.contains("Restaurant")) {
			redirectUrl="/restaurant";
		}
		else {
			redirectUrl="/success";
		}
		
		exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.ACCEPTED);
		exchange.getResponse().getHeaders().setLocation(URI.create(redirectUrl));
        return exchange.getResponse().setComplete();
		
	}

	

}
