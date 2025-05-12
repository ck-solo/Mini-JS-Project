let searchbtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".cards")

function getProfileData(username){
    return  fetch(`https://api.github.com/users/${username}`).then( (raw) =>{
         if(!raw.ok) throw new Error ("User not found.")
         return raw.json();
    });
}
 
function getRepos(username){
    return  fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw=>{
        if(!raw.ok) throw new Error ("Failed to fetch repos...");
        return raw.json()  
    }))
}

function decorateProfileData(details){
    console.log(details);
    let data =` 
          <img
            src="${details.avatar_url}"
            alt="GitHub Profile Picture" 
            class="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-blue-600 shadow-xl"
          />
          <div class="text-center sm:text-left">
            <h2 class="text-2xl font-bold text-white">${details.login}</h2>
            <p class="text-gray-400 text-lg mb-4">${details.bio ? details.bio : "Sorry there is no Bio"}</p>
            <p class="text-sm text-gray-500">Location:${details.location ? details.location : "N/A"}</p>
            <p class="text-sm text-gray-500">Company: ${details.company ? details.company : "N/A"}</p>
            <a href="https://github.com/${details.login}" target="_blank" class="text-blue-400 text-lg hover:underline">Visit GitHub Profile →</a>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          <!-- Repositories -->
          <div class="bg-[#1e2a38] p-6 rounded-xl shadow border border-blue-700 transition-all duration-300 hover:shadow-blue-600/40">
            <p class="text-sm text-gray-400">Repositories</p>
            <p class="text-3xl font-semibold text-white">${details.public_repos}</p>
          </div>
          <!-- Followers -->
          <div class="bg-[#1e2a38] p-6 rounded-xl shadow border border-blue-700 transition-all duration-300 hover:shadow-blue-600/40">
            <p class="text-sm text-gray-400">Followers</p>
            <p class="text-3xl font-semibold text-white">${details.followers}</p>
          </div>
          <!-- Following -->
          <div class="bg-[#1e2a38] p-6 rounded-xl shadow border border-blue-700 transition-all duration-300 hover:shadow-blue-600/40">
            <p class="text-sm text-gray-400">Following</p>
            <p class="text-3xl font-semibold text-white">${details.following}</p>
          </div>
          <!-- Gists -->
          <div class="bg-[#1e2a38] p-6 rounded-xl shadow border border-blue-700 transition-all duration-300 hover:shadow-blue-600/40">
            <p class="text-sm text-gray-400">Gists</p>
            <p class="text-3xl font-semibold text-white">${details.public_gists}</p>
          </div>
        </div> `;
    card.innerHTML = data;
}


searchbtn.addEventListener("click",function(event){  
    event.preventDefault()
    let username = usernameinp.value.trim();
    if(username.length > 0){
        getProfileData(username).then((data)=>{
            decorateProfileData(data)
        })
        getRepos(username).then((repos)=>{
            decorateReposData(repos)
        })
    }else{
        alert("Please enter a username")
    }
    card.innerHTML = "";

})

function decorateReposData(repos) {
    // Only show top 5 updated repos
    let topRepos = repos.slice(0, 5);
  
    let reposHTML = `
      <h2 class="text-2xl font-semibold text-blue-400 mt-10">Latest Repositories</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    `;
  
    topRepos.forEach((repo) => {
      reposHTML += `
        <div class="bg-[#1e2a38] p-4 rounded-xl border border-blue-600 shadow hover:shadow-blue-500/40 transition-all duration-300">
          <h3 class="text-lg font-bold text-white mb-2">${repo.name}</h3>
          <p class="text-gray-400 text-sm mb-2">${repo.description ? repo.description : "No description provided."}</p>
          <div class="text-sm text-gray-500 mb-2">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</div>
          <a href="${repo.html_url}" target="_blank" class="text-blue-400 hover:underline">View on GitHub →</a>
        </div>
      `;
    });
  
    reposHTML += `</div>`;
  
    // Append to existing card container
    card.innerHTML += reposHTML;
  }
  