"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
// reuseable function 
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
// let display the card UI 
const showResultUI = (singleUser) => {
    main_container.insertAdjacentHTML("beforeend", `<div class="card">
    <img src=${singleUser.avatar_url} alt=${singleUser.login}/>
    <hr/>
    <div class="card-footer">
      <img src="${singleUser.avatar_url}" alt="${singleUser.login}"/>
      <a href="${singleUser.url}"> Github</a>
    </div>
    </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
// default function call
fetchUserData("https://api.github.com/users");
// let perform search functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserInfo = await myCustomFetcher(url, {});
        const matchingUsers = allUserInfo.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = " ";
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class ="empty-msg"> No matching user found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
            ;
        }
    }
    catch (error) {
        console.log(error);
    }
});
