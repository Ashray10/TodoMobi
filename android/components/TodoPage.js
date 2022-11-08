import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { deleteAllTodos, queryAllTodos, updateTodos } from './Schema/Realm';

export default function TodoPage({route, navigation}) {

  const curr = {
    Todo: "Todo",
    Done: "Done",
    Overdue: "Overdue"
  }
  
  const[todos, setTodos] = useState([]);
  const[done, setDone] = useState([]);
  const[overdue, setOverdue] = useState([]);
  const[page, setPage] = useState(curr.Todo);
  const {email}=route.params;

  const getTodo=async()=>{
    const value= await queryAllTodos();
    // console.log(value);
    setTodos(value.filtered("status=='false'"));
    setDone(value.filtered("status=='true'"));
    // console.log(todos.filtered("deadline>new Date()"));
  }
  useEffect(()=>{
    getTodo()
    console.log("Im here")
  },[])
  
  const Item = ({item}) => {
   return(
     <TouchableOpacity style={(page==="Todo")?styles.rowTodo:styles.rowDone} 
     onPress={async()=>{
      const res = await updateTodos(item)
      getTodo()
      console.log(Date(item.deadline))
    }}>
      <Image source={{uri: item.type?
          'https://www.clipartmax.com/png/middle/249-2492279_office-material-business-bag-icon-png.png':
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZBhFuga5It6fb5qEcWhfnW52XYG3pdA0eeA&usqp=CAU'
          }}
          style={styles.img} />
      <View style={styles.textContainer}>
       <Text style={styles.listText}>{item.title}</Text>
       <Text style={styles.listText}>{item.deadline}</Text>
       </View>
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
         data={
          (page==="Todo")
          ?todos:done
          // ?todos:{(page==="Done")?done:overdue}
          // if(page===curr.Todo){
          //   return todos;
          // }else{
          //   return done;
          // }
        }
         renderItem={Item}
         style={styles.list}
       />
       
       <View style={styles.statusBar}>
        <TouchableOpacity onPress={()=>{setPage("Todo")}}>
          <Text style={(page==="Todo")?styles.statusTodo:
            styles.statusText} >Peding</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage("Done")}}>
          <Text style={(page==="Done")?styles.statusDone:
            styles.statusText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage(curr.Overdue)}}>
          <Text style={(page===curr.Overdue)?styles.statusOverdue:
            styles.statusText}>OverDue</Text>
        </TouchableOpacity>
       </View>
       <TouchableOpacity style={styles.button} onPress={async()=> {
        navigation.navigate('AddTodo', {email:email})
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
    flexDirection:"row",
    alignItems: "center",
    backgroundColor: "#fffdfc",
    borderRadius: 8,
    borderLeftColor: "#5341a3",
    borderLeftWidth: 5,
    margin: 6,
    height: 80
  },
  rowDone:{
    flexDirection:"row",
    justifyContent: "center",
    backgroundColor: "#fffdfc",
    borderRadius: 8,
    borderLeftColor: "#29913f",
    borderLeftWidth: 5,
    margin: 6,
    height: 80
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
    height:570,
    backgroundColor: "#d7d9d7",
    paddingTop: 40,
    borderRadius: 15
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
    alignItems: "center",
    width: "90%",
    position: "absolute",
    top: "20%",
    right: "0%",
    borderWidth:1,
    height: 50,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#fffdfc",
  },
  statusText:{
    fontSize: 20
  },
  listText:{
    fontSize: 18,
  },
  boxTodo:{
    backgroundColor: "#5341a3"
  },
  boxDone:{
    backgroundColor: "#29913f"
  },
  statusTodo:{
    fontSize: 20,
    color: "#5341a3",
    // backgroundColor: "#34c6eb"
  },
  statusDone:{
    fontSize: 20,
    color: "#29913f"
  },
  img:{
    width: 80,
    height: 80
  },
  textContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%"
  }
})
