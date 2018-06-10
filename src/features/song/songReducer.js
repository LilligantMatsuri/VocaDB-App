import { createReducer } from 'redux-act'
import * as actions from './songActions';
import merge from 'deepmerge';
import _ from 'lodash';
import { defaultSearchParams } from './songConstant'

export const defaultState = {
    searchResult: [],
    searchParams: defaultSearchParams,
    noResult: false,
    all: [],
    followed: [],
    highlighted: [],
    favoriteSongs: [],
    filterTags: [],
    detail: 0,
    ranking: {
        durationHours: 168,
        filterBy: 'CreateDate',
        vocalist: 'All',
        songs: []
    },
    searchPage: {
        params: {},
        results: []
    }
}

const reducer = createReducer({
    [actions.fetchHighlightedSuccess]: (state, payload) => {
        return { ...state, highlighted: payload.result }
    },
    [actions.updateSearchParams]: (state, payload) => {

        if(!payload.name || !payload.value) {
            return state;
        }

        let newState = Object.assign({}, state);

        if(newState.searchPage && newState.searchPage.params) {
            newState.searchPage.params[payload.name] = payload.value;
            newState.searchPage.params.start = 0;
        } else {
            let params = defaultSearchParams
            params[payload.name] =  payload.value;
            newState.searchPage = {
                params,
                results: []
            }
        }

        return newState
    },
    [actions.removeSearchParamsArray]: (state, payload) => {
        if(!payload.value || !payload.name || !state.searchPage || !state.searchPage.params || !state.searchPage.params[payload.name]) {
            return state;
        }

        let newState = Object.assign({}, state)
        let params = Object.assign({}, state.searchPage.params)
        newState.searchPage.params = params;

        newState.searchPage.params[payload.name] = newState.searchPage.params[payload.name].filter(v => v != payload.value);
        newState.searchPage.params.start = 0;

        return newState
    },
    [actions.addSearchParamsArray]: (state, payload) => {
        if(!payload.value || !payload.name) {
            return state;
        }

        let newState = Object.assign({}, state)


        if(!newState.searchPage) {
            newState.searchPage = {
                params: defaultSearchParams,
                results: []
            }
        }

        let params = Object.assign({}, state.searchPage.params)

        if(!params) {
            newState.searchPage.params = defaultSearchParams
        } else {
            newState.searchPage.params = params;
        }

        if(newState.searchPage.params[payload.name]) {
            newState.searchPage.params[payload.name] = _.union(newState.searchPage.params[payload.name], [ payload.value] )
            newState.searchPage.params.start = 0;
        } else {
            newState.searchPage.params[payload.name] = [ payload.value ]
        }

        console.log('search params ' + payload.name + ': ' + payload.value + ' added')

        return newState;
    },
    [actions.addSearchResult]: (state, payload) => {
        if(!payload.result) {
            return state;
        }

        let newState = { ...state }

        if(newState.searchPage && newState.searchPage.results) {
            newState.searchPage.results =  _.union(newState.searchPage.results, payload.result )
        } else {
            newState.searchPage = {
                results: payload.result
            }
        }

        return newState;
    },
    [actions.setSearchResult]: (state, payload) => {
        if(!payload.result) {
            return state;
        }

        let newState = { ...state }

        if(newState.searchPage && newState.searchPage.results) {
            newState.searchPage.results = payload.result;
        } else {
            newState.searchPage = {
                results: payload.result
            }
        }

        return newState;
    },
    [actions.fetchMoreSearchResult]: (state) => {

        let newState = { ...state }

        if(!newState.searchPage) {
            return {
                ...newState,
                searchPage: { params: { start: 0 }, results: [] }
            }
        }

        let start = (newState.searchPage.results)? newState.searchPage.results.length : 0;

        newState.searchPage.params = {
            ...newState.searchPage.params,
            start
        }

        return newState
    },
    [actions.fetchLatestSongsSuccess]: (state, payload) => {
        return { ...state, all: payload.result }
    },
    [actions.fetchFollowedSongsSuccess]: (state, payload) => {
        return { ...state, followed: payload.result }
    },
    [actions.fetchSongDetailSuccess]: (state, payload) => {
        return { ...state, detail: payload.result }
    },
    [actions.addFavoriteSong]: (state, payload) => {
        const song = payload.song;

        if(!song) {
            return state
        }

        let currentFavoriteSongs = (state.favoriteSongs)? state.favoriteSongs : []

        if(currentFavoriteSongs.indexOf(song.id) >= 0) {
            return state
        }

        currentFavoriteSongs.unshift(song.id)

        return { ...state, favoriteSongs: currentFavoriteSongs }
    },
    [actions.removeFavoriteSong]: (state, payload) => {
        const song = payload.song;

        if(!song) {
            return state
        }

        let currentFavoriteSongs = state.favoriteSongs.filter(id => id != song.id)

        return { ...state, favoriteSongs: currentFavoriteSongs }
    },
    [actions.addFilterTag]: (state, payload) => {
        if(!payload || !payload.result) return state;
        return { ...state, filterTags: (state.filterTags)? _.concat(state.filterTags, payload.result) : [ payload.result ]  }
    },
    [actions.removeFilterTag]: (state, payload) => {
        if(!payload || !payload.result || !state.filterTags) return state;
        return { ...state, filterTags: _.without(state.filterTags, payload.result)  }
    },
    [actions.addSelectedFilterTag]: (state, payload) => {
        if(!payload || !payload.result) return state;

        let searchParams = Object.assign({}, state.searchParams)
        searchParams.tagId = (searchParams.tagId)? _.union(searchParams.tagId, [ payload.result ]) : [ payload.result ]

        return { ...state, searchParams }
    },
    [actions.removeSelectedFilterTag]: (state, payload) => {
        if(!payload
            || !payload.result
            || !state.searchParams
            || !state.searchParams.tagId) return state;

        let searchParams = Object.assign({}, state.searchParams)
        searchParams.tagId = _.without(searchParams.tagId, payload.result)

        return { ...state, searchParams }
    },
    [actions.changeDurationHours]: (state, payload) => {
        if(!payload) {
            return state
        }

        let ranking = Object.assign({}, state.ranking)
        ranking = { ...ranking, songs: [], durationHours: payload.durationHours }
        return { ...state, ranking }
    },
    [actions.changeFilterBy]: (state, payload) => {
        if(!payload) {
            return state
        }

        let ranking = Object.assign({}, state.ranking)
        ranking = { ...ranking, songs: [], filterBy: payload.filterBy }
        return { ...state, ranking }
    },
    [actions.changeVocalist]: (state, payload) => {
        if(!payload) {
            return state
        }

        let ranking = Object.assign({}, state.ranking)
        ranking = { ...ranking, songs: [], vocalist: payload.vocalist }
        return { ...state, ranking }
    },
    [actions.updateRankingResult]: (state, payload) => {
        if(!payload.result) {
            return state;
        }

        let ranking = Object.assign({}, state.ranking)
        ranking = { ...ranking, songs: payload.result }
        return { ...state, ranking }
    }
}, defaultState)

export default reducer
