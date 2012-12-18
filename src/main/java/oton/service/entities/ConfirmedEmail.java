package oton.service.entities;

import org.apache.commons.lang3.RandomStringUtils;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by IntelliJ IDEA.
 * User: MercurieVV. email:mercurievvss@gmail.com skype: grobokopytoff or mercurievv
 * Date: 12.15.12
 * Time: 03:36
 */
@Entity
public class ConfirmedEmail {
    @Id
    private String email;

    protected ConfirmedEmail() {
    }

    public ConfirmedEmail(String email) {
        this.email = email;
        this.verificationCode = RandomStringUtils.random(32, true, true);
        this.isVerified = false;
    }

    @Deprecated
    public ConfirmedEmail(String email, String verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
        isVerified = false;
    }

    public String getEmail() {
        return email;
    }

    private String verificationCode;

    public String getVerificationCode() {
        return verificationCode;
    }

    private Boolean isVerified;

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}
