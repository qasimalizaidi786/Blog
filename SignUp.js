import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,ToastAndroid, TouchableOpacity, Alert } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {auth} from "../Screen/Firebase"



const SignUp = ({navigation}) => {
  const [text, setText] = useState('');
  const [passward, setPassward] = useState('');

  const SignUser= async ()=>{ 
    if(text===""|| passward===""){
      Alert('something went wrong')
      // ToastAndroid.show('Please fill in the blank', ToastAndroid.SHORT);   
         return
    }
    try{
      await auth.createUserWithEmailAndPassword(text, passward)
      Alert.alert('user Created')

      // ToastAndroid.show('User Created successfully!', ToastAndroid.SHORT)
      ;}

     catch(err){
      Alert.alert('something went wrong')

      // ToastAndroid.show('Something Went Wrong!', ToastAndroid.SHORT);
     }
  }
  return (

       <KeyboardAvoidingView style={{backgroundColor:'white'}} behavior="position">
         <View style={styles.box1}>
         <Image style={{width:200,height:200}} source={require('../assets/logo1.jpg')}/>
         <Text style={{fontSize:22}}>Please SignUp </Text>
         </View>
         <View style={styles.box2}>
         <TextInput
      label="Email"
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
    />
     <TextInput
      label="Passward"
      mode="outlined"
      value={passward}
      secureTextEntry={true}
      onChangeText={text => setPassward(text)}
    />
    <Button mode="contained" onPress={() => SignUser()
    }>
    SignUp
  </Button>
    <TouchableOpacity mode="contained" onPress={() => navigation.goBack("Login")}>
    <Text style={{textAlign:'center'}}>Have an Account? Login</Text>
  </TouchableOpacity>
         </View>
       </KeyboardAvoidingView>
       

       
     );
}


const styles = StyleSheet.create({
  box1:{
    alignItems:'center'
  },
  box2:{
    paddingHorizontal:60,
    height:"50%",
    justifyContent:'space-evenly'
    
  }
    
  });
  

export default SignUp
