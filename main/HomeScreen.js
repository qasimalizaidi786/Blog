import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,FlatList} from 'react-native'
import { db } from '../Firebase'
import {  Card} from 'react-native-paper';
import ReadMore from 'react-native-read-more-text-hooks'



const HomeScreen = () => {
    const [loading,setLoading]=useState(false)
    const [items,setItems]=useState([])

     
    const getDetail =async ()=>{
      const querySnap  = await db.collection('ads').get()
    
      const Display = querySnap.docs.map(docSnap=>docSnap.data()
      )
        // console.log(querySnap)
      setItems(Display)
    
    
    }
  useEffect(()=>{
    getDetail()
    return ()=>{
      console.log('cleanup')
    }
    },[])
   
 
    const _renderTruncatedFooter = (handlePress: () => void ) => {
      return (
        <Text style={{ marginTop: 5 }} onPress={handlePress}>
          Read more
        </Text>
      );
    };
    
     
    const _renderRevealedFooter = (handlePress: () => void ) => {
      return (
        <Text style={{ marginTop: 5 }} onPress={handlePress}>
          Show less
        </Text>
      );
    };
    
    const _handleTextReady = () => {
      // ...
    };
  
    const MyComponent = (item) => {

        return(
            
            <Card style={styles.card}>
             <Card.Cover source={{ uri: item.Image }} resizeMode={'cover'}/>
              <Card.Title title= {item.Title} />
              <Card.Content>
              <Card.Content></Card.Content>

              <ReadMore
      numberOfLines={3}
      renderTruncatedFooter={_renderTruncatedFooter}
      renderRevealedFooter={_renderRevealedFooter}
      onReady={_handleTextReady}
    >
      <Text>{item.Decs}</Text>
    </ReadMore>

</Card.Content>
              
            </Card>
            
        )
        }

        return (
            <View>
                <FlatList
                data={items.reverse()}
                keyExtractor={ (item,index) =>  index.toString()}
                renderItem={({item})  =>MyComponent(item)  }
                onRefresh={()=>{
                  setLoading(true)
                  getDetail()
                  setLoading(false)
              }}
              refreshing={loading}
    
                />
            </View>
        )
}

export default HomeScreen
const styles = StyleSheet.create({
    card:{
        margin:10 ,
        elevation:2,
        
        
    },
    textStyle: {
      fontSize: 14,
    },
  
      
    });