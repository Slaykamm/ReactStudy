import React, { useState, useRef, useMemo} from 'react';

import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';

import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/MyModal/MyModal';


import './styles/App.css';

function App() {
      const [posts, setPosts] = useState([
        {id:1, title: 'JS', body: "1Describe text"},
        {id:2, title: 'Python', body: "2Describe text"},
        {id:3, title: 'TypeScript', body: "3Describe text"},
        {id:4, title: 'Assembler', body: "4Describe text"}
      ])
      
     

      const [filter, setFilter] = useState({sort: '', query: ''})

      const [modal, setModal] = useState(false);



      const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
      }

      
        const sortedPosts = useMemo(()=>{
          console.log("POSTS WERE SORTED")
          if (filter.sort) {
            
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
          }
          return posts;

        }, [filter.sort, posts])


      const sorderAndSerchedPOsts  = useMemo( () => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))

      }, [filter.query, sortedPosts])


      const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))

      }



      

  return (
    <div className="App">

        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)} > 
          Create Post
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        
        <hr style={{margin: '15px'}}/>

        <PostFilter filter={filter} setFilter={setFilter}/>

        <PostList remove={removePost} posts={sorderAndSerchedPOsts} title = "Список сообщений"/>




    </div>

  );
}

export default App;
