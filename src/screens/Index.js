import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import Questions from "./Questions";
import { Link } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.intro}>TEST YOUR BRAIN, WHAT WILL YOUR TOP SCORE BE?</Text>
            <View style={styles.block}>
                <Text style={styles.paragraph}>You will be asked 10 True or False questions across different categories.</Text>
                <Text style={[styles.paragraph, styles.bold, styles.mt10]}>Can you score 100%?</Text>
            </View>
            
            <Link to={'Questions'} style={styles.start_button} underlayColor="#f0f4f7">
              <View style={styles.button_content}>
                <Text style={styles.start_text}>START</Text>
                <Text style={styles.start_text}>QUIZ</Text>
              </View>
            </Link>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    intro: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#f33d73",
        padding: 10
    },
    mt10:{
        marginTop: 10
    },
    bold:{
        fontWeight:"bold"
    },
    block: {
        marginBottom: 20,
        marginTop: 20
    },
    paragraph: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        lineHeight: 25
    },
    start_button: {
        backgroundColor: "#2ea617",
        borderColor: "#2d9119",
        borderWidth: 10,
        height: 130,
        width: 130,
        borderRadius: 50,
        marginTop:50
    },
    button_content: { 
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    start_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
});