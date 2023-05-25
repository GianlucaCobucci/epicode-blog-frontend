import React from 'react'
import Card from 'react-bootstrap/Card';

const SingleCard = ({img, title, content, author, rate}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Titolo: {title}</Card.Title>
        <Card.Text>Commento: {content.slice(0,40)}</Card.Text>
        <Card.Title>Autore: {author}</Card.Title>
        <Card.Title>Voto: {rate}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default SingleCard
