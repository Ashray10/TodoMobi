// import Realm from "realm";
// import {Tasks} from "./Tasks"

// const schema = [Tasks]

// const realm = Realm.open({
//     path: "task",
//     schema: [Tasks],
// });

// export const insertTodo =(todo)=>new Promise((resolve, reject) => {
//     console.log(todo);
//     realm.write(() => {
//         realm.create("Tasks", todo);
//         resolve(todo);
//     })
// }).catch((error) => {
//     reject(error);
// })

// // {
// //     realm.write(() =>{
// //         realm.create("Tasks", todo);
// //     })
// //     return todo;
// // }

// export const getAll =()=>{
//     const Todo = realm.objects("Tasks")
//     return Todo;
// }

import Realm from "realm";

export const TODO_SCHEMA = "Tasks3";

const TodoSchema = {
    name: TODO_SCHEMA,
    properties: {
    //   _id: "int",
      title: "string",
      deadline: "string?",
      status: "string",
      type: "bool"
    },
    primaryKey: "title",
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema]
}

// let realm = Realm.open(databaseOptions);

// export const insertNewTodo = newTodo => 
// realm.write(() => {
//     realm.create(TODO_SCHEMA, newTodo);
// })

export const insertNewTodo = newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodo);
            resolve(newTodo);
        })
    }).catch((error) => {
        reject(error);
    })
})


export const queryAllTodos = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA);
        // console.log(allTodos);
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const deleteAllTodos = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA);
        // console.log(allTodos);
        allTodos.forEach(todo=>{
            realm.write(() => {
                realm.delete(todo);
            });
        })
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const updateTodos = (myTodo) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
        myTodo.status = JSON.stringify(!JSON.parse(myTodo.status))
    });
        resolve(myTodo);
    }).catch(error => {
        reject(error);
    })
})

export const deleteTodos = (title) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        // console.log(title);
        let allTodos = realm.objects(TODO_SCHEMA).filtered(`title == '${title}'`);
        // console.log(title);
        allTodos.forEach(todo=>{
            console.log(todo)
            realm.write(() => {
                todo.status = JSON.stringify(!JSON.parse(todo.status))
            });
        })
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})