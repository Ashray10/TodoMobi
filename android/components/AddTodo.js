import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, Button } from "react-native";
import DatePicker from 'react-native-date-picker'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';


export default function AddTodo({ route, navigation }) {
  const [title, setTitle] = React.useState();
  const [deadline, setDeadline] = React.useState(new Date());
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(new Date());

  const {email}=route.params;

  const submit = async() =>{
    try {
        const details = {title: title,
                        deadline: deadline,
                        status: false}
        const temp = await AsyncStorage.getItem(JSON.stringify(email))
        var userData;
        if(temp!=null){
            userData = JSON.parse(temp);
        }else{
            userData = []
        }
        userData.push(details);
        await AsyncStorage.setItem(
          JSON.stringify(email), JSON.stringify(userData)
        );
        // console.log(await AsyncStorage.getItem("user"))
        navigation.navigate('TodoPage', {email: email})
    }catch (error) {
        console.log(error);
    }
  }
  const back = () =>{
    console.log("back");
  }

  const helper = (date)=>{
    setDate(date);
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let finalDate = day + '/' + month + '/' + year;
    // console.log(finalDate);
    setDeadline(finalDate);
  }

//   const 
  
  return (
    <SafeAreaView style={styles.box}>
        <Text style={styles.header}>
        Todo App
        </Text>
        <View style={styles.form}>
            <Text style={styles.formHeader}>
            Add-Todo
            </Text>
            <TextInput
                style={styles.input}
                value={title}
                placeholder="Title"
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                value={deadline}
                placeholder="Deadline"
                // onChangeText={setDeadline}
                onPressIn={() => setOpen(true)}
            />
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={
                    (date) => {
                    helper(date)
                    setOpen(false)
                }
                }
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TouchableOpacity onPress={submit} style={styles.Button}>
                <Text>Add</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=> navigation.navigate('TodoPage', {email: email})} style={styles.Button}>
                <Text>Todo</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: "bold",
    marginBottom: 40
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
  input:{
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 40
  },
  Button:{
    marginTop:50,
    borderRadius: 20,
    backgroundColor:"#841584",
    height:40,
    width: 200,
    justifyContent:"center",
    alignItems: 'center',
  }
});