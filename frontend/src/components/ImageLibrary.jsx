import React, { useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import styles from '../styles/ImageLibrary.module.css';
import Header from './Header/Header';
import DrawingComponent from './DrawingComponent';

const ImageLibrary = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const testImages = [
        {
            id: 1,
            data: {
                imageSize: {
                    width: 800,
                    height: 600,
                },
                lines: [
                    {
                        points: [20, 40, 200, 40, 50, 100, 50],
                        color: 'red',
                        size: 1,
                    },
                ],
                texts: [
                    {
                        id: 'text1',
                        x: 100,
                        y: 100,
                        text: 'Sample Text',
                        fontSize: 18,
                        fontFamily: 'Arial',
                        color: 'black',
                    },
                ],
                figures: [
                    {
                        id: 'rect1',
                        x: 500,
                        y: 1000,
                        tool: 'rectangle',
                        width: 100,
                        height: 50,
                        fill: 'green',
                        color: 'blue',
                        size: 2,
                    },
                ],
            },
        },
        {
            id: 2,
            data: {
                imageSize: {
                    width: 800,
                    height: 600,
                },
                lines: [
                    {
                        points: [20, 40, 200, 40],
                        color: 'red',
                        size: 5,
                    },
                ],
                texts: [
                    {
                        id: 'text1',
                        x: 100,
                        y: 500,
                        text: 'Sample Text',
                        fontSize: 18,
                        fontFamily: 'Arial',
                        color: 'black',
                    },
                ],
                figures: [
                    {
                        id: 'rect1',
                        x: 300,
                        y: 200,
                        tool: 'rectangle',
                        width: 100,
                        height: 50,
                        fill: 'green',
                        color: 'blue',
                        size: 2,
                    },
                ],
            },
        },
        {
            id: 3,
            data: {
                imageSize: {
                    width: 800,
                    height: 600,
                },
                lines: [
                    {
                        points: [20, 40, 200, 40],
                        color: 'red',
                        size: 5,
                    },
                ],
                texts: [
                    {
                        id: 'text1',
                        x: 100,
                        y: 100,
                        text: 'Sample Text',
                        fontSize: 18,
                        fontFamily: 'Arial',
                        color: 'black',
                    },
                ],
                figures: [
                    {
                        id: 'rect1',
                        x: 300,
                        y: 200,
                        tool: 'rectangle',
                        width: 100,
                        height: 50,
                        fill: 'green',
                        color: 'blue',
                        size: 2,
                    },
                ],
            },
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
                    {currentImages.map((image) => (
                        <Col
                            key={image.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            className="mb-4"
                        >
                            <Card className={styles.card}>
                                <DrawingComponent data={image.data} />
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
