import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ReactSearchBox from 'react-search-box'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MailListReceive extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            open: false,
            sendTo: "",
            title: "",
            content: ""
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleSubmit= (sendTo, title, content) =>{
        this.props.onSendMessage(sendTo, title,content) ;
    };
    handleClose = () => {
        if (this.state.title === "" || this.state.content === "" || this.state.sendTo === ""){
            return;
        }
        this.handleSubmit(this.state.sendTo, this.state.title, this.state.content);
        this.setState({ open: false , title:"", content:""});
    };

    render() {
        const { classes } = this.props;
        var messages = this.props.messages;
        const GroupsOfMessages = messages.map(message => {
            if (message['toUser'] === "tienle123") {
                   return <ListItem alignItems="flex-start" key={message["mailId"]} button={true}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message["fromUser"]}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" className={classes.inline} color="primary" >
                                        {message["title"]}
                                    </Typography>
                                    <strong>{" — " + message["content"]}</strong>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
            }
        });

        return (
            <div>
                <List className={classes.root}>
            {GroupsOfMessages}
                </List>
                <Fab color="primary" aria-label="Add" className={classes.fab} >
                    <AddIcon onClick={this.handleClickOpen} />
                </Fab>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Compose Email
                        </Typography>
                        <Button color="inherit" onClick={this.handleClose}>
                            Send
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem >
                        <ReactSearchBox
                            placeholder="Send to"
                            data={this.props.allUsers}
                            onSelect={record => this.setState({ sendTo: record['value'] })}
                        />
                    </ListItem>
                    <ListItem >
                        <TextField
                            id="outlined-full-width"
                            label="Title"
                            style={{ margin: 8 }}
                            placeholder="Title of the email"
                            required={true}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            name="title"
                            onChange={this.handleOnChange}

                        />
                    </ListItem>
                    <Divider />
                    <ListItem >
                        <TextField
                            id="outlined-textarea"
                            label="Content"
                            placeholder="Type your content"
                            autoFocus={true}
                            multiline={true}
                            rows={10}
                            name="content"
                            required={true}
                            fullWidth
                            className={classes.textField}
                            onChange={this.handleOnChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </ListItem>
                </List>
            </Dialog>
            </div>
        );
    }
}
MailListReceive.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MailListReceive);
