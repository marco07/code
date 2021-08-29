import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {validateEmail} from '../utils/Validation';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () =>{
        let errors = {};
        if(!formData.email || !formData.password){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
        }
        else if(!validateEmail(formData.email)){
            errors.email= true;
        }else{
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                console.log("Ok");
            }).catch(()=>{
                setFormError({
                    email:true,
                    password:true,
                })
            })
        }
        setFormError(errors);
    }

    const onChange =(e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }


    return (
        <>
         <TextInput 
            style={[styles.input, formError.email && styles.errorInput]}
            placeholder="Correo electronico"
            placeholderTextColor="#969696"
            onChange={(e)=>onChange(e, 'email')}
         />
         <TextInput 
            style={[styles.input, formError.password && styles.errorInput]}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            secureTextEntry
            onChange={(e)=>onChange(e, 'password')}
         />
         <TouchableOpacity onPress={login}>
             <Text style={styles.btnText}>Iniciar Sesion</Text>
         </TouchableOpacity>
         <View style={styles.registro}>
         <TouchableOpacity onPress={changeForm}>
             <Text style={styles.btnText}>Registrate</Text>
         </TouchableOpacity>
         </View>
        </>
    )
}

function defaultValue(){
    return{
        email:'',
        password:''
    }
}

const styles = StyleSheet.create({
    btnText:{
        color:'#212121',
        fontSize:18
    },
    input:{
        height:50,
        color: '#212121',
        width:'80%',
        marginBottom:25,
        backgroundColor:'#f1f1f1',
        paddingHorizontal:20,
        borderRadius:50,
        fontSize:18,
        borderWidth:1,
        borderColor:'#555'
    },
    registro:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:15
    },
    errorInput:{
        borderColor:'#940c0c'
    }
})
