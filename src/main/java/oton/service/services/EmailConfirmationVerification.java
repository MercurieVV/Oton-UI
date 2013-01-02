package oton.service.services;

import oton.service.entities.ConfirmedEmail;

import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * Created by IntelliJ IDEA.
 * User: MercurieVV. email:mercurievvss@gmail.com skype: grobokopytoff or mercurievv
 * Date: 12.17.12
 * Time: 22:00
 */
@Singleton
public class EmailConfirmationVerification {
    @PersistenceContext
    EntityManager entityManager;
    public Boolean isEmailConfirmationOk(String email, String code) {
        if(email == null || email.equals(""))
            return false;
        if(code == null || code.equals(""))
            return false;
        ConfirmedEmail confirmedEmail = entityManager.find(ConfirmedEmail.class, email);
        if(confirmedEmail == null)
            return false;
        if(!confirmedEmail.getVerificationCode().equals(code))
            return false;
        confirmedEmail.setVerified(true);
        return true;
    }
}
