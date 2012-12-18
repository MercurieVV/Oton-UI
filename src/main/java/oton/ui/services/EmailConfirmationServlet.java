package oton.ui.services;

import oton.service.services.EmailConfirmationVerification;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by IntelliJ IDEA.
 * User: MercurieVV. email:mercurievvss@gmail.com skype: grobokopytoff or mercurievv
 * Date: 12.17.12
 * Time: 01:19
 */
//@WebServlet("/oo")
@WebFilter("/*")
public class EmailConfirmationServlet implements Filter {
    @Inject
    private EmailConfirmationVerification emailConfirmationVerification;
    @PersistenceContext
    EntityManager entityManager;
    private FilterConfig filterConfig;

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String requestURI = httpServletRequest.getRequestURI();

        if (requestURI.contains("/css")
                || requestURI.contains("/images")
                || requestURI.contains("/js")
                || requestURI.contains("/fonts")
                || requestURI.contains("/Service-1.0")
                || requestURI.contains("/rest")
                ) {
            filterChain.doFilter(request, response);
            return;
        }
        String email = getParam(httpServletRequest, "email");
        String code = getParam(httpServletRequest, "code");
        Boolean emailConfirmed = emailConfirmationVerification.isEmailConfirmationOk(email, code);
        if(emailConfirmed) {
            filterChain.doFilter(request, response);
            return;
        }
        httpServletRequest.getRequestDispatcher("/confirm_email_form.html").forward(request, response);
        //filterChain.doFilter(request, response);
    }

    private String getParam(HttpServletRequest httpServletRequest, String paramName) {
        Cookie[] cookies = httpServletRequest.getCookies();
        String urlParam = httpServletRequest.getParameter(paramName);
        if (urlParam != null && !urlParam.equals(""))
            return urlParam;
        String cookieParam = findCookie(cookies, paramName);
        if (cookieParam != null && !cookieParam.equals(""))
            return cookieParam;
        return null;
    }

    private String findCookie(Cookie[] cookies, String name) {
        if(cookies == null)
            return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name))
                return cookie.getValue();
        }
        return null;
    }

    public FilterConfig getFilterConfig() {
        return filterConfig;
    }

    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
    }

    public void destroy() {
    }
}
