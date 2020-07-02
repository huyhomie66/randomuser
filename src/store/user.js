import {action, thunk} from 'easy-peasy';
import {getNewUser} from './services';
import {setItem, getItem} from '@randomuser/utils/asyncStorage';
import moment from 'moment';

export default {
  currentUser: {},
  users: [],
  favoriteUsers: [],

  setCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
  setFavoriteUsers: action((state, payload) => {
    const newFavoriteUsers = [...state.favoriteUsers, ...payload];
    state.favoriteUsers = newFavoriteUsers.filter(
      (v, i, arr) =>
        arr.map((user) => user.name.value).indexOf(v.name.value) === i,
    );
  }),

  addFavoriteUser: thunk(async (actions, payload) => {
    const favoriteUser = (await getItem('@favoriteUser')) || [];
    await setItem('@favoriteUser', [...favoriteUser, payload]);
  }),

  getFavoriteUsers: thunk(async (actions) => {
    const favoriteUser = (await getItem('@favoriteUser')) || [];
    actions.setFavoriteUsers(favoriteUser);
  }),

  getUser: thunk(async (actions, payload, helpers) => {
    const {getState} = helpers;
    const state = getState();

    let users = [];
    await Promise.all(
      [1, 2, 3].map(async () => {
        try {
          const user = await getNewUser().then((res) => res[0].user);
          const {
            gender,
            name: {first, last},
            picture,
            phone,
            password,
            dob,
            location: {street, city},
          } = user;
          console.log(dob);
          const param = {
            gender: {
              title: 'Hi, My name is',
              value: gender,
            },
            dob: {
              title: 'My birthday is',
              value: dob,
            },
            name: {
              title: 'My name is ',
              value: `${first} ${last}`,
            },
            picture: {
              value: picture,
            },
            location: {title: 'My address is', value: `${street} ${city}`},
            phone: {
              title: 'My phone number is',
              value: phone,
            },
            password: {
              title: 'My password is',
              value: password,
            },
          };
          users.push(param);
        } catch (error) {
          console.log(error);
        }
      }),
    );
    actions.setUsers([...state.users, ...users]);
  }),
};
