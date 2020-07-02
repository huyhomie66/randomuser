import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Carousel from 'react-native-snap-carousel';
import UserCar from '@randomuser/components/UserCard';

const {width} = Dimensions.get('window');

export default () => {
  const {getUser} = useStoreActions((actions) => actions.user);
  const {users} = useStoreState((states) => states.user);

  let carousel = useRef();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {users.length === 0 ? (
        <View>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <Carousel
          useScrollView={false}
          containerCustomStyle={{backgroundColor: '#FE3C72'}}
          contentContainerCustomStyle={{
            alignItems: 'center',
          }}
          scrollEnabled={false}
          ref={carousel}
          data={users}
          renderItem={({item, index}) => {
            return <UserCar key={index} item={item} carousel={carousel} />;
          }}
          sliderWidth={width}
          itemWidth={width * 0.8}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});
