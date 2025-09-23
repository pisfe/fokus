import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { FokusButton } from "../components/FokusButton/";
import { Timer } from "../components/Timer/";

const pomodoro = [
  {
    id: 'focus',
    initialValue: 15,
    image: require('./pomodoro.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue: 5,
    image: require('./curto.png'),
    display: 'Pausa Curta'
  },
  {
    id: 'long',
    initialValue: 25,
    image: require('./longo.png'),
    display: 'Pausa Longa'
  },
];

export default function Index() {

  const [timerType, setTimerType] = useState(
    pomodoro[2]
  )

  return (
    <View
      style={styles.container}
    >
      <Image source={timerType.image}/>
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map(p => (
            <ActionButton 
              key={p.id} 
              active={timerType.id === p.id}
              onPress={() => setTimerType(p)}
              display={p.display}
            ></ActionButton>
          ))}
        </View>
        <Timer totalSeconds={timerType.initialValue}></Timer>
        <FokusButton></FokusButton>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap: 40,
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#14448080",
    width: "80%",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#144480",
    gap: 32
  },
  footer: {
    width: '80%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontSize: 12.5
  },
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
