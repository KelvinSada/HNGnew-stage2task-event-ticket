import React,{useEffect, useState,useRef} from 'react';
import './App.css';
import cloudImage from "./picture/cloud.png";
import Logo from "./picture/logo.png";
import FormInput from './Forms-input';
import TicketHead from './TicketHead';
import arrow from "./picture/arrow.jpg";


function App() {
  const [imageUrl,setImageUrl] = useState()
  const [firstError,setFirstError] = useState()
  const [errors,setErrors] =useState()
  const [formInputsValue,setFormInputsValue] = useState({
    ticketno:1,
    name:"",
    email:"",
    textarea:""
  })
    
  const [picketTicket,setPickedTicket] = useState()
  const [ticketType,setTicketType] = useState()
  const topOfPage =useRef(null)
  
    
  const [pageNo, setPageNo] = useState(0);

  function bookNewTicket(){
    setImageUrl()
    setFormInputsValue({
    ticketno:1,
    name:"",
    email:"",
    textarea:""
  })
    setPickedTicket()
    setTicketType()
    setPageNo(0);
  }

  //Send Form Input to local storge
  useEffect(()=>{
    const data = window.localStorage.getItem("MY_SAVED_FORM_INFO")
    const retrievedData = JSON.parse(data);
    if (retrievedData){
      setFormInputsValue(retrievedData)
    } 
    else{
      setFormInputsValue({
            ticketno:1,
            name:"",
            email:"",
            textarea:""
          })
    }
  
  },[])
  
  useEffect(()=>{
    localStorage.setItem("MY_SAVED_FORM_INFO",JSON.stringify(formInputsValue))
    // eslint-disable-next-line
  },[formInputsValue])


  async function handlePictureUpload(event){
    const imageFile = event.target.files[0]
    
    if (!imageFile)return
    
    const data = new FormData()  //created a formData object
    data.append("file",imageFile)  //(file) keyword name ill use in cloudinary
    data.append("upload_preset","hngtask_user_uploaded_photo")  //the name i used in cloudinary site
    data.append("cloud_name","dshceqjzm") //go to api key in cloudinary, youll see the name
    
    const response = await fetch("https://api.cloudinary.com/v1_1/dshceqjzm/image/upload",{
      method:"POST",
      body:data,
    })
    const uploadedImageUrl = await response.json()
    setImageUrl(uploadedImageUrl.url)
  }
  function handleSubmit(event){
    // console.log(event)
  }


  function DownloadImage(image){
    setImageUrl(image)    
  }

    //Saving image to local storage
  useEffect(()=>{
    const dataImage = localStorage.getItem("MY_SAVED_IMAGE")
    if (dataImage !== "undefined"){
      
      DownloadImage(JSON.parse(dataImage))
    }
  },[])

  useEffect(()=>{
      localStorage.setItem("MY_SAVED_IMAGE",JSON.stringify(imageUrl))
    // eslint-disable-next-line
  },[imageUrl])


    //Saving TicketType to local storage
    useEffect(()=>{
      const ticket = localStorage.getItem("Ticket_type")
      // const actualTicket = JSON.parse(ticket)
      console.log(typeof(ticket))

      if (ticket !== "undefined"){
          setTicketType(JSON.parse(ticket))
      } 
      // if (ticket){
      // } else{
      //   setTicketType()
      // }
    },[])

    useEffect(()=>{
      localStorage.setItem("Ticket_type",JSON.stringify(ticketType))
    // eslint-disable-next-line
  },[ticketType])


//Saving TicketNo to local storage
useEffect(()=>{
  const ticketno = localStorage.getItem("Ticket_number")

  if (ticketno !== "undefined"){
    setPickedTicket(JSON.parse(ticketno))
  }
},[])


useEffect(()=>{
  localStorage.setItem("Ticket_number",JSON.stringify(picketTicket))
// eslint-disable-next-line
},[picketTicket])


//Saving Page number to local storage
useEffect(()=>{
  const page = window.localStorage.getItem("My_Page_No")
  const gottenNo = JSON.parse(page)
  console.log(gottenNo)
  // if (page > 0){
  //   setPageNo(page)
  // } else{
  //   setPageNo(0)
  // }
  if (gottenNo){
    setPageNo(gottenNo)
  } else {
    setPageNo(0)
  }
},[])
useEffect(()=>{
  window.localStorage.setItem("My_Page_No",JSON.stringify(pageNo))
// eslint-disable-next-line
},[pageNo])


  function isValidEmail(email){
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email)
  }
  
