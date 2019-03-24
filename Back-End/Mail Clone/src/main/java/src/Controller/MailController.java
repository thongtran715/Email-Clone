package src.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.Mail;
import src.Model.User;
import src.Repository.MailRepository;
import src.Repository.UserRepository;

import java.util.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path = "/mail/")
public class MailController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailRepository mailRepository;
    @GetMapping(path = "/receive/{username}")
    public ResponseEntity getChatHistory(@PathVariable String username) {
        User user  = userRepository.findUserByUsername(username);
        if (user == null){
            System.out.println("Here is no content");
            return null;
        }
        List<Mail> mailList = new ArrayList<>();
        for (Mail mail: mailRepository.findAllByToUser(username)){mailList.add(mail);}
        Collections.sort(mailList, new Comparator<Mail>() {
            @Override
            public int compare(Mail o1, Mail o2) {
                return o2.getMailId().compareTo(o1.getMailId());
            }
        });
        return new ResponseEntity(mailList, HttpStatus.OK);
    }
    @GetMapping(path = "/send/{username}")
    public ResponseEntity getSendChat(@PathVariable String username) {
        User user  = userRepository.findUserByUsername(username);
        if (user == null){
            return null;
        }

        return new ResponseEntity(mailRepository.findAllByFromUser(username), HttpStatus.OK);
    }
}
