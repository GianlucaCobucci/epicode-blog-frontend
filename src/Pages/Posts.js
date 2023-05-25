import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postsArray, postsLoading, totalPostsCount } from "../Reducers/postsSlice";
import SingleCard from "../Components/SingleCard";
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Posts.css'

const pageSize = 8;

const Post = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(postsLoading);
  const allPosts = useSelector(postsArray);
  const totalPosts = useSelector(totalPostsCount);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts({ page, pageSize, sortBy: 'views'}));
  }, [dispatch, page]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(selected + 1);
  };

  return (
    <>
    <div className="centered-content">
      <h1>Tutti i posts</h1>
    </div>
      <Container className="shadow">
        <Row>
          <Col className="d-flex flex-wrap gap-3 mt-3 mb-5" lg={12}>
            {allPosts && allPosts.map((item) => (
              <SingleCard
                key={item._id}
                id={item._id}
                title={item.title}
                img={item.img}
                content={item.content}
                author={item.author}
                rate={item.rate}
              />
            ))}
          </Col>
        </Row>
        <ReactPaginate
          previousLabel={'Precedente'}
          nextLabel={'Successivo'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(totalPosts / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </Container>
    </>
  );
};

export default Post;



