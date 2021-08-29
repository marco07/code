import React, {useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import LoginForm from './LoginForm';
import RegistrarForm from './RegistrarForm';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const changeForm = () =>{
        setIsLogin(!isLogin);
    }
    return (
        <View style={styles.view}>
            <Image 
               style={styles.logo}
               source={require('../assets/code.png')}
            />
            {
                isLogin ? (
                    <LoginForm changeForm={changeForm} />
                ):(
                    <RegistrarForm changeForm={changeForm} />
                )
            } 
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    logo:{
        width:210,
        height:205,
        marginTop:50,
        marginBottom:50

    }
})
