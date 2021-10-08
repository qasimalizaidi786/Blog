import React from 'react'
import { Button, View ,StyleSheet,Image} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'



const OnBoard = ({navigation}) => {
    return (
        <Onboarding
        onSkip={()=>navigation.navigate('Login')}
        onDone={()=>navigation.navigate('Login')}

  pages={[
    {
      backgroundColor: '#a6e4d0',
      image : <Image style={styles.image} source={require('../assets/with.png')} />,
      title: 'Welcome',
      subtitle: 'Let the Spot Lite Capture You..',
    },
    {
        backgroundColor: '#fdeb93',
        image: <Image style={styles.image} source={require('../assets/for.png')} />,
        title: 'Connect to the World',
        subtitle: 'A new way connect to the World Let make a new Smile !',
      },
      {
        backgroundColor: '#e9bcbe',
        image: <Image style={styles.image} source={require('../assets/level.png')} />,
        title: 'Share your Friend',
        subtitle: 'Share Your Thought With Similer Kind of People',
      },

  ]}
/>
    )
}
  
export default OnBoard
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image:{
    height:145,
    width:147
  }
  
});
