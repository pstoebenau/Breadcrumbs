import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function MapView() {
  const [data, setData] = useState({});
  let accel = data;
  let velocity = { x: 0, y: 0, z:0};
  let displacement = { x: 0, y: 0, z:0};

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };

  const _fast = () => {
    DeviceMotion.setUpdateInterval(100);
  };

  const _subscribe = () => {
    this._subscription = DeviceMotion.addListener(deviceMotionData => {
      setData(deviceMotionData.acceleration);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const _getDisplacement = (axis) => {
    let axisAccel;
    let axisVel;
    let axisDisplace;
    const timeInterval = 100/1000;

    if (axis === 'x') {
      axisAccel = accel.x;
      axisVel = velocity.x;
      axisDisplace = displacement.x;
    } else if (axis === 'y') {
      axisAccel = accel.y;
      axisVel = velocity.y;
      axisDisplace = displacement.y;
    } else if (axis === 'z') {
      axisAccel = accel.z;
      axisVel = velocity.z;
      axisDisplace = displacement.z;
    }

    axisVel += axisAccel * timeInterval;
    axisDisplace += axisVel * timeInterval;

    console.log(accel);

    if (axis === 'x') {
      accel.x = axisAccel;
      velocity.x = axisVel;
      displacement.x = axisDisplace;
    } else if (axis === 'y') {
      accel.y = axisAccel;
      velocity.y = axisVel;
      displacement.y = axisDisplace;
    } else if (axis === 'z') {
      accel.z = axisAccel;
      velocity.z = axisVel;
      displacement.z = axisDisplace;
    }

    return round(axisDisplace);
  };

  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>acceleration:</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          x: {round(accel.x)}
        </Text>
        <Text style={styles.text}>
          y: {round(accel.y)}
        </Text>
        <Text style={styles.text}>
          z: {round(accel.z)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Displacement:</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          x: {_getDisplacement('x')}
        </Text>
        <Text style={styles.text}>
          y: {_getDisplacement('y')}
        </Text>
        <Text style={styles.text}>
          z: {_getDisplacement('z')}
        </Text>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.round(10*n)/10;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
});
