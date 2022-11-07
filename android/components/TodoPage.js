import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

export default function TodoPage({route, navigation}) {

  const[todos, setTodos] = useState([]);
  const[page, setPage] = useState("Todo");
  const {email}=route.params;

  const getTodo=async()=>{
    const temp = await AsyncStorage.getItem(JSON.stringify(email))
    if(temp!=null){
      setTodos(JSON.parse(temp));
    }
  }

   const updateTodo = async ()=> {
    try {
        await AsyncStorage.removeItem(email);
        await AsyncStorage.setItem(
          JSON.stringify(email), JSON.stringify(todos)
        );
        getTodo()
        return true;
    }
    catch(exception) {
        return false;
    }}

  useEffect(()=>{
    getTodo()
    console.log("Im here")
  },[])
  
  const Item = ({item}) => {
   return(
     <TouchableOpacity style={(page==="Todo")?styles.rowTodo:styles.rowDone} 
     onPress={()=>{item.status = !item.status
     updateTodo()}}>
       <Text style={styles.listText}>{item.title}</Text>
       <Text style={styles.listText}>{item.deadline}</Text>
     </TouchableOpacity>
   );
 }
 
 return (
   <SafeAreaView>
     <View style={(page==="Todo")?styles.boxTodo:
            styles.boxDone}>
       <Text style={styles.header}>Welcome {JSON.stringify(email)} </Text>
       <Text style={styles.smallHeader}>Todo App</Text>
       
       <FlatList
         data={(page==="Todo")?todos.filter((e)=>{return !e.status})
         :todos.filter((e)=>{return e.status})}
         renderItem={Item}
         style={styles.list}
       />
       <View style={styles.statusBar}>
        <TouchableOpacity onPress={()=>{setPage("Todo")}}>
          <Text style={(page==="Todo")?styles.statusTodo:
            styles.statusText} >Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage("Done")}}>
          <Text style={(page==="Done")?styles.statusDone:
            styles.statusText}>Done</Text>
        </TouchableOpacity>
       </View>
       <TouchableOpacity style={styles.button} onPress={async()=> {navigation.navigate('AddTodo', {email:email})
       console.log("press")
       }}>
           <Text style={styles.add}>+</Text>
       </TouchableOpacity>
       </View>
   </SafeAreaView>
 )
}
const styles = StyleSheet.create({
  rowTodo:{
    flexDirection: "row",
    justifyContent: "space-around",
    height: 35,
    backgroundColor: "#fffdfc",
    borderRadius: 5,
    borderLeftColor: "#5341a3",
    borderLeftWidth: 3,
    margin: 10,
    height: 50
  },
  rowDone:{
    flexDirection: "row",
    justifyContent: "space-around",
    height: 35,
    backgroundColor: "#fffdfc",
    borderRadius: 5,
    borderLeftColor: "#29913f",
    borderLeftWidth: 3,
    margin: 10,
    height: 50
  },
  button:{
    width:60,
    height:60,
    backgroundColor: "#eb4034",
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: "absolute",
    top: "90%",
    right: "40%",
    alignItems: "center",
    justifyContent: "center"
  },
  add:{
    fontSize:40
  },
  list:{
    height:500,
    backgroundColor: "#d7d9d7",
    paddingTop: 40,
  },
  header:{
    fontSize: 25,
    margin: 20,
  },
  smallHeader:{
    fontSize: 30,
    margin: 20,
    marginBottom: 60,
    alignSelf: "center"
  },
  statusBar:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    position: "absolute",
    top: "22%",
    right: "9%",
    borderWidth:1,
    height: 50,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#fffdfc",
  },
  statusText:{
    fontSize: 30
  },
  listText:{
    fontSize: 18
  },
  boxTodo:{
    backgroundColor: "#5341a3"
  },
  boxDone:{
    backgroundColor: "#29913f"
  },
  statusTodo:{
    fontSize: 30,
    color: "#5341a3"
  },
  statusDone:{
    fontSize: 30,
    color: "#29913f"
  },
})
