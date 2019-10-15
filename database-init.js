// 刪除Collection全部資料
function clearCollection(db, coll) {
    console.log('clearCollection', coll);
    db.collection(coll).get().then((shotsnap) => {
        shotsnap.forEach((doc) => {
            index++;
            db.collection(coll).doc(doc.id).delete();
        });
    });
}

// 新增資料進去(自動ID)
function setNewData(db, coll, data) {
    console.log('setNewData', coll, data.length);
    if(Array.isArray(data)) {
        data.forEach(function(d) {
            db.collection(coll).doc().set(d);
        })
    } else {
        db.collection(coll).doc().set(data);
    }
}

// 刪除Collection全部資料後再放進去
function initCollection(db, coll, data) {
    console.log('initCollection', coll, data.length);
    let index = 0;
    db.collection(coll).get().then((shotsnap) => {
        if(shotsnap.docs.length == 0) {
            console.log('沒資料 直接Set進去');
            setNewData(db, coll, data);
        } else {
            console.log('先清光資料，再Set進去')
            shotsnap.forEach((doc) => {
                index++;
                db.collection(coll).doc(doc.id).delete();
                if(index == shotsnap.docs.length)
                    setNewData(db, coll, data);
            });
        }
        
    }).catch(function(error) { console.log("initCollection Error:", error) });
}


var defaultProject = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var products = [
    {
        id: '0',
        name: 'Cookie',
        price: 100 
    },
    {
        id: '1',
        name: 'Tea',
        price: 200 
    },
    {
        id: '2',
        name: 'Candy',
        price: 500 
    },
    {
        id: '3',
        name: 'product_3',
        price: 700 
    },
    {
        id: '4',
        name: 'product_4',
        price: 100 
    },
    {
        id: '5',
        name: 'product_5',
        price: 250 
    },
    {
        id: '6',
        name: 'product_6',
        price: 450 
    },
    {
        id: '7',
        name: 'product_7',
        price: 220 
    },
    {
        id: '8',
        name: 'product_8',
        price: 430 
    },
]

var orders = [
    {
        id: '1',
        userid: '1',
        status: '',
        created: firebase.firestore.Timestamp.fromDate(new Date(2017, 5, 8, 1, 35, 30)),
        productIDs:[
            '0',
            '2',
            '1'
        ],
        info: ''
    },
    {
        id: '2',
        userid: '1',
        status: '',
        created: firebase.firestore.Timestamp.fromDate(new Date(2018, 11, 18, 1, 35, 30)),
        productIDs:[
            '8',
            '7',
            '6'
        ],
        info: ''
    },
    {

        id: '3',
        userid: '1',
        status: '',
        created: firebase.firestore.Timestamp.fromDate(new Date(2019, 1, 1, 10, 33, 30)),
        productIDs:[
            '4',
            '3'
        ],
        info: ''
    },
]

var users = [
    {
        id:'0',
        name: 'username01'
    },
    {
        id:'1',
        name: 'username02'
    }
]

// console.log(dayjs(orders[0].date.toMillis()).format('YYYY/MM/DD hh:mm:ss'));


// initCollection(db, 'products', products);
// initCollection(db, 'orders', orders);
// initCollection(db, 'users', users);
