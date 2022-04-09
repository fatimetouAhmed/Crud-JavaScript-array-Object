let myarray;
let mod='create';
let tmp;
if(localStorage.personne!=null){
myarray=JSON.parse(localStorage.personne);
afficherData();
}
 else{
     myarray=[];
 }  
 function readFormData() {
    let formData = [];
    formData={lastName:document.getElementById("lastName").value,firstName:document.getElementById("firstName").value,gender:document.getElementById("gender").value,dateBirth:document.getElementById("dateBirth").value};
    return formData;
}
function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (mod === 'create'){
           myarray.push(formData);
         //  console.log(myarray);
        }
        else{
           myarray[tmp] =formData;
           mod='create';
           document.getElementById("submit").value ='Create';

        }
        localStorage.setItem('personne',JSON.stringify(myarray));
        resetForm();
        afficherData();
    }
}

function afficherData(){
    //var table = document.getElementById("employeeList");
    let  html='';     
        for (var i=0;i<myarray.length;i++){
           
           html+='<tr>';
           html+='<td>'+myarray[i].lastName+'</td>';
           html+='<td>'+myarray[i].firstName+'</td>';
           html+='<td>'+myarray[i].gender+'</td>';
           html+='<td>'+myarray[i].dateBirth+'</td>';
           html+='<td> <a href="#modal" class="modal-open" onclick="updateData('+i+')">Update</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="button" id="delete" onclick="DeleteData('+i+')">Delete</button></td>';
           html+='</tr>';
         }
         document.getElementById("table").innerHTML=html;
}

function resetForm() {
    document.getElementById("lastName").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dateBirth").value = "";
}

function updateData(i) {
    document.getElementById("lastName").value = myarray[i].lastName;
    document.getElementById("firstName").value = myarray[i].firstName;
    document.getElementById("gender").value = myarray[i].gender;
    document.getElementById("dateBirth").value = myarray[i].dateBirth;
    document.getElementById("submit").value ='Update';
    mod='update';
    tmp=i;  
}
//delete
function DeleteData(i) {
    if (confirm('Vous voullez vraiment supprimer se pernonne?')) {
    myarray.splice(i,1);
    localStorage.personne=JSON.stringify(myarray);
    afficherData();
    }
}
//search
function searchData(value){
    let  html='';   
    for(let i=0;i<myarray.length;i++){
        if(myarray[i].lastName.toLowerCase().includes(value.toLowerCase()) || myarray[i].firstName.toLowerCase().includes(value.toLowerCase()) || myarray[i].gender.toLowerCase().includes(value.toLowerCase()) || myarray[i].dateBirth.toLowerCase().includes(value.toLowerCase())){      
               html+='<tr>';
               html+='<td>'+myarray[i].lastName+'</td>';
               html+='<td>'+myarray[i].firstName+'</td>';
               html+='<td>'+myarray[i].gender+'</td>';
               html+='<td>'+myarray[i].dateBirth+'</td>';
               html+='<td> <a href="#modal" class="modal-open" onclick="updateData('+i+')">Update</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="button" id="delete" onclick="DeleteData('+i+')">Delete</button></td>';
               html+='</tr>';
             }
             document.getElementById("table").innerHTML=html;
        
    }

}
//sorting table asc/desc
function sortTableAsc(n) {
    var table;
    table = document.getElementById("table");
    var rows, i, x, y;
    var switching = true;

    var direction = "ascending";
    //boucle principale qui s execute jusqu a la table soit triee
    while (switching) {
        switching = false;
        var rows = table.rows;

        //boucle qui s execute pour toutes les lignes
        for (i = 0; i < (rows.length - 1); i++) {
            var Switch = false;

            // les 2 elements qui doivent etre comparer
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (direction == "ascending") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                    {
                    Switch = true;
                    break;
                }
            }
        }
        if (Switch) {
            //Fonction pour changer de ligne et marquer le changement comme terminé
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;;
        } 
    }
}
function sortTableDesc(n) {
    var table;
    table = document.getElementById("table");
    var rows, i, x, y
    var switching = true;

    var direction = "descending";

    //boucle principale qui s execute jusqu a la table soit triee
    while (switching) {
        switching = false;
        var rows = table.rows;

        //boucle qui s execute pour toutes les lignes
        for (i = 0; i < (rows.length - 1); i++) {
            var Switch = false;
            // les 2 elements qui doivent etre comparer
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
              if (direction == "descending") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                    {
                    Switch = true;
                    break;
                }
            }
        }
        if (Switch) {
            //Fonction pour changer de ligne et marquer le changement comme terminé
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;           
         }       
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("lastName").value == "") {
        isValid = false;
        document.getElementById("lastNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("lastNameValidationError").classList.contains("hide"))
            document.getElementById("lastNameValidationError").classList.add("hide");
    }
    return isValid;
}