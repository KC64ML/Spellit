import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserEntityType } from '@/utils/Types';

type FriendsListType = {
    friends: Array<UserEntityType>,
    friendWaits: Array<UserEntityType>,
    matchRequestModalFlag: boolean,
    matchRequestPlayer: UserEntityType | null,
    matchRequestRoomId: number,
    isFriendMatch: boolean,
    isFriendMatchRequesting: boolean,
}

const initialFriends: FriendsListType = {
    friends: [],
    friendWaits: [],
    matchRequestModalFlag: false,
    matchRequestPlayer: null,
    matchRequestRoomId: 0,
    isFriendMatch: false,
    isFriendMatchRequesting: false,
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialFriends,
    reducers: {
        fillFriendsList(state, action: PayloadAction<UserEntityType>) {
            state.friends.push(action.payload);
        },
        setFriendsList(state, action: PayloadAction<Array<UserEntityType>>) {
            state.friends = action.payload;
        },
        loginFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isOnline = true;
                }
            }
        },
        logoutFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isOnline = false;
                    user.isPlaying = false;
                }
            }
        },
        playStartFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isPlaying = true;
                }
            }
        },
        playEndFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isPlaying = false;
                }
            }
        },
        fillFriendWaitsList(state, action: PayloadAction<UserEntityType>) {
            state.friendWaits.push(action.payload);
        },
        setFriendWaitsList(state, action: PayloadAction<Array<UserEntityType>>) {
            state.friendWaits = action.payload;
        },
        acceptFriendRequest(state, action: PayloadAction<UserEntityType>) {
            state.friendWaits = state.friendWaits.filter((f) =>
                !(f.id === action.payload.id)
            )
            state.friends.push(action.payload);
        },
        removeFriendWaits(state, action: PayloadAction<number>) {
            state.friendWaits = state.friendWaits.filter((f) =>
                !(f.id === action.payload)
            )
        },
        setMatchRequestModalFlag(state, action: PayloadAction<boolean>) {
            state.matchRequestModalFlag = action.payload;
        },
        setMatchRequestPlayer(state, action: PayloadAction<UserEntityType | null>) { 
            state.matchRequestPlayer = action.payload;
        },
        setMatchRequestRoomId(state, action: PayloadAction<number>) {
            state.matchRequestRoomId = action.payload;
        },
        setIsFriendMatch(state, action: PayloadAction<boolean>) {
            state.isFriendMatch = action.payload;
        },
        setIsFriendMatchRequesting(state, action: PayloadAction<boolean>) {
            state.isFriendMatchRequesting = action.payload;
        }
    },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;