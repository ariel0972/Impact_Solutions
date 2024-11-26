// {/* <tr>
//     <td>Exemplo ONG 1</td>
//     <td>Educação</td>
//     <td>01/2024</td>
// </tr> */}

async function fetchInformation(){
    token = localStorage.getItem("userToken")
    // await fetch("/api/GetUserInfo", )
    const response = await fetch(`/app/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: token }),
    });
    userInfo = await response.json()
    document.getElementById("wellcome-message").innerText = userInfo.user //need to update backend
    document.getElementById("email").innerText = userInfo.email //need to update backend
    // document.getElementById("history")
    const resp = await fetch(`/app/getEvents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: token }),
    });
    events = await resp.json()
    // {"name":c["name"],
    //   "id":c["id"],
    //   "description":c["description"],
    //   "date":c["date"],
    //   "local":c["local"],
    //   "isSubscribed":user["id"] in c["subscriptions"]
    //   } // output
    tabalapai = document.getElementById("history")
    console.log(tabalapai)
    console.log(events)
    events.forEach(element => {
        if (!element.isSubscribed){
            return
        }
        r = tabalapai.insertRow()
        r.insertcell(1)
        tabalapai.innerHtml = tabalapai.innerHtml + `
        <tr>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.date}</td>
            <td>${element.local}</td>
        </tr>
        `
        console.log(tabalapai.innerHtml)
        console.log("tabala pai")
    });
}