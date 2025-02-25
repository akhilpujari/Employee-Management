$(document).ready(function(){
  

  $('#signOut').click(function(){
    localStorage.clear();
    window.location.href = 'index.html'
  })

  if(localStorage.getItem('accessToken')){
    console.log(localStorage.getItem('accessToken'))
    $.ajax({
      url: 'https://dummyjson.com/auth/me',
      method : 'GET',
      contentType : 'application/json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    },
    success : function(response){
      console.log('success',response)
      $('#userImg').attr('src',response.image)
      $('#brand').append(`Hi, ${response.firstName} ${response.lastName}`)
    },
    error : function(error){
      console.log(error)
    }
    })
  }
  if(localStorage.getItem('accessToken')){
    $.ajax({
      url: 'https://dummyjson.com/auth/user',
      method: 'GET',
      contentType : 'application/json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    },
      success: function(response){
        console.log(response);
        if(!localStorage.getItem('result')){
          localStorage.setItem('result', JSON.stringify(response));
        }
        let result = JSON.parse(localStorage.getItem('result'))
        let userItems = result.users; 
        for (let user of userItems) {
          if(user.maidenName==''){
            $('#tableBody').append(
            `<tr id='row${user.id}' class="bg-white"> 
              <th scope="row">${user.id}</th>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td></td>
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
                <button class="btn btn-success" onclick="editRow(${user.id})">Edit</button> 
                <button class="btn btn-warning" onclick="deleteRow(${user.id})">Delete</button>
              </td>
            </tr>`
          );
          }
          else{
            $('#tableBody').append(
              `<tr id='row${user.id}' class="bg-white"> 
                <th scope="row">${user.id}</th>
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
                  <button class="btn btn-success" onclick="editRow(${user.id})">Edit</button> 
                  <button class="btn btn-warning" onclick="deleteRow(${user.id})">Delete</button>
                </td>
              </tr>`
            );
          }
          $('#tableSearch').on("keyup",function(){
            var value = $(this).val().toLowerCase();
            $("#tableBody tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          })
          
        }
      },
      error: function(error){
        console.log("Error fetching data:", error);
      }
    });
  }
  else{
    return
  }
  
});



