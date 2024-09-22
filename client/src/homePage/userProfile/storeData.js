let db;

export function InintDB() {
  const DBOpenRequest = window.indexedDB.open("myDB");

  DBOpenRequest.onupgradeneeded = (e) => {
    db = e.target.result;

    if (!db.objectStoreNames.contains("Accounts")) {
      db.createObjectStore("Accounts", { keyPath: "email" });
    }
  };

  DBOpenRequest.onsuccess = (e) => {
    db = e.target.result;
  };
}

export function addData(values) {
  const transReq = window.indexedDB.open("myDB");
  transReq.onsuccess = (e) => {
    db = e.target.result;
    let transaction = db.transaction("Accounts", "readwrite");
    let myListOjb = transaction.objectStore("Accounts");

    let addReq = myListOjb.add(values);

    addReq.onsuccess = (e) => {
      console.log(e.target);
      console.log("addItem");
    };
    // console.log(myListOjb);
  };
}

export function getEmail(value) {
  const transReq = window.indexedDB.open("myDB");
  transReq.onsuccess = (e) => {
    db = e.target.result;
    let transaction = db.transaction("Accounts", "readwrite");
    let myListOjb = transaction.objectStore("Accounts");

    let getReq = myListOjb.get(value);

    getReq.onsuccess = (e) => {
      console.log(e.target.result);
      // console.log(value);
    };
    // console.log(myListOjb);
  };
}
