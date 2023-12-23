
const deleteButton = document.querySelectorAll('.delete-button');

Array.from(deleteButton).forEach((element)=>{
   element.addEventListener('click', deleteReservation)
})

async function deleteReservation(){
   const mName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
   const mAddress = this.parentNode.parentNode.childNodes[3].childNodes[1].innerText
   const mPhone = this.parentNode.parentNode.childNodes[5].childNodes[1].innerText
   const mMessage = this.parentNode.parentNode.childNodes[7].childNodes[1].innerText
   try{
      const response = await fetch('deleteReservation', {
         method: 'delete',
         headers:{'Content-Type': 'application/json'},
         body: JSON.stringify({
            'nameS' : mName
            // 'addressS' : mAddress,
            // 'phoneS' : mPhone,
            // 'message': mMessage
         })
      })
      const data = await response.json()
      console.log(data)
      location.reload()
   }catch(err){
      console.log(err)
   }
}