package src.Repository;

import org.springframework.data.repository.CrudRepository;
import src.Model.Mail;

public interface MailRepository extends CrudRepository<Mail, Long> {
    Iterable<Mail>  findAllByToUser(String username);
    Iterable<Mail> findAllByFromUser(String username);
}
