function deleteRow(id){
  if(id<=30){
    $.ajax({
      url : `https://dummyjson.com/users/${id}`,
      method : 'DELETE',
      success : function(response){
        console.log('successfully deleted',response)
        let data = JSON.parse(localStorage.getItem('result'))
        data.users.forEach((item,index ) => {
          if(item.id == id){
            data.users.splice(index,1)
          }
        });
        localStorage.setItem('result',JSON.stringify(data))

        $(`#row${id}`).remove()
        Swal.fire({
          title: "Deleted!",
          text: "Deleted the Row",
          icon: "success"
        });
      },
      error : function(error){
        console.log('cant delete',error)
        Swal.fire({
          title: "Action not Done!",
          text: "Something went Wrong",
          icon: "error"
        });
      }
    })
  }
  else{
    let data = JSON.parse(localStorage.getItem('result'))
    data.users.forEach((item,index ) => {
        if(item.id == id){
          data.users.splice(index,1)
      }
    });
    localStorage.setItem('result',JSON.stringify(data))
    $(`#row${id}`).remove()
    Swal.fire({
      title: "Deleted!",
      text: "Deleted the Row",
      icon: "success"
    });
  }
}
