import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View, Image, TouchableOpacity } from "react-native";


export default App = () => {
  const [text, onChangeText] = React.useState();
  const [number, onChangeNumber] = React.useState();
  const [secure, setSecure] = React.useState(true);
  const [verify, setVerify] = React.useState(false);

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    onChangeText(text);
    if (reg.test(text) === true) {
      setVerify(true);
    }
  }

  const submit = () =>{
    console.log("submit");
  }

  const handleSignup = () =>{
    console.log("submit");
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
            value={text}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Image source={{uri: verify? 
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png':
          'https://image.shutterstock.com/image-photo/image-260nw-785374789.jpg'
          }}
          style={styles.img} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Password"
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={handleSecure}>
          <Image 
          source={{uri: secure? 
            'https://cdn1.vectorstock.com/i/1000x1000/62/10/eye-icon-vector-23766210.jpg':
            'https://cdn1.iconfinder.com/data/icons/hawcons/32/699007-icon-21-eye-hidden-512.png'
            }}
            style={styles.img} />
          </TouchableOpacity>
        </View>
        <Button
          onPress={submit}
          title="Login"
          color="#841584"
        />
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
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight:10
  },
  box: {
    height: "100%",
    backgroundColor: '#9fa1a0',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10
  },
  formHeader: {
    fontSize: 30,
    textAlign: 'center'
  },
  form:{
    flexDirection: "column",
    padding: 10,
    backgroundColor: '#f5f7f7'
  },
  baseText:{
    margin: 10
  },
  innerText: {
    color: 'blue'
  },
  inputBox:{
    alignItems: "center",
    flexDirection: "row"
  },
  img:{
    width: 30,
    height: 30
  }
});

