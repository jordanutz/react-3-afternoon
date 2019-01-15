import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost( id, text ) {
    console.log('hit')
   axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( res => {
     this.setState({
       posts: res.data
     })
   }).catch(error => console.log(error))
 }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    console.log('hit')
    axios.post('https://practiceapi.devmountain.com/api/posts', {text}).then(res => {
      console.log(res)
      this.setState({
        posts: res.data
      })
    })

  }

  render() {
    const { posts } = this.state;

    let displayedPosts = posts.map( post => {
      return (
        <Post key={post.id} text={post.text} date={post.date} id={post.id} deletePostFn={this.deletePost} updatePostFn={ this.updatePost }/>

      )
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

        {displayedPosts}

        </section>
      </div>
    );
  }
}

export default App;
