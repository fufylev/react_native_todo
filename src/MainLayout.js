import React, { useState, useContext } from "react";
import { Alert, StatusBar, StyleSheet, View, Platform } from "react-native";
import Constants from "expo-constants";
import { THEME } from "./theme";
import NavBar from "./components/NavBar";

import MainScreen from "./screens/MainScreen";
import TodoScreen from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
  const [todoId, setTodoId] = useState(null);
//   const [todos, setTodos] = useState([]);

//   const addTodo = title => {
//     setTodos(prev => [
//       {
//         id: Date.now().toString(),
//         title,
//       },
//       ...prev,
//     ]);
//   };

//   const removeTodo = id => {
//     Alert.alert(
//       "Todo delete",
//       "Are you sure?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             setTodoId(null);
//             setTodos(prev => prev.filter(todo => todo.id !== id));
//           },
//         },
//       ],
//       { cancelable: false },
//     );
//   };

//   const updateTodo = (id, title) => {
//     setTodos(prev =>
//       prev.map(todo => {
//         if (todo.id === id) {
//           todo.title = title;
//         }
//         return todo;
//       }),
//     );
//   };

  let content = (
    <MainScreen
      addTodo={addTodo}
      removeTodo={removeTodo}
      todos={todos}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={Platform.OS === "ios" ? "#fff" : THEME.MAIN_COLOR}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <NavBar title='Todo App' />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 10,
    flex: 1,
  },
});
