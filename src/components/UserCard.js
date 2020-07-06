import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import FeatherIcon from 'react-native-vector-icons/Feather';

const IconRow = ({props, icon, setCurrentField, currentField}) => {
  return (
    <View style={styles.iconRow}>
      {icon.map((item, index) => {
        const [isSelected, setSelect] = useState(false);

        return (
          <FeatherIcon.Button
            onPress={(e) => {
              if (icon[index] === item) {
                setSelect(!isSelected);
              }
              console.log('state', item.state);
              setCurrentField(item.state);
            }}
            key={index}
            {...props}
            style={[
              currentField === item.state
                ? styles.iconButton
                : styles.iconButtonSelected,
            ]}
            name={item.iconName}
          />
        );
      })}
    </View>
  );
};

const UserDescription = ({item, icon, props}) => {
  const [currentField, setCurrentField] = useState(item.name);

  return (
    <View style={styles.card}>
      <Image
        style={{height: 100, width: 100, borderRadius: 50}}
        source={{uri: item.picture.value}}
      />

      <Text style={styles.title}>{currentField && currentField.title}</Text>
      <Text style={styles.description}>
        {currentField && currentField.value}
      </Text>

      <IconRow
        props={props}
        icon={icon}
        currentField={currentField}
        setCurrentField={setCurrentField}
      />
    </View>
  );
};

export default ({item, carousel}) => {
  const props = {
    iconStyle: styles.icon,
    backgroundColor: 'white',
  };

  const icon = [
    {iconName: 'user', state: item.name},
    {iconName: 'calendar', state: item.dob},
    {iconName: 'map-pin', state: item.location},
    {iconName: 'phone', state: item.phone},
    {iconName: 'lock', state: item.password},
  ];

  const {addFavoriteUser, getUser} = useStoreActions((actions) => actions.user);
  const {users} = useStoreState((states) => states.user);

  const onSwipe = async () => {
    await getUser();
  };

  return <UserDescription item={item} icon={icon} props={props} />;
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {color: 'gray', paddingTop: 30, fontWeight: '500'},
  description: {fontSize: 20, fontWeight: '400'},
  iconRow: {flexDirection: 'row', paddingVertical: 15},
  iconButton: {
    borderTopColor: 'green',
    borderTopWidth: 1,
  },
  iconButtonSelected: {
    borderTopWidth: 0,
  },
  icon: {
    marginRight: 0,
    paddingHorizontal: 12,
    fontSize: 24,
    alignSelf: 'center',
    color: 'black',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
