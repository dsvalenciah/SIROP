import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBcd20Z5odq-EiJYuPCCROaOp5os-7p_WE",
  authDomain: "sirop-unal.firebaseapp.com",
  databaseURL: "https://sirop-unal.firebaseio.com",
  projectId: "sirop-unal",
  storageBucket: "sirop-unal.appspot.com",
  messagingSenderId: "311554635684"
};

class FirebaseService {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  getUser(then){
    firebase.auth().onAuthStateChanged(user => {then(user);});
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log("LogIn"))
    .catch(error => console.log('Error ' + error.code + ': ' + error.message));
  }

  handleLogout() {
    firebase.auth().signOut()
    .then(result => console.log("LogOut"))
    .catch(error => console.log('Error ' + error.code + ': ' + error.message));
  }

  /* Getters */
  getUserByUid(userUid, then){
    this.database.ref().child('' + userUid).on(
      'value', (snapshot) => {then(snapshot.val())}
    );
  }

  getUserObjects(userUid, then) {
    this.database.ref().child(userUid + '/objects').on(
      'value', (snapshot) => {then(snapshot.val())}
    );
  }

  getQuestionsPerArea(then) {
    this.database.ref().child('cartilla').on(
      'value', (snapshot) => {then(snapshot.val())}
    );
  }

  getUserRecordFiles(userUid, recordUid, question, fileName, then) {
    this.storage.refFromURL(
      'gs://auditoria-e8b99.appspot.com/files/' + userUid + '/' + recordUid + '/' + question + '/' + fileName
    ).getDownloadURL().then((url) => {then(url)});
  }

  /* Modifiers */
  modifyUserRecord(userUid, recordUid, record) {
    this.database.ref(
      'records/' + userUid + '/' + recordUid + '/'
    ).update(record);
  }

  /* Setters */
  setUser(userUid, user) {
    this.database.ref(userUid + '/').set(user);
  }

  setUserObject(userUid, objectUid, object) {
    this.database.ref(userUid + '/objects/' + objectUid + '/').set(object);
  }

  updateUserObject(userUid, objectUid, object) {
    this.database.ref(userUid + '/objects/' + objectUid + '/').update(object);
  }

  setUserRecord(userUid, recordUid, record) {
    this.database.ref(
      'records/' + userUid + '/' + recordUid + '/'
    ).set(record);
  }

  setUserRecordFile(userUid, recordUid, question, file) {
    this.storage.ref(
      'files/' + userUid + '/' + recordUid + '/' + question + '/' + file.name
    ).put(file);
  }

  /* Removers */
  deleteUserObject(userUid, objectUid) {
    this.database.ref(userUid + '/objects/' + objectUid + '/').remove();
  }
}

export default FirebaseService;
