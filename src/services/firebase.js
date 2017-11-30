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

  getUserByUid(userUid, then){
    this.database.ref().child('records').child(userUid).on(
      'value', (snapshot) => {then(snapshot.val())}
    );
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
  getUserRecords(userUid, then) {
    this.database.ref().child('records').child(userUid).on(
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
  deleteUserRecord(userUid, recordUid) {
    this.database.ref(
      'records/' + userUid + '/' + recordUid + '/'
    ).remove();
  }
}

export default FirebaseService;
