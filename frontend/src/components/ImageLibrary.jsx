import React, { useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import styles from '../styles/ImageLibrary.module.css';
import Header from './Header/Header';

const ImageLibrary = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const testImages = [
        {
            id: 1,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 1',
        },
        {
            id: 2,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 2',
        },
        {
            id: 3,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 3',
        },
        {
            id: 4,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 4',
        },
        {
            id: 5,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 5',
        },
        {
            id: 6,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 6',
        },
        {
            id: 7,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 7',
        },
        {
            id: 8,
            src: 'https://via.placeholder.com/150',
            alt: 'Placeholder Image 8',
        },
    ];

    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = testImages.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(testImages.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />
            <Container className={styles.imageLibrary}>
                <Row>
                    {currentImages &&
                        currentImages.map((image) => (
                            <Col
                                key={image.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <Card className={styles.card}>
                                    <Card.Img
                                        variant="top"
                                        src={image.src}
                                        alt={image.alt}
                                        className={styles.cardImgTop}
                                    />
                                </Card>
                            </Col>
                        ))}
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
