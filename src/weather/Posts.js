import React, { useState } from 'react';

const userId = 1234;

function Post() {
  const [ title, setTitle ] = useState("");
  const [ body, setBody ] = useState("");

  async function sendPost() {
    if (title && body) {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: 'POST',
          body: JSON.stringify({ title, body, userId }),
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const responseBody = await res.json();
      console.log("== responseBody:", responseBody);
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      sendPost();
    }}>
      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default Post;