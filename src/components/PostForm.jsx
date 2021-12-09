import React, {useState}  from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

const PostForm = ({create}) => {


    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
         
        const newPost = {
           ...post, id: Date.now() 
        }


        create(newPost)
        setPost({title: '', body: ''})

      }
        

    return (

        <form>
            {/* управляемый. мы пишем в STATE и используем через 2х сторонее связывание*/}
            <MyInput 
            value = {post.title}
            onChange = {e => setPost({...post, title:e.target.value})}
            type="text" 
            placeholder="posts title"/>
    
    {/* НЕ управляемый Инпут чере REF*/}

            <MyInput
            value = {post.body}
            onChange = {e => setPost({...post, body:e.target.value})}
            type="text" 
            placeholder="posts body"
            />
            <MyButton onClick={addNewPost} >Create Post</MyButton>
    
        </form>

    );
};

export default PostForm;