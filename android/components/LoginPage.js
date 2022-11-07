import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View, Image, TouchableOpacity, Alert } from "react-native";
// import nav 

export default LoginPage = ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [secure, setSecure] = React.useState(true);
  const [verify, setVerify] = React.useState(true);

  const users = {
    email: "ash@gmail.com",
    password: "pass"
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(text);
    // console.log(email);
    if (reg.test(text) === true) {
      setVerify(true);
    }else{
      setVerify(false);
    }
  }

  check=()=>{
    // console.log(users);
    console.log(email);
    console.log(password);
    if(users.email===email && users.password===password){
      return true;
    }else{
      return false;
    }
  }

  const submit = async () =>{
    console.log("Hello");
    // if(check()){
    //   navigation.navigate('TodoPage')
    // }else{
    //   Alert.alert("Wrong Password")
    // }
    console.log(email);
    console.log(password);
    await fetch(
      `http://10.0.2.2:8080/login?username=${email}&password=${password}`,
      {
        method: 'POST',
      },
    )
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          navigation.navigate('TodoPage', {email: email})
        }
      })
      .catch(e => console.log(e));
  }

  const handleSignup = () =>{
    console.log("submit");
    navigation.navigate('SignUp');
  }
  const handleSecure = () =>{
    setSecure(!secure);
  }
  
  return (
    <SafeAreaView style={styles.box}>
      <Text style={styles.header}>
        To Do App
      </Text>
      <View style={styles.form}>
        <Text style={styles.formHeader}>
          Log-in
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => validate(text)}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Image source={{uri: verify? 
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png':
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-G4CSCy3c3oJney_DIZfQB2bsusfYCIV8RJZGinM119omHGfRKkxZafM8zOmq7x-_hBA&usqp=CAU'
          }}
          style={styles.img} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={handleSecure}>
          <Image 
          source={{uri: secure? 
            'https://t4.ftcdn.net/jpg/02/97/81/83/360_F_297818320_IGxtFjWCcUEEB4uJ9Wrzn16N3lezXNhf.jpg':
            'https://cdn1.iconfinder.com/data/icons/hawcons/32/699007-icon-21-eye-hidden-512.png'
            }}
            style={styles.img} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={submit} style={styles.Button}>
            <Text>Login</Text>
        </TouchableOpacity>
        <Text style={styles.baseText}>
          New User?
          <Text style={styles.innerText} onPress={handleSignup}> SignUp</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
    flex: 1,
    marginRight:10
  },
  box: {
    height: "100%",
    backgroundColor: '#9fa1a0',
  },
  header: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold"
  },
  formHeader: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: "bold"
  },
  form:{
    height: "100%",
    marginTop: 40,
    flexDirection: "column",
    padding: 10,
    backgroundColor: '#f5f7f7',
    borderRadius: 30,
    alignItems: 'center',
  },
  baseText:{
    margin: 10
  },
  innerText: {
    color: 'blue'
  },
  inputBox:{
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1
  },
  img:{
    width: 30,
    height: 30
  },
  Button:{
    marginTop:50,
    borderRadius: 20,
    backgroundColor:"#841584",
    height:35,
    width: 200,
    justifyContent:"center",
    alignItems: 'center',
    // textDecorationColor: "#f5f7f7"
  }
});

