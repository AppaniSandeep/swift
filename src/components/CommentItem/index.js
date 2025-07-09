import React from 'react'

const CommentItem = ({postId,name,email,body}) => {
  return (
    <li className="border-bottom py-3 px-2">
      <div className="row d-none d-md-flex text-break">
        <div className="mb-0 col-md-1" >{postId}</div>
        <div className="mb-0 col-md-3" >{name}</div>
        <div className="mb-0 col-md-4" >{email}</div>
        <div className="mb-0 col-md-4" >{body}</div>
      </div>
      <div className="d-block d-md-none">
        <div className="mb-1">
          <strong>Post ID:</strong> <span>{postId}</span>
        </div>
        <div className="mb-1">
          <strong>Name:</strong> <span>{name}</span>
        </div>
        <div className="mb-1">
          <strong>Email:</strong> <span className="text-break">{email}</span>
        </div>
        <div className="mb-1">
          <strong>Comment:</strong> <span className="text-break">{body}</span>
        </div>
      </div>
    </li>
  )
}

export default CommentItem
