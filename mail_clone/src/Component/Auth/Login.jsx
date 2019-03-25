import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardLink } from 'reactstrap';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Form,  ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
const DEVELOPMENT_URL = "http://localhost:8080";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});
class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    logInfo = {
        username: "",
        password: ""
    } ;
    async handleSubmit(event){
        event.preventDefault();
        const body = JSON.stringify(this.logInfo);
        const url = DEVELOPMENT_URL + "/login/";
        axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response) ;
            localStorage.setItem("username", this.logInfo.username);
            window.location.reload();
        });
    }
    handleChange(event){
        const name = event.target.name;
        this.logInfo[name] = event.target.value;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
                <Card className={classes.card}>
                    <Form onSubmit={this.handleSubmit}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <TextField
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={this.handleChange}
                                    autoComplete="username"
                                    margin="normal"
                                    required
                                />
                                <br></br>
                                <TextField
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    autoComplete="password"
                                    margin="normal"
                                    required
                                />
                            </Typography>
                            <Typography component="p">
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup>
                                <Button variant="outlined" color="primary" className={classes.button} type="submit">Log in </Button>
                                <Button variant="outlined" color="secondary" className={classes.button} onClick={this.signUp}> Sign up </Button>
                            </ButtonGroup>
                        </CardActions>
                        <CardActions>
                            <CardLink href="" >Forget username?</CardLink>
                        </CardActions>
                        <CardActions>
                            <CardLink href="">Forget password?</CardLink>
                        </CardActions>
                    </Form>
                </Card>
            </div>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
