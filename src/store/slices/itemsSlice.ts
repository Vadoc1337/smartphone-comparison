import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {TCharacteristic, TItemsState, TItems, GetItemsWithSearchParams} from '../../declarations';

import api from '../../services/api';
import {SPECIFICATIONS_TITLES} from '../../services/constants';

const initialState: TItemsState = {
    items: [],
    searchedItems: [],
    exceptions: '',
    specifications: [],
    loadingItems: true,
    loadingSearch: true,
    errorItems: null,
    errorSearch: null,
};

export const fetchItems = createAsyncThunk<TItems[], number>(
    'items/fetchItems',
    async function (limit, {fulfillWithValue, rejectWithValue}) {
        try {
            const data = await api.getItemsWithLimit(limit);
            return fulfillWithValue(data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const fetchItemsWithSearch = createAsyncThunk<
    TItems[], GetItemsWithSearchParams
>(
    `items/fetchItemsWithSearch`,
    async function (
        {search, exceptions},
        {fulfillWithValue, rejectWithValue}
    ) {
        try {
            const data = await api.getItemsWithSearch({search, exceptions});
            return fulfillWithValue(data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        changeItem: (state, action) => {
            state.items = state.items.map((item) =>
                item.id === action.payload.id ? {...action.payload.item} : item
            );
        },

        addSpecifications: (state, action) => {
            state.specifications = Object.keys(action.payload[0])
                .filter((char) => !['id', 'img', 'model'].includes(char))
                .map((char) => [
                    SPECIFICATIONS_TITLES[char],
                    action.payload.map((arr: TCharacteristic) => arr[char]),
                ]);
        },

        filterSpecifications: (state, action) => {
            state.specifications = action.payload.filter(
                (el: any[][]) =>
                    !el[1].every(
                        (e: string | boolean, _: number, self: string[] | boolean[]) =>
                            e === self[0]
                    )
            );
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loadingItems = true;
                state.errorItems = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loadingItems = false;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.errorItems = action.payload;
                state.loadingItems = false;
            })

            .addCase(fetchItemsWithSearch.pending, (state) => {
                state.loadingSearch = true;
                state.errorSearch = null;
            })
            .addCase(fetchItemsWithSearch.fulfilled, (state, action) => {
                state.searchedItems = action.payload;
                state.exceptions = state.items
                    .map((item) => `id_ne=${item.id}`)
                    .join('&');
                state.loadingSearch = false;
            })
            .addCase(fetchItemsWithSearch.rejected, (state, action) => {
                state.errorSearch = action.payload;
                state.loadingSearch = false;
            });
    },
});

export const selectItems = (state: RootState) => state["items"];
export const {changeItem, addSpecifications, filterSpecifications} =
    itemsSlice.actions;
export default itemsSlice.reducer;