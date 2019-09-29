import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

let re = null;
export default class OwnerSignup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            restaurantName :'',
            restaurantZip : ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.signup = this.signup.bind(this);
    }

    handleInput(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    signup(e){
        e.preventDefault();

        const data = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            restaurantName : this.state.restaurantName,
            restaurantZip : this.state.restaurantZip
        }
        console.log(data);
        if( data.name === "" || data.email === "" || data.password === ""){
            console.log("Invalid data, Cannot signup");
        }else{
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/restaurant/signup',data)
                .then(response => {
                    if(response.status === 200){
                        alert("Sucessfully Signed Up, please update your profile after logging in.");
                        re = <Redirect to = '/ownerLogin'/>
                        this.setState({
                            signedup :true
                        })
                    }else if(response.status === 201){
                        alert("Error Signing up.");
                        console.log(response.data);
                    }else if(response.status === 202){
                        alert(response.data);
                    }
                }).catch(error=>{
                    console.log("Error: "+JSON.stringify(error.data));
                }
            );
        }
        
    }
    render(){
        return(
            <div>
                {re}
                <form onSubmit = {this.signup}>
                    <table border = "0">
                        <tbody>
                            <tr>
                                <td>
                                    Name: 
                                </td>
                                <td>
                                    <input type = "text" name = "name" pattern = "[A-Za-z ]+" title="Alphabets Only" onChange = {this.handleInput} value = {this.state.name} autoFocus required/>
                                </td>
                            </tr>

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
                                    <input type = "password" name = "password" onChange = {this.handleInput} required />
                                </td>
                            </tr>

                            
                            <tr>
                                <td>
                                    Restaurant Name: 
                                </td>
                                <td>
                                    <input type = "text" name = "restaurantName" onChange = {this.handleInput}  value = {this.state.restaurantName} required />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Restaurant Zip: 
                                </td>
                                <td>
                                    <input type = "number" name = "restaurantZip" onChange = {this.handleInput}  value = {this.state.restaurantZip}required />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan = "2" align = "center">
                                    <input type = "submit" name = "signup" value = "SIGN UP"/>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        )
    }
}



