package src.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
    private String username;
    private String password;
    private String name;
    private boolean isRead;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_mail", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "mail_id",
                    referencedColumnName = "mailId"))
    private List<Mail> mailList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Mail> getMailList() {
        return mailList;
    }

    public void setMailList(List<Mail> mailList) {
        this.mailList = mailList;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
