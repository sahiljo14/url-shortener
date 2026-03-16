async function shortenUrl(){

 const urlInput = document.getElementById("urlInput")
 const url = urlInput.value.trim()

 if(!url){
  showToast("Please enter a URL")
  return
 }

 const res = await fetch("/shorten",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({url})
 })

 const shortLink = await res.text()

 document.getElementById("result").innerHTML = `
 <p>
  <a href="${shortLink}" target="_blank">${shortLink}</a>
  <button onclick="copyLink('${shortLink}')">Copy</button>
 </p>
 `

 urlInput.value = ""

 showToast("Short URL created")

 loadLinks()
}


function copyLink(link){

 navigator.clipboard.writeText(link)

 showToast("Link copied")

}


async function loadLinks(){

 const res = await fetch("/links")
 const links = await res.json()

 const table = document.getElementById("linksTable")

 table.innerHTML = ""

 links.forEach(link => {

  const shortUrl = `${location.origin}/${link.shortId}`

  const row = `
  <tr>
   <td>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
   </td>
   <td>${link.clicks}</td>
   <td>
    <button onclick="copyLink('${shortUrl}')">Copy</button>
    <button onclick="deleteLink('${link.shortId}')">Delete</button>
   </td>
  </tr>
  `

  table.innerHTML += row

 })

}


async function deleteLink(id){

 const confirmed = confirm("Delete this URL?")

 if(!confirmed) return

 await fetch(`/delete/${id}`,{
  method:"DELETE"
 })

 showToast("URL deleted")

 loadLinks()

}


/* toast notification */

function showToast(message){

 const toast = document.getElementById("toast")

 toast.textContent = message
 toast.classList.add("show")

 setTimeout(()=>{
  toast.classList.remove("show")
 },2000)

}


loadLinks()