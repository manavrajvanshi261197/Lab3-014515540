import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import './login.css';

export default class OwnerLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
    }
    handleInput(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    login(e){
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
        }

        if(  data.email === "" || data.password === ""){
            console.log("Invalid data, Cannot Login");
        }else{
            
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/restaurant/signin',data)
                .then(response => {

                    if(response.status === 200){
                        console.log(cookie.load('ownerData'));
                        if( cookie.load('authCookie') === "authenticated"){
                            this.setState({
                                auth : true
                            })
                        }
                    }else if(response.status === 201){
                        console.log(response.status+" error "+ response.data);
                        alert("Incorrect Password");
                    }else if(response.status === 202){
                        console.log(response.status+" error "+ response.data);
                        alert("No User with the given credentials.");
                    }else if(response.status === 203){
                        console.log("Error in first if in backend - restaurant - signin")
                    }          
                }).catch(error=>{
                    console.log("Error: "+JSON.stringify(error));
                }
            );
        }   
    }
    
    render(){

        let redirect = null;
        if (cookie.load('authCookie')==="authenticated"){
            redirect = <Redirect to = "/ownerHome"/>
        }
        return(
            <div className = "loginContainer" >
                
                {redirect}
                <h2 className = "heading">Sign in with your Grubhub owner account</h2>
                <form onSubmit = {this.login} className = "loginForm">
                    <table border = "0" style={{margin:'auto'}}>
                        <tbody>
                            <tr>
                                <div>
                                    <label className = "heading">
                                        Email
                                    </label>
            
                                    <td>
                                        <input className ="inputField" type = "email" name = "email" onChange = {this.handleInput} value = {this.state.email} size = "45" required/>
                                    </td>
                                </div>
                            </tr>

                            <tr>
                                <div>
                                    <label  className = "heading">
                                        Password 
                                    </label>
                                    <td>
                                        <input className ="inputField" type = "password" name = "password" onChange = {this.handleInput} size = "45" required/>
                                    </td>
                                </div>
                                
                            </tr>

                            <tr>
                                <td colSpan = "2" align = "center">
                                    <input className = "inputButton" type = "submit" name = "signin" value = "SIGN IN"/>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        )
    }
}

