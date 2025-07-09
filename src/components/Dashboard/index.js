import React,{useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import CommentItem from '../CommentItem';

const itemsPerPage = 10;

const Dashboard = ({commentsData}) => {

  const [currentPage,setCurrentPage] = useState(1);
  const [searchItem,setSearchItem] = useState("");
  const [sortKey,setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const hanldeSearchInput = (event) => {
    setSearchItem(event.target.value);
    setCurrentPage(1);
  }
 
  const handleSort = (key) => {
    if (sortKey === key){
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  }

  const filteredComments = commentsData.filter((comment) => {
    const lowerSearch = searchItem.toLowerCase();
    return (
      comment.name.toLowerCase().includes(lowerSearch) || comment.email.toLowerCase().includes(lowerSearch) || comment.body.toLowerCase().includes(lowerSearch)
    );
  });

  const sortedComments = [...filteredComments].sort((a,b) => {
    if (!sortKey){
      return 0
    }
    let valA = a[sortKey]
    let valB = b[sortKey]
    if (typeof valA === "string"){
      valA = valA.toLowerCase()
    }
    if (typeof valB === "string") {
      valB = valB.toLowerCase()
    }

    if (valA < valB){
      return sortOrder === 'asc' ? -1 : 1
    }
    if (valA > valB){
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })


  const totalPages = Math.ceil(commentsData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentComments = sortedComments.slice(startIndex,endIndex);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev -1 );
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }


  return (
    <div className='container mt-4'>
      <div className='row align-items-center gy-2 mb-3'>
        <div className='col-12 col-md-6'>
          <input type='text' className='form-control' placeholder='Search by name, email, comment' value={searchItem} onChange={hanldeSearchInput} sstyle={{maxWidth:"300px"}}/>
        </div>
        <div className='col-12 col-md-6 d-flex flex-wrap gap-2 justify-content-md-end'>
          <button className='btn btn-outline-primary ' onClick={() => handleSort("postId")}>Sort by Post ID {sortKey === "postId" ? (sortOrder === "asc" ? '↑' : '↓') : ""}</button>
          <button className='btn btn-outline-primary ' onClick={() => handleSort("name")}>Sort by Name {sortKey === "name" ? (sortOrder === "asc" ? '↑' : '↓') : ""}</button>
          <button className='btn btn-outline-primary ' onClick={() => handleSort("email")}>Sort by Email {sortKey === "email" ? (sortOrder === "asc" ? '↑' : '↓') : ""}</button>
        </div>
      </div>
      <div className='row fw-semibold bg-info text-dark border-bottom py-2 d-none d-md-flex'>
        <div className='col-md-1'>Post ID</div>
        <div className='col-md-3'>Name</div>
        <div className='col-md-4'>Email</div>
        <div className='col-md-4'>Comment</div>
      </div>
        {/* <div className="d-flex justify-content-start align-items-center p-3 border-bottom bg-info text-dark mb-3 d-md-none">
          <p className="mb-0 fw-semibold" style={{width:"80px"}}>Post ID</p>
          <p className="mb-0 fw-semibold" style={{width:"200px"}}>Name</p>
          <p className="mb-0 fw-semibold" style={{width:"250px"}}>Email</p>
          <p className="mb-0 fw-semibold" style={{width:"400px"}}>Comment</p>
        </div> */}
        <ul className="list-unstyled">
          {commentsData && currentComments.map(eachItem => ( <CommentItem key={eachItem.id} postId={eachItem.postId} name={eachItem.name} email={eachItem.email} body={eachItem.body} />))}
        </ul>
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <button className='btn btn-primary' onClick={goToPrevious} disabled={currentPage === 1}>Previous</button>
          <span>Page of {currentPage} of {totalPages}</span>
          <button className='btn btn-primary' onClick={goToNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    </div>
  )
}

export default Dashboard
