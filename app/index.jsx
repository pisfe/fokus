import { IconPause, IconPlay } from "@/components/Icons";
import { useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { FokusButton } from "../components/FokusButton/";
import { Timer } from "../components/Timer/";

const pomodoro = [
  {
    id: 'focus',
    initialValue: 15 * 60,
    image: require('./pomodoro.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue: 5 * 60,
    image: require('./curto.png'),
    display: 'Pausa Curta'
  },
  {
    id: 'long',
    initialValue: 25 * 60,
    image: require('./longo.png'),
    display: 'Pausa Longa'
  },
];

export default function Index() {

  const [timerType, setTimerType] = useState(pomodoro[0]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds,setSeconds] = useState(pomodoro[0].initialValue);

  const timerRef = useRef(null);

  const clear = () => {
    if (timerRef.current != null){
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimerRunning(false);
    }

  }

  const toggleTimerType = (newTimerType) => {
    setTimerType(newTimerType)
    setSeconds(newTimerType.initialValue)
    clear()
  }

  const toggleTimer = () => {
    if (timerRef.current){
      clear()
      return
    }

    setTimerRunning(true);

    const id = setInterval(() => {
      setSeconds(oldState => {
        if (oldState === 0){
          clear();
          return timerType.initialValue;
        }
        return oldState -1;
      })


    }, 1000);
    timerRef.current = id;
  }

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
              onPress={() => toggleTimerType(p)}
              display={p.display}
            ></ActionButton>
          ))}
        </View>
        <Timer totalSeconds={seconds}></Timer>
        <FokusButton 
          title = {timerRef.current ? 'Pausar' : 'Começar'}
          icon = {timerRef.current ? <IconPause></IconPause> : <IconPlay></IconPlay>}
          onPress={toggleTimer}
        />
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
