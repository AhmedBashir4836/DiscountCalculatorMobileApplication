// In App.js in a new project
import React, { useState, useEffect } from 'react';
import { View, ScrollView,Text,TouchableOpacity, Button,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

function StartScreen({navigation}) {
  const [getOPrice,setOPrice] = useState();
  const [getDPercentage,setDPercentage] = useState();
  const [getHistory, setHistory] = useState([]);  
  const [getFSaving,setFSaving] = useState();
  const [getFPrice,setFPrice] = useState();
  

  React.useLayoutEffect(() =>{
    navigation.setOptions({
      headerRight : ()=>(
        <Button title="History" onPress={() =>navigation.navigate("History",{history:getHistory})}/>
      )
    })
  });
  
  const saveDiscount = () =>{
    const ogPrice = getOPrice;
    const dPercentage = getDPercentage;
    const fPrice = getFPrice;
    const detail = ogPrice+"   "+dPercentage+"  "+fPrice;

    if(isNaN(getOPrice)){
      alert("Input Field is Empty");
    }
    else if(isNaN(getDPercentage)){
      alert("Input Field is Empty");
    }
    else{
      setHistory([...getHistory, detail]);
      setOPrice("");
      setDPercentage("");
    }
   } 
  
  const countDiscountPrice = (Percentage,Price) =>{
      if(Percentage > 99){
        alert("Discount Percentage cannot be greater or equal to Original Price");
      }
      else if(isNaN(Price) || isNaN(Percentage)){
        alert("Please Enter Valid Input");
      }
      else{
        var saving = (Price * Percentage)/100 *10;
        setFSaving(saving.toFixed(2));
        var total = Price - saving;
        setFPrice(total.toFixed(2));
      }
    }

    const OriginalPrice=(value)=>{
      setOPrice(value);
      setDPercentage("");
    }

    const DiscountPercentage=(value)=>{
      
      
      console.log("Setting State with Value: " + value);
      setDPercentage(value);
      console.log("After Updating State: " + getDPercentage);
      const price = getOPrice
      countDiscountPrice(getDPercentage,price);
    }
    useEffect( () => {
      // This will print updated state and will be called after state is updated OR Rerendering
      console.log("After Updating State and Rerendering (inside UseEffect): " + getDPercentage);
    });

    return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize:20, fontWeight:'bold', borderWidth:2,padding:10,borderColor:'tomato',backgroundColor:"black"}}>Discount Calculator</Text>
        <TextInput style={styles.textContainer} onChangeText={OriginalPrice} 
         placeholder="Original Price" value={getOPrice}/>
        <TextInput style={styles.textContainer} placeholder="Discount Percentage" 
        value={getDPercentage} onChangeText={DiscountPercentage}/>
      </View>
        
        <Text style={styles.valueText}>
            You Save $: {getFSaving}
        </Text>
        <Text style={styles.valueText}>
            Final Price $: {getFPrice}
        </Text>  

      <View style={{padding:10,flex:2}}>
 
        <Button title="Save" onPress={saveDiscount}/>
      </View>

    </View>
  );
};

const HistoryScreen = ({navigation,route}) =>{
  const [newHistory,setNewHistory] = useState([route.params.history]);

  React.useLayoutEffect(() =>{
    navigation.setOptions({
      headerRight : ()=>(
        <Button title="Clear" onPress={onClear}/>
      )
    })
  });

  const onClear = () =>{
    if(newHistory.length.toString() == 0 ){
      alert("Empty");
    }
    else{
      setNewHistory([]);
    }
  }
  
  const removeItem = (itemKey) =>{
    var list = newHistory.filter(item => item.key != itemKey);
    setNewHistory([list]);
  }




  return(
    <View style={styles.container}>
      <Text style={{padding:10,borderWidth:2,fontWeight:'bold',backgroundColor:"#128C7E"}}>Original Price  -   Discount Percentage     =   Final Price</Text>
     
     
     <ScrollView style={styles.scrollView}>
          {newHistory.map((item) =>
             <View style={styles.scrollviewItem}>
              <Text style={styles.scrollText}>{item}</Text>
              <TouchableOpacity key={item.key} onPress={() => removeItem(item.key)}> 
                <View style={styles.crosstextContainer}>
                  <Text style={styles.crosstext}>X</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          </ScrollView>

    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start Screen" component={StartScreen} 
        options={{
          title: 'Start Screen',
          headerStyle: {
            backgroundColor: '#075E54',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:0,
    height:'100%',
    marginTop:2
  },
  textContainer:{
    borderWidth:2,
    padding:10,
    marginTop:5,
  },
  valueText:{
    borderBottomWidth:2,
    fontSize:15,
    fontWeight:'bold', 
    width:"80%",
    padding:10
  },
  crosstext:{
    fontSize:26,
    color:'red',
    padding:10,
    fontWeight:'bold'
  },
  scrollText:{
    padding:20,
    fontSize:20,
    color:'white',
    textAlign:"center"
  },
  scrollView:{
    width:'100%',
    flexDirection:"column"
  },
  scrollviewItem:{
    flexDirection:"column",
    justifyContent:"space-between",
    width:'100%',
    margin:5,
    padding:10,
    alignSelf:'center',
    backgroundColor:"#34B7F1",
    borderRadius:10,
  }
});

export default App;