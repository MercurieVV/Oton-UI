package oton.service.services;

import org.mockito.Mockito;
import org.testng.AssertJUnit;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import oton.service.entities.ConfirmedEmail;

import javax.persistence.EntityManager;

/**
 * Created by IntelliJ IDEA.
 * User: MercurieVV. email:mercurievvss@gmail.com skype: grobokopytoff or mercurievv
 * Date: 12.15.12
 * Time: 05:26
 */
public class EmailConfirmationVerificationTest {
    private EmailConfirmationVerification emailConfirmationService = new EmailConfirmationVerification();
    @SuppressWarnings("FieldCanBeLocal")
    private EntityManager entityManager;
    private ConfirmedEmail confirmedEmail;

    @BeforeMethod
    public void setUp() {
        entityManager = Mockito.mock(EntityManager.class);
        emailConfirmationService.entityManager = entityManager;
        confirmedEmail = new ConfirmedEmail("olo", "lol");
        Mockito.when(entityManager.find(ConfirmedEmail.class, "olo")).thenReturn(confirmedEmail);
    }

    @Test
    public void verified() throws Exception {
        AssertJUnit.assertFalse(confirmedEmail.getVerified());
        Boolean emailConfirmed = emailConfirmationService.isEmailConfirmationOk("olo", "lol");
        AssertJUnit.assertTrue(emailConfirmed);
    }

    @Test
    public void notVerified() throws Exception {
        Boolean emailConfirmed = emailConfirmationService.isEmailConfirmationOk("olo", "lole");
        AssertJUnit.assertFalse(emailConfirmed);
    }

    @Test
    public void testEntityNotFound() throws Exception {
        Boolean emailConfirmed = emailConfirmationService.isEmailConfirmationOk("pep", "lol");
        AssertJUnit.assertFalse(emailConfirmed);
    }

    @Test
    public void noNullPointerException() throws Exception {
        emailConfirmationService.isEmailConfirmationOk(null, "lol");
        emailConfirmationService.isEmailConfirmationOk("", "lol");
        emailConfirmationService.isEmailConfirmationOk("olo", null);
        emailConfirmationService.isEmailConfirmationOk("olo", "");
    }

    @Test
    public void charactersIsOk(){
        ConfirmedEmail confirmedEmail = new ConfirmedEmail("email");
        String verificationCode = confirmedEmail.getVerificationCode();
        AssertJUnit.assertTrue(verificationCode, verificationCode.matches("^\\w+$"));
        //System.out.println("confirmedEmail1.getVerificationCode() = " + confirmedEmail1.getVerificationCode());
    }
}
