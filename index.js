const body = document.querySelector('body');
const container = document.querySelector('.container');
const formInput = document.querySelector('.tweet-form');
const input = document.querySelector('.tweet-input');
const fileInput = document.querySelector('input[type="file"]');
const posts = document.querySelector('.posts-container');
const registerForm = document.querySelector('.register-form');
const profileN = document.querySelector('.profile-name');
const companyN = document.querySelector('.company-name');
const registerFile = document.querySelector('.register-file');
const inputPic = document.querySelector('.input-pic')
const themeColor = document.querySelector('.theme-color')


themeColor.addEventListener('click', (e) => {
    body.classList.toggle('change-theme')
})

const postData = [];

let profileName = null;
let companyName = null;
let selectedFile;
let profileImage= null; // This should be an actual image URL or Blob if you want to display a profile image.

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName = profileN.value;
    companyName = companyN.value;
    profileImage = registerFile.files[0];
    inputPic.src=`${URL.createObjectURL(profileImage)}`
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.container').style.display = 'flex'
})

fileInput.addEventListener('change', function () {
    // Check if a file is selected
    if (fileInput.files.length > 0) {
        // Get the selected file
        selectedFile = fileInput.files[0];
    }
    renderDom()
});

formInput.addEventListener('submit', (e) => {
    e.preventDefault();

    postData.push({ name: profileName, companyName, title: input.value, img: selectedFile });
    renderDom();
    input.value = ''
});

function renderDom() {
    posts.innerHTML = '';
    postData.forEach(item => {
        const post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
        <div class="post-image">
             <img src="${URL.createObjectURL(profileImage)}" alt="Profile">
        </div>
        <div class="post-desc">
            <div class="name">${profileName}<span> @${companyName} .3m</span></div>
            <p class="desc">${item.title}</p>
            <div class="feature-image">
                <img src="${URL.createObjectURL(item.img)}" alt="post-image">
            </div>
            <div class="post-icon">
                <div class='like-btn'>
                    <i class="fa-solid fa-heart"></i>
                    <span>0</span>
                </div>
                <div class='comment-btn'>
                    <i class="fa-solid fa-comment"></i>
                    <span>2</span>
                </div>
                <div>
                    <i class="fa-solid fa-hashtag"></i>
                </div>
                <div><i class="fa-solid fa-share-from-square"></i></div>
                <div>
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </div>
            </div>
        </div>
        <div class="angal-icon">
            <i class="fa-solid fa-chevron-down"></i>
        </div>
        `;
    
        posts.appendChild(post);
    })

 

    const likesBtns = document.querySelectorAll('.like-btn');
    likesBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(btn.querySelector('i').style.color == 'red'){
               btn.querySelector('i').style.fontSize = '16px';
               btn.querySelector('i').style.color = 'gray';
               btn.querySelector('span').innerHTML = 0
            }else{
                btn.querySelector('i').style.fontSize = '25px';
                btn.querySelector('i').style.color = 'red';
                btn.querySelector('span').innerHTML = 1

            }
        })
    })
}
