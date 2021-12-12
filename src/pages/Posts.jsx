import React, { useState, useRef, useMemo, useEffect} from 'react';
import PostService from './API/PostService';

import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';

import PostList from './components/PostList';

import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import Pagination from './components/UI/pagination/Pagination';
import { useFetching } from './hooks/useFetching';

import { usePosts } from './hooks/usePosts';
import {getPageCount,  getPagesArray} from './utils/pages'


import './styles/App.css';

function Posts() {
      const [posts, setPosts] = useState([])
      
     

      const [filter, setFilter] = useState({sort: '', query: ''})
      const [modal, setModal] = useState(false);
      const [totalPages, setTotalPages] = useState(0);
      const [limit, setLimit] = useState(10);
      const [page, setPage] = useState(1);
      const sorderAndSerchedPOsts = usePosts(posts, filter.sort, filter.query);

      let pagesArray = getPagesArray(totalPages)
      console.log(pagesArray)

      const [fetchPosts, isPostsLoading, postError] = useFetching (async()=>{
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));

      })

      console.log('total pages', totalPages)

     useEffect(() =>{
      fetchPosts()
     }, [page]) 
 
      const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
      }


   
      const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))

      }

      const changePage = (page) => {
        setPage(page)

      }

 

      

  return (
    <div className="App">
        <button onClick={fetchPosts}>GET INFO</button>

        <span style={{marginTop: 30}} onClick={() => setModal(true)} > 
          Create Post
        </span>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        
        <hr style={{margin: '15px'}}/>

        <PostFilter 
          filter={filter} 
          setFilter={setFilter}
        />

        {postError &&
            <h1>THere is a mistake ${postError}</h1>
        }

        {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div> 
      :<PostList remove={removePost} posts={sorderAndSerchedPOsts} title = "Список сообщений"/>
      }

      <Pagination 
          page={page} 
          changePage={changePage}
          totalPages={totalPages}
        />



    </div>

  );
}

export default Posts;
