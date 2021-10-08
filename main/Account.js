import React, { useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity,  } from 'react-native'
import { Button, Card,  Paragraph } from 'react-native-paper';
import { auth, db } from '../Firebase';
import ReadMore from 'react-native-read-more-text-hooks'





const Account = ()=> {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  

 
  const getDetail = async () => {
    const querySnap = await db.collection('ads')

      .where('uid', '==', auth.currentUser.uid)
      .get()
    const result = querySnap.docs.map(docSnap => docSnap.data())
    // console.log(result)
    setItems(result)
  }

  useEffect(() => {
    getDetail()
    return () => {
      console.log('cleanup')
    }
  }, [])

  const _renderTruncatedFooter = (handlePress: () => void) => {
    return (
      <Text style={{ marginTop: 5, color: 'blue' }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: () => void) => {
    return (
      <Text style={{ marginTop: 5, color: 'blue' }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const _handleTextReady = () => {
    // ...
  }

   
  // 

 
 
  
      
  const MyComponent = ( item ) => {

    
      
 
    return (

      <Card style={styles.card}>



        <Card.Cover source={{ uri: item.Image }} resizeMode={'center'} />
        <Card.Title  title={item.Title} />

        <Card.Content>
              

              <ReadMore
                numberOfLines={2}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}
                onReady={_handleTextReady}
              >
                <Paragraph>
              
                  {item.Decs}
                </Paragraph>
              </ReadMore>
              
              </Card.Content>
      </Card>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "30%", justifyContent: "space-evenly", alignItems: "center", backgroundColor: 'black' }} >

        <Text style={{ fontSize: 33, fontStyle: 'italic', color: 'white' }}>{auth.currentUser.email}</Text>
        <Button color='white' mode="contained" onPress={() => auth.signOut()}>
          LogOut
        </Button>
        <Text style={{ fontSize: 42, color: 'white', fontWeight: '900' }}>Your Blog</Text>
      </View>
      <FlatList
        data={items.reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => MyComponent(item)}
        onRefresh={() => {
          setLoading(true)
          getDetail()
          setLoading(false)
        }}
        refreshing={loading}

      />

    </View>
  )
      }
const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 2,

  },
  icon: {
   
    
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
   contentContainer: { flex: 1, alignItems: 'center', },
});

export default Account
