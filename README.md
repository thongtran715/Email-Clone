# Email-Clone
Here is the 24 hours challenge for myself learning and doing how to do an Email Application in real time. Documentation is coming soon 

# Motivation
1. Learn how to create the real time for bi-directional communication between front end and back end 
2. Learn how to use Socket client for React
3. Learn how to use Socket client for Java Spring Boot 
4. Learn how to differentiate the mail box in which person is sending , and receiving the message 

# Socket client for Spring Boot 

1. We need to first configure our Spring Boot Web Socket 
  - Create the file called WebSocketConfig
  

@We have two methods to enable Web Socket. 


    /**
     * Register Stomp endpoints: the url to open the WebSocket connection.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register the "/ws" endpoint, enabling the SockJS protocol.
        // SockJS is used (both client and server side) to allow alternative
        // messaging options if WebSocket is not available.
        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }


  - Create the Rest Controller so that client can send the request or subscribe to server channel 
     ```
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
    ```
 2. Next step is to let the react app subscribe to server channel. To do so, we need to install the library socket io
  Install 
  ```
  npm install --save react-stomp
  ```
  
  Ok, now let's send a message from react to server 
  ```
 this.clientRef.sendMessage("/app/all", JSON.stringify({"content": content, "fromUser": localStorage.getItem("username"), "toUser": sendTo, "title": title}));
  ```
  When we send the message to server, the server will respond automatically to React. So, we need to let React notice about this event. To do that, we need to do 
  
  ```
    <SockJsClient url= {DEVELOPMENT_URL + "/ws"}   topics={["/topic/all"]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              debug={ false }/>
   ```
   
   Function for OnMessageRecieve
   ```
     onMessageReceive = (msg, topic) => {
        this.setState(prevState => ({
            messages: [msg,...prevState.messages]
        }));
    };
    Whatever the server sends us the data back, we can append the data to the head of the array. 
    Cool, now we know how to use React and Spring Boot Java for Real Time Application. 
  
