import React, { useState, useEffect } from 'react';
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react'
import { Editor } from '@tinymce/tinymce-react';
import { sendComment } from '../api/comments';

class Comments extends React.Component  {

  constructor (props) {
    super(props)
    
    this.state = {
      text :"",
    }
  }
  
  //const [text, setText] = useState("");

  render() {
    const { comments, saveComment } = this.props;

    return (
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>

        {comments && comments.map(comment => (
          <Comment>      
            <Comment.Content>
              <Comment.Author as='a'>{comment.username}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.created_at}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
        <Form reply>     
          <Form.TextArea rows={1} onChange={e => (this.setState({ text: e.target.value }))} value={this.state.text}/>
          <Button 
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            onClick={e => {
              saveComment(this.state.text);
              this.setState({ text: "" });            
            }}
            primary
          />
        </Form>
      </Comment.Group>
    )
  }
}

export default Comments