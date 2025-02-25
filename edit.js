const updatefields = [
  {
    id : 'editfirstName',
    lable : 'firstName',
    rules : ['required','min:3','max:25']
  },
  {
    id : 'editlastName',
    lable : 'lastName',
    rules : ['required','min:3','max:25']
  },
  {
    id : 'editmaidenName',
    lable : 'maidenName',
    rules : []
  },
  {
    id : 'editage',
    lable : 'age',
    rules : ['required']
  },
  {
    id : 'editbirthDate',
    lable : 'birthDate',
    rules : ['required']
  },
  {
    id : 'editgender',
    lable : 'gender',
    rules : ['required']
  },
  {
    id : 'editemail',
    lable : 'email',
    rules : ['required','email']
  },
  {
    id : 'editusername',
    lable : 'username',
    rules : ['required','min:3','max:10']
  },
  {
    id : 'editaddress',
    lable : 'address',
    rules : ['required']
  },
  {
    id : 'editphone',
    lable : 'phone',
    rules : ['required']
  },
  {
    id : 'editcompanyname',
    lable : 'companyname',
    rules : ['required','min:5','max:25']
  },
  {
    id : 'editdepartment',
    lable : 'department',
    rules : ['required','min:5','max:25']
  },
]

function updateValidation(field){
  let input = $(`#${field.id}`)
  let element = input.val();
  let valid = true;
  for(let rule of field.rules){
    if(rule == 'required'){
      if(!element || element.length === 0){
        valid =  false;
      }
    }
    if(rule.includes('min')){
      let split = rule.split(':')
      let min = split[1];
      if(element.length < Number(min)){
        valid =  false;
      }
    }
    if(rule.includes('max')){
      let split = rule.split(':')
      let max = split[1];
      if(element.length > Number(max)){
        valid =  false;
      }
    }
    if(rule == 'email'){
      if(element.indexOf('@gmail.com')<5){
        valid =  false;
      }
    }
  }
  if(!valid){
    input.css("border", "2px solid red"); 
  }
  else{
    input.css("border", "");
  }
  return valid;
}


function sendData(id){
  let status = true;
  for(let field of updatefields){
    status = updateValidation(field) && status;
  }
  if(status && id > 30){
    saveRow(id);
  }
  else if(status){
    if(status){
      
    let formData = {}; 
    formData.id = id;
    updatefields.forEach(field => {
      formData[field.id] = $(`#${field.id}`).val(); 
    });
    formData.company = {
      name: $(`#editcompanyname`).val(),  
      department: $(`#editdepartment`).val()
    };
    formData.address = {
      address: $(`#address`).val(),  
    };

      $.ajax({
        url : `https://dummyjson.com/users/${id}`,
        method : 'PUT',
        contentType : 'application/json',
        data:JSON.stringify(formData),
        success : function(response){
          console.log('success',response)
          saveRow(id);
        },
        error : function(error){
          console.log('error',error)
        }
      })  
    }
  }
  else{
    console.log('cant update here')
    Swal.fire({
      title: "Can't Update!",
      text: "Please fill correct details",
      icon: "error"
    });
  }
}


function editRow(id) {
  let parse = JSON.parse(localStorage.getItem('result'));
  console.log(parse)
  let users = parse.users
  console.log(users)
  let user = users.find(u => u.id == id);

  $(`#row${id}`).html(`
    <th scope="row">${id}</th>
    <td><input id="editfirstName" value="${user.firstName}"></td>
    <td><input id="editlastName" value="${user.lastName}"></td>
    <td><input id="editmaidenName" value="${user.maidenName}"></td>
    <td><input id="editage" value="${user.age}"></td>
    <td><input id="editbirthDate" value="${user.birthDate}"></td>
    <td><input id="editgender" value="${user.gender}"></td>
    <td><input id="editemail" value="${user.email}"></td>
    <td><input id="editusername" value="${user.username}"></td>
    <td><input id="editaddress" value="${user.address.address}"></td>
    <td><input id="editphone" value="${user.phone}"></td>
    <td><input id="editcompanyname" value="${user.company.name}"></td>
    <td><input id="editdepartment" value="${user.company.department}"></td>
    <td>
      <button class="btn btn-success" onclick="sendData(${id})">Save</button>
      <button class="btn btn-warning" onclick="deleteRow(${id})">Delete</button>
    </td>
  `);
}


function saveRow(id) {
  let parse = JSON.parse(localStorage.getItem('result'));
  let users = parse.users
  console.log(users)
  let user = users.find(user => user.id == id);
  user.firstName = $("#editfirstName").val();
  user.lastName = $("#editlastName").val();
  user.maidenName = $("#editmaidenName").val();
  user.age = $("#editage").val();
  user.birthDate = $("#editbirthDate").val();
  user.gender = $("#editgender").val();
  user.email = $("#editemail").val();
  user.username = $("#editusername").val();
  user.address = { address: $("#editaddress").val() };
  user.phone = $("#editphone").val();
  user.company = {
    name: $("#editcompanyname").val(),
    department: $("#editdepartment").val()
  };
  parse.users = users;
  localStorage.setItem('result', JSON.stringify(parse));
  $(`#row${id}`).html(`
    <th scope="row">${id}</th>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.maidenName}</td>
    <td>${user.age}</td>
    <td>${user.birthDate}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
    <td>${user.username}</td>
    <td>${user.address.address}</td>
    <td>${user.phone}</td>
    <td>${user.company.name}</td>
    <td>${user.company.department}</td>
    <td>
      <button class="btn btn-success" onclick="editRow(${id})">Edit</button>
      <button class="btn btn-warning" onclick="deleteRow(${id})">Delete</button>
    </td>`
    
  );
  Swal.fire({
    title: "Updated!",
    text: "Updated the User Successfully",
    icon: "success"
  });
}
