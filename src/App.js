import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
// import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(posts.length / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='container mt-5'>
      <Posts posts={currentPosts} loading={loading} />

      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => setCurrentPage(number)} href='!#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* <Pagination
        postsPerPage={5}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
    </div>
  );
};

export default App;
