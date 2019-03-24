import React from "react";
import SockJsClient from "react-stomp";
import MailList from "./MailListReceive";
const DEVELOPMENT_URL = "http://localhost:8080";

export default class Email extends React.Component {
    constructor(props) {
        super(props);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.state = {
            clientConnected: false,
            messages: [],
            allUsers :[]
        };
    }

    onMessageReceive = (msg, topic) => {
        this.setState(prevState => ({
            messages: [msg,...prevState.messages]
        }));
    };
    async fetchMessages(){
        const url = DEVELOPMENT_URL + "/mail/receive/tienle123";
        const response = await fetch(url);
        const body = await response.json();
        var meggs = [];
        for (let i = 0 ; i < body.length; ++i) {
            meggs.push(body[i]);
        }
        this.setState({
            messages: [...this.state.messages, ...meggs]
        });
    };
    async componentDidMount() {
        this.fetchMessages();
        this.fetchAllUsers();
    }
    async fetchAllUsers(){
        const url = DEVELOPMENT_URL + "/allUsers";
        const response = await fetch(url);
        const body = await response.json();
        var users = [];
        for (let i = 0 ; i < body.length; ++i) {
            var contact = {
                key: body[i]['username'],
                value: body[i]['username']
            };
            users.push(contact);
        }
        this.setState({
            allUsers: [...this.state.allUsers, ...users]
        });
    }
    onSendMessage = (sendTo, title, content) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify({"content": content, "fromUser": "thongtran715", "toUser": sendTo, "title": title}));
            return true;
        } catch(e) {
            return false;
        }
    };
    render() {
        return (
            <div>
                <MailList messages={this.state.messages} allUsers ={this.state.allUsers} onSendMessage={this.onSendMessage}/>
                <SockJsClient url= {DEVELOPMENT_URL + "/ws"}   topics={["/topic/all"]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              debug={ false }/>

            </div>
        );
    }
}