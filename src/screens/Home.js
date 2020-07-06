import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Carousel from 'react-native-snap-carousel';
import UserCar from '@randomuser/components/UserCard';
import Swiper from 'react-native-deck-swiper';
const {width} = Dimensions.get('window');

export default () => {
  const {getUser, addFavoriteUser} = useStoreActions((actions) => actions.user);
  const {users} = useStoreState((states) => states.user);

  const onSwipe = async () => {
    await getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        cards={users}
        renderCard={(item) => {
          return (
            <View style={styles.card}>{item && <UserCar item={item} />}</View>
          );
        }}
        onSwipedLeft={onSwipe}
        onSwipedRight={async (e) => {
          await onSwipe();
          await addFavoriteUser(users[e]);
        }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}>
        <Button
          onPress={() => {
            console.log('oulala');
          }}
          title="Press me">
          You can press me
        </Button>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    marginTop: 80,
    height: 400,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
