import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

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
            <div>
                {redirect}
                <form onSubmit = {this.login} className = "loginForm">
                    <table border = "0">
                        <tbody>
                            <tr>
                                <td>
                                    Email: 
                                </td>
                                <td>
                                    <input type = "email" name = "email" onChange = {this.handleInput} value = {this.state.email} required/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Password: 
                                </td>
                                <td>
                                    <input type = "password" name = "password" onChange = {this.handleInput} required/>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan = "2" align = "center">
                                    <input type = "submit" name = "signin" value = "SIGN IN"/>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        )
    }
}

