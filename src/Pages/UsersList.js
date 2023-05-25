import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from "react-bootstrap";


const UsersList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(3);

  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const handlePageClick = (data) => {
    console.log(`User requested page number ${data.selected + 1}`);
    setPage(data.selected + 1);
  };

  // CSS in JS
  const styles = {
    userListContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    userListItem: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '0.25rem',
      padding: '1rem 1rem',
      listStyleType: 'none',
    },
    pagination: {
      position: 'fixed',
      top: '46%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    pageLink: {
      margin: '0 10px',
    },
  };

  return (
    <>
      <div style={styles.userListContainer}>
        <div className="centered-content">
          <h1>Tutti gli utenti</h1>
        </div>
        <Container className="shadow">
          <Row>
            <Col className="d-flex flex-wrap gap-3 mt-3 mb-5" lg={12}>
              {data && data.users?.map((user) => {
                return (
                  <Col>
                    <Card key={user._id} style={styles.userListItem}>
                      <Card.Img variant="top" src={user.img} style={{ width: '387px', height: '218px', objectFit: 'cover' }} />
                      <Card.Body>
                        <Card.Title>{user.userName}</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Col>
          </Row>
          <div style={styles.pagination}>
            <br></br>
            <ReactPaginate
              breakLabel="..."
              pageCount={data.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              disabledClassName={"page-item disabled"}
              activeClassName={"page-item active"}
              pageClassName="page-item"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default UsersList;
