import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List } from 'react-window'
import { fetchPosts } from './postsSlice'
import './PostsList.css'

export default function PostsList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);
  const listRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="posts-container">
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
          Loading posts...
        </div>
      </div>
    )
  }
  
  if (status === 'failed') {
    return (
      <div className="posts-container">
        <div className="alert alert-danger" role="alert">
          <strong>Error!</strong> {error}
        </div>
      </div>
    )
  }

  const Row = ({ index, style }) => {
    const p = items[index]
    if (!p) return null
    return (
      <div style={style} className="post-item">
        <div className="post-title">{p.title}</div>
        <div className="post-body">{p.body}</div>
      </div>
    )
  }

  return (
    <div className="posts-container">
      <div className="posts-card">
        <div className="posts-header">
          <h2 className="posts-title">Posts</h2>
          <span className="posts-meta badge bg-primary">{items.length} posts</span>
        </div>
        <div className="posts-list">
          <List
            listRef={listRef}
            defaultHeight={500}
            rowCount={items.length}
            rowHeight={120}
            rowComponent={Row}
            rowProps={{}}
            style={{ width: '100%' }}
            overscanCount={5}
          />
        </div>
      </div>
    </div>
  )
}
