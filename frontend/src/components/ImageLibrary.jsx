import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import styles from '../styles/ImageLibrary.module.css';
import Header from './Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getArtWorks } from '../store/actions/artWork';

const ImageLibrary = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const artWorks = useSelector((state) => state.artWork.liblaryArtWorks);

    useEffect(() => {
        dispatch(getArtWorks());
    }, [dispatch]);

    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = artWorks.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(artWorks.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />
            <Container className={`${styles.imageLibrary} mx-auto my-5`}>
                <Row>
                    {currentImages.map((image) => {
                        const filePath = image.photo;
                        const parts = filePath.split('\\');
                        const photoUrl = parts[parts.length - 1];

                        return (
                            <Col
                                key={image.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <Link to={`/${image.id}`}>
                                    <Card className={styles.card}>
                                        <Card.Img
                                            variant="top"
                                            src={`http://127.0.0.1:8000//${photoUrl}`}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {image.name}
                                            </Card.Title>
                                            <Card.Text>
                                                {image.description ||
                                                    'No description.'}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>

                <Pagination className={styles.paginationContainer}>
                    <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((number) => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => handlePageChange(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </div>
    );
};

export default ImageLibrary;
