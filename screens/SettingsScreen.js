import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state={
          emailId:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          docID:''
        }
      }
    
    getUserDetails(){
        var user = firebase.auth().currentUser
        var email = user.emailId
        db.collection("users").where("email_id","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data()
                this.setState({
                    emailId:data.email_id,
                    lastName:data.last_name,
                    firstName:data.first_name,
                    address:data.address,
                    contact:data.contact,
                    docID:doc.id
                })
        })})
    }  

    updateUserDetails=(()=>{
        db.collection("users").doc(this.state.docID.update({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address
        }))
        alert("User Details updated succesfully");
    })

    componentDidMount(){
        this.getUserDetails()
    }
    
    render(){
        return(
            <View style={{backgroundColor:'#ffe8ef'}}>
                <Text style={styles.title}> Settings </Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(text)=>{
                    this.setState({firstName:text})
                }}
                placeholder = "First Name"
                value = {this.state.firstName}
                />
                <TextInput
                style={styles.textInput}
                onChangeText={(text)=>{
                    this.setState({lastName:text})
                }}
                placeholder = "Last Name"
                value = {this.state.lastName}
                />
                 <TextInput
                style={styles.textInput}
                onChangeText={(text)=>{
                    this.setState({contact:text})
                }}
                placeholder = "Contact"
                value = {this.state.contact}
                keyboardType = 'numeric'
                />
                 <TextInput
                style={styles.textInput}
                onChangeText={(text)=>{
                    this.setState({address:text})
                }}
                placeholder = "Address"
                value = {this.state.address}
                multiline = {true}
                />
                <TouchableOpacity
                style={styles.saveButton}
                onPress={()=>{
                    this.updateUserDetails();
                }}
                >
                    <Text style={styles.buttonText}> Save </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title :{
        fontSize:65,
        fontWeight:'300',
        color : '#000000',
        textAlign:'center',
        marginTop:10
      },
      textInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffffff',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      saveButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      buttonText:{
        color:'#000000',
        fontSize:15,
        fontWeight:'bold'
      }
})