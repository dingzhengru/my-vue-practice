function initDatabase(db, coll, data){
    if(Array.isArray(data)) {
        data.forEach(function(d, index) {
            db.collection(coll).doc().set(d);
        })
    } else {
        db.collection(coll).doc().set(data);
    }
    
}

var defaultProject = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var products = [
    {
        id: '00',
        name: 'Cookie',
        price: 100 
    },
    {
        id: '01',
        name: 'Tea',
        price: 200 
    },
    {
        id: '02',
        name: 'Tea',
        price: 300 
    },
]


// initDatabase(db, 'products', products);