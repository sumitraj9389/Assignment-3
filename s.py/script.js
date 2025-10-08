 document.querySelector('.getinfo').addEventListener('click', () => {
  const username = document.querySelector('.username').value.trim();
  const userInfoDiv = document.querySelector('.userinfo');

  if (username === '') {
    userInfoDiv.innerHTML = '<p>Please enter a GitHub username.</p>';
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(data => {
      const cardHTML = `
        <div class="card">
          <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="150"/>
          <h2>Name: ${data.name || 'N/A'}</h2>
          <p>Username: ${data.login}</p>
          <p>Bio: ${data.bio || 'No bio provided'}</p>
          
          <a href="${data.html_url}" target="_blank">View Profile</a>
        </div>
      `;
      userInfoDiv.innerHTML = cardHTML;
    })
    .catch(error => {
      userInfoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});

