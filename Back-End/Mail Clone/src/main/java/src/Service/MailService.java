package src.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.Model.Mail;

@Service
public class MailService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void notify(Mail notification, String username) {
        simpMessagingTemplate.convertAndSendToUser(
                username,
                "/queue/notify",
                notification
        );
    }
}
