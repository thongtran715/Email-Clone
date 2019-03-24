package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import src.Model.Mail;
import src.Model.User;
import src.Repository.MailRepository;
import src.Repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class SendMailController {
    @Autowired
    private UserRepository userRepository;
    @MessageMapping("/all")
    @SendTo("/topic/all")
    public Mail post(@Payload Mail mail) {
        User user = userRepository.findUserByUsername(mail.getFromUser()) ;
        if (user == null){
            return null;
        }
        List<Mail> mailList = user.getMailList();
        mailList.add(mail);
        user.setMailList(mailList);
        userRepository.save(user);

        return mail;
    }

}
