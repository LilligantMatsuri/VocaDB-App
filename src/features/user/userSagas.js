import { put, takeLatest, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from './userActions'
import * as appActions from '../../app/appActions'
import api from './userApi'
import { AsyncStorage } from 'react-native'
import { authKey } from './../../common/constants/storageKey'
import { selectUserId, selectBackupData } from './userSelector'
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import moment from 'moment';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

const signIn = function* signIn(action) {
    try {
        const payload = action.payload;

        if(!payload.username && !payload.password) {
            yield put(appActions.requestError(new Error('Invalid username and password')));
            return;
        }

        yield put(appActions.showLoading());

        const { username, password } = payload;
        const response = yield call(api.signIn, username, password);

        if(!response || !response.token) {
            yield put(appActions.requestError(new Error('Something wrong, please try again later')));
        }

        AsyncStorage.setItem(authKey.token, response.token);

        yield put(actions.signInSuccess(response.token));
        yield put(actions.resetAction());

    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchAlbums = function* fetchAlbums() {
    try {
        const userId = yield select(selectUserId());

        if(!userId) {
            yield put(actions.resetToSignIn());
            return;
        }

        const response = yield call(api.albums, userId)

        yield put(actions.updateAlbums(response.items));

    } catch(e) {
        yield put(appActions.requestError(e));
    }
}

const exportBackupData = function* exportBackupData() {
    try {

        console.log('export')

        const backupData = yield select(selectBackupData());

        let currentTimestamp = moment.utc().valueOf();
        let path = `${RNFS.DocumentDirectoryPath}/vocadb_${currentTimestamp}.json`

        yield call(RNFS.writeFile, path, backupData, 'utf8');

        Share.open({ url: "file://" + path, type: 'application/json' });

    } catch(e) {
        console.log(e.message)
        yield put(appActions.requestError(e));
    }
}

const pickBackupFile = () => {
    return new Promise((resolve, reject) => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()]
        }, (error, res) => {
            if(error) {
                reject(error);
            } else {
                resolve(res);
            }
        });
    })
}

const importBackupData = function* importBackupData() {
    try {

        const backupFile = yield pickBackupFile();

        if(!backupFile) {
            return;
        }

        if(backupFile.type != 'application/json') {
            console.log('Invalid file type');
            return;
        }
        const fileContent = yield RNFS.readFile(backupFile.uri, 'utf8');

        // TODO restore backup data process

    } catch(e) {
        console.log(e.message)
    }
}

const userSaga = function* userSagAsync() {
    yield takeLatest(actions.signIn, signIn)
    yield takeLatest(actions.fetchAlbums, fetchAlbums)
    yield takeLatest(actions.exportBackupData, exportBackupData)
    yield takeLatest(actions.importBackupData, importBackupData)
}

export { signIn, fetchAlbums, exportBackupData, importBackupData }

export default userSaga
