import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';

export default () => {
  const {getFavoriteUsers} = useStoreActions((actions) => actions.user);
  const {favoriteUsers} = useStoreState((states) => states.user);

  useEffect(() => {
    getFavoriteUsers();
  }, []);

  console.log(favoriteUsers);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FE3C72',
        flex: 1,
      }}>
      <FlatList
        style={{
          paddingTop: 48,
        }}
        data={favoriteUsers}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          console.log(item.picture);

          return (
            <View
              key={index}
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                flex: 1,
                paddingVertical: 10,
                marginVertical: 15,
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.picture.value}}
                style={{
                  height: 60,
                  width: 60,
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{paddingLeft: 10}}>{item.name.value}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