function handleValue(e){
  const value = e.target.value
  const name = e.target.name
  
  setFormInputsValue(prev=>{
    return{
      ...prev,
      [name]:value
    }
  })
}
function firstAction(){
    topOfPage.current.scrollIntoView(
      {behavior:"smooth",inline:"nearest"}
    )
    
  let error ={}
  if (!formInputsValue.ticketno){
    error.ticketno="Please select the no of tickets"
  }
  if (!ticketType){
    error.selectedTicket="Choose type of tickets"
  }

  setFirstError(error)
      
  if (ticketType && formInputsValue.ticketno >0){
      setPageNo(prev=>{
         return prev+1
         })
  }
}
function handleSubmitClick(event){
      topOfPage.current.scrollIntoView(
      {behavior:"smooth",inline:"nearest"}
    )
  let newErrors = {}
  
  if (!imageUrl){
    newErrors.image = "Please put an Image"
  }
  if (!formInputsValue.ticketno){
    newErrors.ticketno="Please select the no of tickets"
  }
  if (!formInputsValue.name){
    newErrors.name="Full name is required"
  }
  if (!formInputsValue.email){
    newErrors.email = "Email is required"
  } else if (!isValidEmail(formInputsValue.email)){
    newErrors.email ="Invalid email format"
  }
  if(!formInputsValue.textarea){
    newErrors.textarea="Texts is required"
  }
  setErrors(newErrors)

  if (imageUrl && formInputsValue.name && newErrors.email === undefined &&formInputsValue.textarea){
    setPageNo(prev=>prev+1)
  }
  event.preventDefault()
 }
            
function backButton(event){
  if (pageNo !== 0){
    setPageNo(prev=>{
      return prev-1
    })
  }
  event.preventDefault()
}


const ticketsArray = [{
  id:0,
  type:"FREE",
  name:"REGULAR ACCESS",
  number:"20/52"
},{
  id:1,
  type:"$150",
  name:"VIP ACCESS",
  number:"20/52"
},{
  id:2,
  type:"$150",
  name:"VVIP ACCESS",
  number:"20/52"
}]

