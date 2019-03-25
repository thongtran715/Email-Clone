package src.Controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.Model.User;
import src.Repository.UserRepository;

import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/user")
    public User registerUser (@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping(path = "/allUsers")
    public ResponseEntity findAllUsers(){
        return new ResponseEntity(userRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(path = "/login/")
    public ResponseEntity loginUser (@RequestBody Map<String, String> map){
        JSONObject jsonObject = new JSONObject(map);
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        User user = userRepository.findUserByUsernameAndPassword(username, password);
        return new ResponseEntity(user, HttpStatus.OK);
    }



}
