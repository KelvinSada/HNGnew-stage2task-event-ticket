import React,{useEffect, useState} from 'react';
import './App.css';
// import cloudImage from "./picture/cloud.png";
// import Logo from "./picture/logo.png";
// import FormInput from './Forms-input';
// import TicketHead from './TicketHead';
// import React from "react";
function App() {
  // const [imageUrl,setImageUrl] = useState()
  // const [firstError,setFirstError] = useState()
  // const [errors,setErrors] =useState()
  // const [savedFormData,setSavedFormData] = useState(false)
  // const [formInputsValue,setFormInputsValue] = useState({
  //   ticketno:1,
  //   name:"",
  //   email:"",
  //   textarea:""
  // })
    
  // const [picketTicket,setPickedTicket] = useState()
  // const [ticketType,setTicketType] = useState()
    
  const [pageNo, setPageNo] = useState(0);

//     function bookNewTicket(){
//       setImageUrl()
//       setSavedFormData(false)
//       setFormInputsValue({
//     ticketno:1,
//     name:"",
//     email:"",
//     textarea:""
//   })
//   setPickedTicket()
//   setTicketType()
    
//   setPageNo(0);
//     }
//     //Send ticket to local storge
//   useEffect(()=>{
//     const data = window.localStorage.getItem("MY_SAVED_FORM_INFO")
//     if (data !== "undefined"){
//       setFormInputsValue(JSON.parse(data))
//     }
  
//   },[])
  
//   useEffect(()=>{
//       window.localStorage.setItem("MY_SAVED_FORM_INFO",JSON.stringify(formInputsValue))
//     // eslint-disable-next-line
//   },[formInputsValue])

  
  
//   async function handlePictureUpload(event){
//     const imageFile = event.target.files[0]
//     if (!imageFile)return
    
//     const data = new FormData()  //created a formData object
//     data.append("file",imageFile)  //(file) keyword name ill use in cloudinary
//     data.append("upload_preset","hngtask_user_uploaded_photo")  //the name i used in cloudinary site
//     data.append("cloud_name","dshceqjzm") //go to api key in cloudinary, youll see the name
    
//     const response = await fetch("https://api.cloudinary.com/v1_1/dshceqjzm/image/upload",{
//       method:"POST",
//       body:data,
//     })
//     const uploadedImageUrl = await response.json()
//     setImageUrl(uploadedImageUrl.url)
//   }
//   function handleSubmit(event){
//     // console.log(event)
//   }


//   function DownloadImage(image){
//     setImageUrl(image)    
//   }

//     //Saving image to local storage
//   useEffect(()=>{
//     const dataImage = window.localStorage.getItem("MY_SAVED_IMAGE")
//     if (dataImage !== "undefined"){
      
//       DownloadImage(JSON.parse(dataImage))
//     }
//   },[])

//   useEffect(()=>{
//       window.localStorage.setItem("MY_SAVED_IMAGE",JSON.stringify(imageUrl))
//     // eslint-disable-next-line
//   },[imageUrl])


//     //Saving TicketType to local storage
//     useEffect(()=>{
//       const ticket = window.localStorage.getItem("Ticket_type")
//       if (ticket !== "undefined"){
//         setTicketType(JSON.parse(ticket))
//       }
//     },[])

//     useEffect(()=>{
//       window.localStorage.setItem("Ticket_type",JSON.stringify(ticketType))
//     // eslint-disable-next-line
//   },[ticketType])


// //Saving TicketNo to local storage
// useEffect(()=>{
//   const ticketno = window.localStorage.getItem("Ticket_number")
//   if (ticketno !== "undefined"){
//     setPickedTicket(JSON.parse(ticketno))
//   }
// },[])


// useEffect(()=>{
//   window.localStorage.setItem("Ticket_number",JSON.stringify(picketTicket))
// // eslint-disable-next-line
// },[picketTicket])


//Saving Page number to local storage
useEffect(()=>{
  const page = window.localStorage.getItem("My_Page_No")
  if (page !== undefined && page !== null && page !== "undefined" && page !== "null"){
   console.log("page has something")
    setPageNo(JSON.parse(page))

  }else{
    console.log("page does not have something")
    setPageNo(0)
  }
  // setPageNo(JSON.parse(page))
  // console.log(JSON.parse(page))
  // if (page == "null"){
  //   alert("page is null")
  // } else{
  //   alert("page is not null")
  // }

  // if (page !== "undefined" ){
  //   setPageNo(JSON.parse(page))
  // } else{
  //   setPageNo(0)
  // }

  // if (page === "null" || page === "undefined"){
  //   setPageNo(0)
  // }
},[])
console.log(pageNo)
useEffect(()=>{
  window.localStorage.setItem("My_Page_No",JSON.stringify(pageNo))
// eslint-disable-next-line
},[pageNo])


//   function isValidEmail(email){
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     return emailRegex.test(email)
//   }
  
// function handleValue(e){
//   const value = e.target.value
//   const name = e.target.name
  
//   setFormInputsValue(prev=>{
//     return{
//       ...prev,
//       [name]:value
//     }
//   })
//   setSavedFormData(!savedFormData)
  
// }
// function firstAction(){
//   let error ={}
//   if (!formInputsValue.ticketno){
//     error.ticketno="Please select the no of tickets"
//   }
//   if (!ticketType){
//     error.selectedTicket="Choose type of tickets"
//   }

//   setFirstError(error)
      
//   if (ticketType && formInputsValue.ticketno >0){
//       setPageNo(prev=>{
//          return prev+1
//          })
//   }
// }
// function handleSubmitClick(event){
//   let newErrors = {}
  
//   if (!imageUrl){
//     newErrors.image = "Please put an Image"
//   }
//   if (!formInputsValue.ticketno){
//     newErrors.ticketno="Please select the no of tickets"
//   }
//   if (!formInputsValue.name){
//     newErrors.name="Full name is required"
//   }
//   if (!formInputsValue.email){
//     newErrors.email = "Email is required"
//   } else if (!isValidEmail(formInputsValue.email)){
//     newErrors.email ="Invalid email format"
//   }
//   if(!formInputsValue.textarea){
//     newErrors.textarea="Texts is required"
//   }
//   setErrors(newErrors)

//   if (imageUrl && formInputsValue.name && newErrors.email === undefined &&formInputsValue.textarea){
//     setPageNo(prev=>prev+1)
//   }
//   event.preventDefault()
//  }
            
// function backButton(event){
//   if (pageNo !== 0){
//     setPageNo(prev=>{
//       return prev-1
//     })
//   }
//   event.preventDefault()
// }


// const ticketsArray = [{
//   id:0,
//   type:"FREE",
//   name:"REGULAR ACCESS",
//   number:"20/52"
// },{
//   id:1,
//   type:"$150",
//   name:"VIP ACCESS",
//   number:"20/52"
// },{
//   id:2,
//   type:"$150",
//   name:"VVIP ACCESS",
//   number:"20/52"
// }]

// function handleTicketPick(value){
//   // console.log(value.id)
// setTicketType(value.name)
// setPickedTicket(value.id)
// }
console.log(pageNo)
  return (
    <div className="App">
      <h1>Hello</h1>
      <div className={!pageNo&&"pageDisplayNone"}>Display-pageNo</div>
    </div>
  );
}
export default App;
