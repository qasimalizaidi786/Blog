
import React, { useState } from 'react'
import { View,Text, KeyboardAvoidingView,Image, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import {auth} from '../Screen/Firebase'

const Login = ({navigation}) => {
    const[email,setEmail]=useState('')
    const[passward,setPassward]=useState('')

    const LoginUser= async ()=>{ 
      if(email===""|| passward===""){
        Alert.alert("Please Fill the blank")
        return
      }
      try{
        await auth.signInWithEmailAndPassword(email, passward)
       
      }
       catch(err){
         Alert.alert('Some went Wrong Please Try Again Later')
       }
    
    }
    return (
        <KeyboardAvoidingView style={{backgroundColor:'white'}} behavior="position"  >
            <View style={{alignItems:"center"}}>
                <Image style={styles.image} source={require('../assets/logo1.jpg')}/>
                </View>
            <Text style={{fontSize:22,textAlign:"center",fontWeight:"bold",marginTop:10 }}>Please Login</Text>
            <View style={styles.input}>
            <TextInput
      label="Email"
      mode="outlined"
      value={email}
      onChangeText={text => setEmail(text)}
    />
     <TextInput
      label="Passward"
      mode="outlined"
      secureTextEntry    right={<TextInput.Icon name="eye"  />}
      value={passward}
      onChangeText={text => setPassward(text)}
    />
    <Button  mode="contained" onPress={() => {LoginUser()}}>
     Login
    </Button>   
    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} ><Text style={{textAlign:'center'}}>Create an New Account? Sign Up </Text>
    </TouchableOpacity> 

    </View>
    </KeyboardAvoidingView>
            
        
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },

    image:{
      height:200,
      width:170,
      borderRadius:90
    },
    input:{
        paddingHorizontal:50,
        height:"50%",
        justifyContent:'space-evenly'
        
    }
    
  });
