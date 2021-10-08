import React, { useState,useEffect} from 'react'
import {Text, View,Platform, Alert} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {stg,db,auth} from '../Firebase'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';





// const blog=createContext()


const Create = () => {
    const [Title,setTitle]=useState('')
    const [Decs,setDecs]=useState('')
    const [Image,setImage]=useState(null)
    const[ loading,setloading]=useState(false)

    



    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    
  
        
    //     const blob= await new Promise((resolve ,reject)=>{
    //       const xhr= new XMLHttpRequest();
    //       xhr.onload=function(){
    //           resolve(xhr.response);
    //       }
    //       xhr.onerror=function(){
    //           reject(new TypeError('Network Request failed'))
    //       }
    //       xhr.responseType='blob';
    //       xhr.open('GET',Image,true);
    //       xhr.send(null);
    //   })
    //   const ref=stg.ref().child(new Date().toISOString());
    //   const snapshot= ref.put(blob);
    //   snapshot.on(stg.STATE_CHANGED,()=>{
    //   setloading(true)
    //   },
    //   (error)=>{
    //     setloading(false)
    //  console.log(error)
     
    //  return
    //   },
    //   ()=>{
    //     snapshot.snapshot.ref.getDownloadURL().then((url)=>{
    //       console.log("download url :",url)
    //       Alert.alert('uploded SuccesFuly')
          
      //     return url
      //   })
      // }
      // )
    }

    
      
      const Uploadimage=async()=>{
        
        const blob= await new Promise((resolve ,reject)=>{
            const xhr= new XMLHttpRequest();
            xhr.onload=function(){
                resolve(xhr.response);
            }
            xhr.onerror=function(){
                reject(new TypeError('Network Request failed'))
            }
            xhr.responseType='blob';
            xhr.open('GET',Image,true);
            xhr.send(null);
        })
        const ref=stg.ref().child(new Date().toISOString());
        const snapshot= ref.put(blob);
        snapshot.on(stg.STATE_CHANGED,()=>{
        setloading(true)
        },
        (error)=>{
          setloading(false)
       console.log(error)
       
       return
        },
        ()=>{
          snapshot.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("download url :",url)
            Alert.alert('uploded SuccesFuly')
            
            return url
          })
        }
        )
       
      }
     
      let id=uuidv4()
      const newBlog={
            Title,
            Decs,
            Image,
            id,
            uid: auth.currentUser.uid
      }
      const newData = async () => {
        try{
         await db.collection('ads').doc(newBlog.id)
          .set(newBlog )
            Alert.alert('posted your ad!')
          }
          catch(err){
            Alert.alert('Something Weng Wrong Try Again Later')
          }
      }     
     

        

 
    return (
      
        <View>
          <Text style={{fontSize:32,fontWeight:'bold',fontStyle:'italic',textAlign:'center',marginTop:10,marginBottom:10}}>Create a Blog!</Text>
            <TextInput
        label="Title"
        mode="outlined"
        value={Title}
        onChangeText={text => setTitle(text)}
        
      />
      <TextInput
        label="Description "
        mode="outlined"
        numberOfLines={5}
        multiline={true}
        value={Decs}
        onChangeText={text => setDecs(text)}
      />
      <Button color='black' mode="contained" onPress={() => pickImage()}>
        Upload
      </Button>
      
      <Button color='black' disabled={Image && Title && Decs?false:true }  mode="contained" onPress={() => {Uploadimage();newData()} }>
        post
      </Button>

        </View>


        

    )
    }

export default Create 