function handleTicketPick(value){
  // console.log(value.id)
setTicketType(value.name)
setPickedTicket(value.id)
}
  return (
    <div className="App">
      <header className="header">
      <img className="logo-image" src={Logo} alt=""/>
      <nav className="nav-menu">
        <ul className="menu-container">
          <li className="menu-Items">Event</li>
          <li className="menu-Items">My Tickets</li>
          <li className="menu-Items">About Project</li>
        </ul>
      </nav>
      <button className="tickets-button">MY TICKETS <img src={arrow} alt=""/></button>
    </header>
    <main className='content-body'>
    <div ref={topOfPage}></div>

    <div className={pageNo===0?"section-1":"pageDisplayNone"}>
    {/* <div className="section-1"> */}
      <TicketHead
        head={"Ticket Selection"}
        steps={"Step 1/3"}
      />
      <span className='space-span'>
      <div className='span-progress'></div>
      </span>
    
      <div className='top-section1'>
        <h1 className='display-head'>Techember Fest "25</h1>
        <p className='display-head-text'>Join us for an unforgettable experience at TechWorld! Secure your spots now</p>
        {/* <p className='display-head-other-text'>📍TechWorld || March 15,2025 | 7:00 PM</p> */}
        <div className='display-head-other-text-main-container'>
          <p className='display-head-other-text'>📍TechWorld</p>
          <span className='display-head-other-text remove'>||</span>
          <p className='display-head-other-text'>March 15,2025 | 7:00 PM</p>
        </div>
      </div>
      
      <div className='bottom-section1'>
      <span className='middle-span'>
      </span>
        <p className='select-ticket-text'>Select Ticket type</p>
        <div className='ticket-type-container'>
          { 
          ticketsArray.map((ticket,index)=>(
          <div onClick={()=>handleTicketPick(ticket)} key={ticket.id} className={(index)===picketTicket?'picked-ticket card-component':"card-component"}>
            <h1 className="card-component-head">{ticket.type}</h1>
            <h3 className="card-component-lower-head">{ticket.name}</h3>
            <p className="card-component-lower-bottom">{ticket.number}</p>
          </div>
        ))
      }
      
        </div>
       
          {firstError&&<div className='error'>{firstError.selectedTicket}</div>}
        <FormInput 
          label={"Number of tickets"}
          type={"number"}
          value={formInputsValue.ticketno&&formInputsValue.ticketno}
          name={"ticketno"}
          action={handleValue}
        />
          {firstError&&<div className='error'>{firstError.ticketno}</div>}
          <div className='submit-buttons'>
            <button onClick={backButton} className='first-button'>Cancel</button>
            <button type="submit" onClick={firstAction} className='second-button'>Next</button>
          </div>
      </div>
    </div>

      
    <div className={pageNo===1?"section-1 section2":"pageDisplayNone"}>
    {/* <div className="section-1 section2"> */}
      <TicketHead
        head={"Attendee Details"}
        steps={"Step 2/3"}
      />
      <span className='space-span2'>
      <div className='span-progress2'></div>
      </span>
      <div className="section-container">
        <div className="upload-image-section">
          <h2 className='select-image'>Upload Profile Photo</h2>
          <div className="upload-photo-container">
              {/* Uploaded Image */}
              <label style={{backgroundImage:`url("${imageUrl}")`,backgroundSize:"contain",}} className="custom-image" htmlFor="myImage">
                <img src={cloudImage} alt=""/>
                <p className='upload-image-text'>Drag and drop or click to upload</p>
              </label>
              <input id="myImage" type="file" onChange={handlePictureUpload}/>
          </div>
              {errors&&<div className='error'>{errors.image}</div>}
        </div>
        <span className='middle-span'>
      </span>
        <form onSubmit={handleSubmit} className="form-container">
          <FormInput 
          label={"Enter your Fullname"}
          type={"text"}
          value={formInputsValue.name}
          name={"name"}
          action={handleValue}
        />
            {errors&&<div className='error'>{errors.name}</div>}
          <FormInput 
          label={"Enter your Email"}
          type={"email"}
          value={formInputsValue.email}
          name={"email"}
          placeholder={"hello@avioflagos.io"}
          action={handleValue}
          required={true}
        />
            {errors&&<div className='error'>{errors.email}</div>}
          <div className='form-section-cont'>
            <label className='form-section-title'>Special requests?</label>
            <textarea className="form-section-input text-area" value={formInputsValue.textarea} onChange={handleValue} name="textarea" placeholder='Textarea'/>
          </div>
          {errors&&<div className='error'>{errors.textarea}</div>}
          <div className='submit-buttons'>
            <button onClick={backButton} className='first-button'>Back</button>
            <button type="submit" className='second-button' onClick={handleSubmitClick}>Get My Free Ticket</button>
          </div>
        </form>
      </div>
    </div>
    {/* } */}

    <div className={pageNo===2?'section-1 section2':"pageDisplayNone"}>
    {/* <div className='section-1 section2'> */}
    <TicketHead
        head={"Ready"}
        steps={"Step 3/3"}
      />
      <span className='space-span3'>
      <div className='span-progress3'></div>
      </span>
      <div className='last-page-top-container'>
      <h1 className='last-page-title'>Your Ticket is Booked!</h1>
      <p className='last-page-text'>You can download or Check your email for a copy</p>
      </div>
      <div className='ticket-generator-main'>
        {/* more details when you get there */}
        <div className='ticket-content-background'>
          <div className='ticket-content-top'>
            <h1 className='ticket-content-head'>Techember Fest "25</h1>
            <p className='ticket-content-text-first'>📍 04 Rumens road, Ikoyi, Lagos</p>
            <p className='ticket-content-text-first'>📅 March 15, 2025 | 7:00 PM</p>
            <img className="ticket-content-pic" src={imageUrl} alt=""/> 
            
          <div className='ticket-content-bottom'>
            <table>
              <tr >
                <th className='first-table'>Enter your name</th>
                <th>Enter your email*</th>
              </tr>
              <tr>
                <td className='first-table table-bottom'>{formInputsValue.name}</td>
                <td className='table-bottom'>{formInputsValue.email}</td>
            </tr>
            <tr>
              <th className='first-table'>Ticket Type:</th>
              <th >Ticket for:</th>
            </tr>
            <tr>
              <td className='first-table'>{ticketType}</td>
              <td>{formInputsValue.ticketno}</td>
            </tr>
            <tr className='last-table'>
              <th colspan="2">Special request?</th>
            </tr>
            <tr>
              <td colspan="2">
              <td>{formInputsValue.textarea}</td>
              </td>
            </tr>
          </table>
          </div>
            <img className="barcode-image" src="https://i.ibb.co/W3cK42J/image-1.png" alt=""/>       
          </div>
        </div> 
      </div>
      <div className='submit-buttons'>
            <button onClick={bookNewTicket} className='first-button'>Book another ticket</button>
            <button className='second-button' type="submit">Download Ticket</button>
      </div>
      </div>
    </main>

    </div>
  );
}
export default App;
