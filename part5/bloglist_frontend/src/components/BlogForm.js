import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState(''); 
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLikes, setNewLikes] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    });

    setNewTitle(''); 
    setNewAuthor('');
    setNewUrl('');
    setNewLikes('');
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
        </div>
        <div>
          author: <input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)} />
        </div>
        <div>
          url: <input value={newUrl} onChange={(event) => setNewUrl(event.target.value)} />
        </div>
        <div>
          likes: <input value={newLikes} onChange={(event) => setNewLikes(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
