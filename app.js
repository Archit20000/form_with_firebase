
  var firebaseConfig = {
    apiKey: "AIzaSyCkAgUKRHttm25ww89pq3ex47E_YN1LAhk",
    authDomain: "form-27ef1.firebaseapp.com",
    databaseURL: "https://form-27ef1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "form-27ef1",
    storageBucket: "form-27ef1.appspot.com",
    messagingSenderId: "777110661796",
    appId: "1:777110661796:web:f50a6436cb54dabad35431",
    measurementId: "G-0KHFL41D4T"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let firstname = document.querySelector(".firstname").value;
  let lastname = document.querySelector(".lastname").value;
  let email = document.querySelector(".email").value;
  let contact = document.querySelector(".contact").value;
  let address = document.querySelector(".address").value;
  //console.log(firstname,lastname, email,contact, address);

  saveContactInfo(firstname,lastname, email,contact, address);
document.querySelector('.alert').style.display='block';
setTimeout(function(){
document.querySelector('.alert').style.display='none';
},3000);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(firstname,lastname, email,contact, address) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    firstname:firstname,
    lastname:lastname,
    email:email,
    contact:contact,
    address:address,

  });

}


//retrieve database
function retrieveInfos(){
let ref=firebase.database().ref("infos");
ref.on("value",gotData);
}

function gotData(data)
{
	let info = data.val();
	let keys=Object.keys(info);
       
        var rows=[];
	for(let i=0;i < keys.length; i++)
        {
            let j=keys[i];
            let address=info[j].address;
            let contact=info[j].contact;
            let email=info[j].email;
            let firstname=info[j].firstname;
            let lastname=info[j].lastname;
            rows.push(
            [
                firstname,
         lastname,
         contact,
         email,
         address
            ]
        );
            
        }
        csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "file.csv");
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
        }
            