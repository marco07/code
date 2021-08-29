import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, StatusBar, View, Button} from 'react-native';
import firebase from './src/utils/firebase';
import Auth from './src/components/Auth';
import 'firebase/auth';

export default function App(){
  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((response)=>{
      setUser(response);
    });
  }, []);

  if(user===undefined) return null;
return(

  <>
    <StatusBar barStyle='light-content'/>
    <SafeAreaView style={styles.background}>
      {user ? <Logout /> : <Auth />}
    </SafeAreaView>
  </>
)

}
function Logout(){
  const logout = () =>{
    firebase.auth().signOut();
  }
  return(
    <View>
      <Text>Estas Logeado</Text>
      <Button title="Cerrar Sesión" onPress={logout}/>
    </View>
  )

}


const styles = StyleSheet.create({
  background:{
    backgroundColor:'#6DEDFC',
    height:'100%'
  }
})