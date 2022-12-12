import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',    
      alignContent:"center", 
    }, 
    menu:{
      flexDirection: "row",
      paddingTop: 40,
      paddingBottom: 10,
      width:"100%",
      backgroundColor: "#545454",
      alignItems: "center",
      justifyContent: "center",

  },
  button__logout:{
      textAlign:'left',
      marginLeft:10,
  },
  button__voltar:{
    marginLeft:10,
  }, 
  button__contato:{
    textAlign:'right',
    marginRight:10,
},

  menu__title:{
      width: "80%",
      fontWeight: "bold",
      fontSize:25,
      color: "#fff",
      textAlign:"center",
      marginRight:"auto",
  },
  menu__title_home:{
    width: "80%",
    fontWeight: "bold",
    fontSize:25,
    color: "#fff",
    textAlign:"center",
    marginRight:"auto",
},
    botoes:{
      justifyContent:"flex-end",
      alignItems:"center",
      textAlign:"center",
      marginBottom:40,
      paddingHorizontal:40,
    },
    login_cadastro_contato:{
      flex:1,
      justifyContent:"flex-end",
      width:"80%",   
      alignSelf:"center",
    },
    login__msg:(text="none") => ({
      fontWeight:"bold",
      fontSize:22,
      color:"#FF0000",
      marginTop:5,
      marginBottom:15,
      display: text,
  }),
    inputLogin:{   
      justifyContent:"flex-end", 
    },  
    button:{      
      backgroundColor:"#1670F7",
      paddingVertical:8,
      alignItems:"center",
      marginBottom:8,
      width:"90%",
      },
    textoBotao:{
      fontSize:25,
      color:"#fff"
    }
});
export {css};